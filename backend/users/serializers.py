from rest_framework import serializers
from .models import Profile, Link, Field


class LinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Link
        fields = ['link', 'type']


class FieldSerializer(serializers.ModelSerializer):
    class Meta:
        model = Field
        fields = ['field']


class ProfileSerializer(serializers.ModelSerializer):
    links = serializers.SerializerMethodField()
    fields = serializers.SerializerMethodField(method_name="get_fields_data")
    profile_picture = serializers.ImageField(required=False)

    class Meta:
        model = Profile
        fields = ['id', 'name', 'profile_picture', 'bio', 'links', 'fields']

    def to_internal_value(self, data):
        """
        Accept flat inputs like:
        fields=AI&fields=ML&links=https://...&links=https://...
        And transform into:
        fields: [{'field': 'AI'}, {'field': 'ML'}]
        links: [{'link': 'https://...'}]
        """
        internal = super().to_internal_value(data)
        request = self.context.get('request')

        if request and isinstance(request.data, dict):
            fields = request.data.getlist('fields')
            links = request.data.getlist('links')

            internal['fields'] = [{'field': f} for f in fields if f.strip()]
            internal['links'] = [{'link': l} for l in links if l.strip()]

        return internal

    def create(self, validated_data):
        links_data = validated_data.pop('links', [])
        fields_data = validated_data.pop('fields', [])

        profile = Profile.objects.create(
            name=validated_data.get('name'),
            bio=validated_data.get('bio'),
            profile_picture=validated_data.get('profile_picture', None)
        )

        for link_data in links_data:
            link_obj, _ = Link.objects.get_or_create(profile=profile, **link_data)
            profile.links.add(link_obj)

        for field_data in fields_data:
            field_obj, _ = Field.objects.get_or_create(**field_data)
            profile.tags.add(field_obj)

        return profile

    def get_links(self, obj):
        return LinkSerializer(obj.links.all(), many=True).data

    def get_fields_data(self, obj):
        return FieldSerializer(obj.tags.all(), many=True).data
