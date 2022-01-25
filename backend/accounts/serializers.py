from rest_framework import serializers
from django.contrib.auth import get_user_model

from .models import UserAccount


class UserSerializer(serializers.ModelSerializer):
    username_chatmessage = serializers.StringRelatedField(many=True)

    class Meta:
        model = UserAccount
        fields = ('id', 'name', 'email', 'image',
                  'introduction', 'username_chatmessage')


class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = ('id', 'name', 'image',
                  'introduction',)
