from django.shortcuts import render

from requests import Session
from rest_framework import permissions
from rest_framework.decorators import permission_classes
from rest_framework.viewsets import ModelViewSet
from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    CreateAPIView,
    DestroyAPIView,
)
from .serializers import ChatMessageSerializer, CoinMarketInfoSerializer
from .models import ChatMessage, CoinMarketInfo, ChatRoom
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404

User = get_user_model()

# ?username=kensukeのようにfilterをかける


class ChatMessageView(ModelViewSet):
    # 誰でも検索できる
    permission_classes = (permissions.AllowAny, )
    queryset = ChatMessage.objects.all()
    serializer_class = ChatMessageSerializer

    def get_queryset(self):
        queryset = ChatMessage.objects.all()
        room_name = self.request.query_params.get('room_name', None)
        if room_name is not None:
            # 完全一致
            # queryset = queryset.filter(
            #     room_name__name=room_name).order_by('-posted_at')[:10]
            queryset = queryset.filter(
                room_name__name=room_name).all()
        return queryset


class CoinMarketView(ModelViewSet):
    permission_classes = (permissions.AllowAny, )
    queryset = CoinMarketInfo.objects.all()
    serializer_class = CoinMarketInfoSerializer

    def get_queryset(self):
        queryset = CoinMarketInfo.objects.all()
        coin_name = self.request.query_params.get('coin_name', None)
        if coin_name is not None:
            queryset = queryset.filter(name__icontains=coin_name)
        return queryset

    def _get_coin_data(self):
        url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest"
        API_KEY = '12748421-ef15-4f3d-9467-976c62778580'
        headers = {
            'Accepts': 'application/json',
            'X-CMC_PRO_API_KEY': API_KEY,
        }
        params = {
            'start': '1',
            'limit': '100',
            'aux': 'cmc_rank'
        }
        session = Session()
        session.headers.update(headers)
        try:
            request = session.get(url, params=params)
            data = request.json()["data"]
            return data
        except (ConnectionError, Timeout, TooManyRedirects) as e:
            print(e)
            return None
        # api_request = request.get(url)

    def save_coin_data(self):
        coin_data = self._get_coin_data()
        # print('coin_data is {coin_data}'.format(coin_data=coin_data))
        print(coin_data)
        if coin_data is not None:
            try:
                for coin_list in coin_data:
                    # 100個のデータを最新情報にアップデートする
                    rank_id = coin_list["cmc_rank"]
                    coin_objects = CoinMarketInfo.objects.get(rank=rank_id)
                    coin_objects.name = coin_list["name"]
                    coin_objects.symbol = coin_list["symbol"]
                    coin_objects.day_perchange = coin_list["quote"]["USD"]["percent_change_24h"]
                    coin_objects.market_cap = coin_list["quote"]["USD"]["market_cap"]
                    coin_objects.last_updated = coin_list["quote"]["USD"]["last_updated"]
                    # 100個コインの情報を取得して作成する
                    # coin_objects = CoinMarketInfo.objects.create(name=coin_list["name"], symbol=coin_list["symbol"], rank=coin_list["cmc_rank"], day_perchange=coin_list[
                    #                                              "quote"]["USD"]["percent_change_24h"], market_cap=coin_list["quote"]["USD"]["market_cap"], last_updated=coin_list["quote"]["USD"]["last_updated"])
                    coin_objects.save()
            except:
                pass

# def get_last_10_messages(chatId):
#     chat = get_object_or_404(ChatMessage, id=chatId)
#     return chat.comment.order_by('-posted_at').all()[:10]


# def get_last_10_messages(room_name):
#     chat = ChatMessage.objects.filter(room_name__name=room_name)[:10]
#     return chat


# def get_user_contact(username):
#     user = get_object_or_404(User, name=username)
#     return user


# def get_current_chat(chatId):
#     return get_object_or_404(ChatMessage, id=chatId)


# def get_room_name(room_name):
#     room = get_object_or_404(ChatRoom, name=room_name)
#     return room


# class ChatMessageListView(ListAPIView):
#     serializer_class = ChatMessageSerializer
#     permission_classes = (permissions.AllowAny,)

#     # def get_queryset(self):
#     #     queryset = ChatMessage.objects.all()
#     #     username = self.request.query_params.get('room_name', None)
#     #     if username is not None:
#     #         contact = get_user_contact(username)
#     #         queryset = contact.chats.all()
#     #     return queryset
#     def get_queryset(self):
#         queryset = ChatMessage.objects.all()
#         room_name = self.request.query_params.get('room_name', None)
#         if room_name is not None:
#             contact = get_user_contact(room_name)
#             queryset = contact.chats.all()
#         return queryset


class ChatCreateView(CreateAPIView):
    queryset = ChatMessage.objects.all()
    serializer_class = ChatMessageSerializer
    permission_classes = (permissions.IsAuthenticated, )


class ChatDeleteView(DestroyAPIView):
    queryset = ChatMessage.objects.all()
    serializer_class = ChatMessageSerializer
    permission_classes = (permissions.IsAuthenticated, )
