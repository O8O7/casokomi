import json

from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncJsonWebsocketConsumer

from .models import ChatMessage, ChatRoom
from accounts.models import UserAccount
from asgiref.sync import sync_to_async


class ChatConsumer(AsyncJsonWebsocketConsumer):
    groups = ['broadcast']

    async def connect(self):

        # URL から room id を取得してインスタンス変数に
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        await self.channel_layer.group_add(  # グループにチャンネルを追加
            self.room_name,
            self.channel_name,
        )
        await self.accept()  # ソケットを accept する

    async def disconnect(self, _close_code):
        await self.channel_layer.group_discard(  # グループからチャンネルを削除
            self.room_name,
            self.channel_name,
        )
        await self.close()  # ソケットを close する

    async def receive_json(self, data):
        # websocket からメッセージを json 形式で受け取る
        # message = data['message']  # 受信データからメッセージを取り出す
        # user = sync_to_async(UserAccount.objects.get(id=data['user_id']))
        await self.createMessage(data)  # メッセージを DB に保存する
        await self.channel_layer.group_send(  # 指定グループにメッセージを送信する
            self.room_name,
            {
                'type': 'chat_message',
                'message': data['message'],
                'user_id': data['user_id'],
                'image': data['image'],
                'username': data['username'],
            }
        )

    async def chat_message(self, data):
        # websocket でメッセージを送信する
        await self.send(text_data=json.dumps({
            'type': 'chat_message',
            'message': data['message'],
            'user_id': data['user_id'],
            'image': data['image'],
            'username': data['username']
        }))

    @database_sync_to_async
    def createMessage(self, data):
        room_name = data['room_name']
        chatroom = ChatRoom.objects.get(name=room_name)
        # print('username_id: {}, room_name: {}, message: {}'.format(
        # data['user_id'], chatroom, data['message']))
        ChatMessage.objects.create(
            username_id=data['user_id'],
            room_name=chatroom,
            comment=data['message'],
        )
