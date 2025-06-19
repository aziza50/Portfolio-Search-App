from django.shortcuts import render
from rest_framework import serializers, status
from .serializers import ProfileSerializer, LinkSerializer, FieldSerializer
from .models import Profile, Link, Field
from rest_framework.response import Response
from rest_framework.views import APIView



'''Operations regarding profile --> create, get user details, and update user details
Responsible for taking in the request (load model, operations, and etc) --> serialize it into JSON --> HTTPS Response'''
class ProfileView(APIView):
    #retrieve a profile from database and serialize it into json and send it over as HTTP Response
    def get(self, request, id = None):
         #see if user exists
        try:
            profile = Profile.objects.get(id = id)
        except Profile.DoesNotExist:
            return Response(status = status.HTTP_404_NOT_FOUND)
              
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)
    #deserialize new profile into DJANGO model, save it in the model, and return the datas JSON
    def post(self, request):
        print("DATA:", request.data)

        serializer = ProfileSerializer(data = request.data, context = {'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    
    #update an existing profile in the database and return the data in JSON
    def put(self, request, id = None):
        #see if user exists
        try:
            profile = Profile.objects.get(id = id)
        except Profile.DoesNotExist:
            return Response(status = status.HTTP_404_NOT_FOUND)
                
        serializer = ProfileSerializer(profile, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    
'''Returns all user profile details'''  
class AllProfiles(APIView):
    #retrieve from database and serialize it into json and send it over as HTTP Response
    def get(self, request):
        profiles = Profile.objects.all()
        serializer = ProfileSerializer(profiles, many = True)
        return Response(serializer.data)
    
class VarFields(APIView):
    def get(self, request):
        fields = [{"value":var, "label":label} for var, label in Field.FIELD_CHOICES]
        return Response(fields)
    
class VarLinks(APIView):
    def get(self, request):
        links = [{"value":var, "label":label} for var, label in Link.TYPES]
        return Response(links)