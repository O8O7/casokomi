# from django.contrib.auth import get_user_model
# from asgiref.sync import async_to_sync
# from channels.generic.websocket import WebsocketConsumer
# import json
# from .models import ChatMessage, ChatRoom
# from .views import get_last_10_messages, get_user_contact, get_current_chat, get_room_name

# User = get_user_model()


# class ChatConsumer(WebsocketConsumer):

#     # def fetch_messages(self, data):
#     #     messages = get_last_10_messages(data['chatId'])
#     #     content = {
#     #         'command': 'messages',
#     #         'messages': self.messages_to_json(messages)
#     #     }
#     #     self.send_message(content)

#     def fetch_messages(self, data):
#         messages = get_last_10_messages(data['room_name'])
#         content = {
#             'command': 'messages',
#             'messages': self.messages_to_json(messages)
#         }
#         self.send_message(content)

#     # def new_message(self, data):
#     #     user_contact = get_user_contact(data['from'])
#     #     message = ChatMessage.objects.create(
#     #         contact=user_contact,
#     #         content=data['message'])
#     #     current_chat = get_current_chat(data['chatId'])
#     #     current_chat.messages.add(message)
#     #     current_chat.save()
#     #     content = {
#     #         'command': 'new_message',
#     #         'message': self.message_to_json(message)
#     #     }
#     #     return self.send_chat_message(content)

#     def new_message(self, data):
#         # room_name = get_room_name(data['room_name'])
#         # user_contact = get_user_contact(data['user'])
#         user_id = data['user_id']
#         room_name = data['room_name']
#         chatroom = ChatRoom.objects.get(name=room_name)
#         message = ChatMessage.objects.create(
#             username_id=user_id,
#             room_name=chatroom,
#             comment=data['message'])
#         message.save()
#         # current_chat = get_current_chat(data['chatId'])
#         # current_chat.messages.add(message)
#         # current_chat.save()
#         content = {
#             'command': 'new_message',
#             'message': self.message_to_json(message)
#         }
#         return self.send_chat_message(content)

#     def messages_to_json(self, messages):
#         result = []
#         for message in messages:
#             result.append(self.message_to_json(message))
#         return result

#     def message_to_json(self, message):
#         return {
#             'id': message.id,
#             'author': message.contact.user.username,
#             'content': message.content,
#             'timestamp': str(message.timestamp)
#         }

#     commands = {
#         'fetch_messages': fetch_messages,
#         'new_message': new_message
#     }

#     def connect(self):
#         self.room_name = self.scope['url_route']['kwargs']['room_name']
#         self.room_group_name = 'chat_%s' % self.room_name
#         async_to_sync(self.channel_layer.group_add)(
#             self.room_group_name,
#             self.channel_name
#         )
#         self.accept()

#     def disconnect(self, close_code):
#         async_to_sync(self.channel_layer.group_discard)(
#             self.room_group_name,
#             self.channel_name
#         )

#     def receive(self, text_data):
#         data = json.loads(text_data)
#         self.commands[data['command']](self, data)

#     def send_chat_message(self, message):
#         async_to_sync(self.channel_layer.group_send)(
#             self.room_group_name,
#             {
#                 'type': 'chat_message',
#                 'message': message
#             }
#         )

#     def send_message(self, message):
#         self.send(text_data=json.dumps(message))

#     def chat_message(self, event):
#         message = event['message']
#         self.send(text_data=json.dumps(message))

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
        await self.createMessage(data)  # メッセージを DB に保存する
        await self.channel_layer.group_send(  # 指定グループにメッセージを送信する
            self.room_name,
            {
                'type': 'chat_message',
                'message': data['message'],
                'user_id': data['user_id'],
                'username': data['username']
                # 'username': data['username']
            }
        )

    async def chat_message(self, data):
        # グループメッセージを受け取る
        print(data)
        message = data['message']
        user_id = data['user_id']
        # useraccount = sync_to_async(UserAccount.objects.get(id=user_id))
        # websocket でメッセージを送信する
        await self.send(text_data=json.dumps({
            'type': 'chat_message',
            'message': data['message'],
            'user_id': data['user_id'],
            # 'username': useraccount.name
            'username': data['username']
        }))

    @database_sync_to_async
    def createMessage(self, data):
        room_name = data['room_name']
        chatroom = ChatRoom.objects.get(name=room_name)
        ChatMessage.objects.create(
            username_id=data['user_id'],
            room_name=chatroom,
            comment=data['message'],
        )
