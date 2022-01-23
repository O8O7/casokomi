from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework.serializers import SerializerMethodField

from .models import ChatRoom, ChatMessage, Member, CoinMarketInfo
from accounts.serializers import UserSerializer


class RoomSerializer(serializers.ModelSerializer):
    # name = SerializerMethodField()
    room_name_chatmessage = serializers.StringRelatedField(many=True)

    class Meta:
        model = ChatRoom
        fields = ['id', 'name', 'room_name_chatmessage']

    # def get_name(self, obj):
    #     try:
    #         name_abstruct_contents = RoomSerializer(ChatMessage.objects.all().filter(room_name=ChatRoom.objects.get(id=obj.id), many=True)).data
    #         return name_abstruct_contents
    #     except:
    #         name_abstruct_contents = None
    #         return name_abstruct_contents


class ChatMessageSerializer(serializers.ModelSerializer):
    room_name = RoomSerializer()
    username = UserSerializer()

    class Meta:
        model = ChatMessage
        fields = ['id', 'username', 'room_name', 'comment', 'posted_at']
        # read_only = ('id', 'username', 'room')


class CoinMarketInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoinMarketInfo
        fields = ['name', 'symbol', 'rank', 'day_perchange', 'market_cap']
