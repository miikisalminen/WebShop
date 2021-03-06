from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "password", "email"]

class ListingSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Listing
        fields = ["title", "desc", "price"]

class DeleteListingSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Listing
        fields = ["title"]