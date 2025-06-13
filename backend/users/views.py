from django.shortcuts import render
from rest_framework import serializers, status
from .serializers import ProfileSerializer, LinkSerializer, FieldSerializer
from .models import Profile, Link, Field
from rest_framework.response import Response
from rest_framework.views import APIView
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator



'''Responsible for taking in the request (load model, operations, and etc) --> serialize it into JSON --> HTTPS Response'''
@method_decorator(csrf_exempt, name='dispatch')
class ProfileView(APIView):
    #retrieve a profile from database and serialize it into json and send it over as HTTP Response
    def get(self, request, id = None):
         #see if user exists
        try:
            profile = Profile.objects.get(pk = id)
        except Profile.DoesNotExist:
            return Response(status = status.HTTP_404_NOT_FOUND)
              
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)
    #deserialize new profile into DJANGO model, save it in the model, and return the datas JSON
    def post(self, request):
        serializer = ProfileSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    
    #update an existing profile in the database and return the data in JSON
    def put(self, request, id = None):
        #see if user exists
        try:
            profile = Profile.objects.get(pk = id)
        except Profile.DoesNotExist:
            return Response(status = status.HTTP_404_NOT_FOUND)
                
        serializer = ProfileSerializer(profile, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    
@method_decorator(csrf_exempt, name='dispatch')

class AllProfiles(APIView):
    #retrieve from database and serialize it into json and send it over as HTTP Response
    def get(self, request):
        profiles = Profile.objects.all()
        serializer = ProfileSerializer(profiles, many = True)
        return Response(serializer.data)