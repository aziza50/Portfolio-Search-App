from rest_framework import serializers
from .models import Profile, Link, Field
import json

class LinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Link
        fields = ['link', 'type']

class FieldSerializer(serializers.ModelSerializer):
    class Meta:
        model = Field
        fields = ['field']

class ProfileSerializer(serializers.ModelSerializer):
    fields = serializers.SerializerMethodField(method_name='get_fields_data')
    links = serializers.SerializerMethodField(method_name='get_links_data')
    profile_picture = serializers.ImageField(required=True)
    class Meta:
        model = Profile
        fields = ['id', 'name', 'profile_picture', 'bio', 'fields', 'links']
    

    def create(self, validated_data):    

        profile = Profile.objects.create(
            name=validated_data['name'],
            bio=validated_data['bio'],
            profile_picture=validated_data.get('profile_picture')
        )

        request = self.context.get('request')
        fields_data = request.data.getlist('fields')
        fields_data = [{'field': f.strip()} for f in fields_data if f.strip()]
        links = request.data.get('links')

        try:
            links_data = json.loads(links) if links else []
        except json.JSONDecodeError:
            raise serializers.ValidationError({"links": "Invalid JSON format."})

        for link in links_data:
            Link.objects.create(profile=profile, **link)

        for field_dict in fields_data:
            field_obj, _ = Field.objects.get_or_create(field=field_dict['field'])
            profile.tags.add(field_obj)

        print(fields_data)
        print(links_data)

        return profile

    def get_fields_data(self, obj):
        return FieldSerializer(obj.tags.all(), many=True).data
    
    def get_links_data(self, obj):
        return LinkSerializer(obj.links.all(), many = True).data
