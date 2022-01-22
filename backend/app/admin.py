from django.contrib import admin
from .models import ChatRoom, ChatMessage, Member, CoinMarketInfo

# Register your models here.
admin.site.register(ChatRoom)
admin.site.register(ChatMessage)
admin.site.register(Member)
admin.site.register(CoinMarketInfo)
