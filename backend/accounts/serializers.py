from rest_framework import serializers
from django.contrib.auth import get_user_model

from .models import UserAccount

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = ('id', 'name', 'email', 'image', 'introduction')

class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = ('name', 'image')