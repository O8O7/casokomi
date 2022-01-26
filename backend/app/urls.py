from django.urls import path, include
from .views import ChatMessageView, CoinMarketView

from rest_framework.routers import DefaultRouter
from rest_framework import routers

# 追加
# router = DefaultRouter()
# router.register(r'chatmessage', ChatMessageView)
# router.register(r'coin_info', CoinMarketView)
# urlpatterns = router.urls

router = routers.SimpleRouter()
router.register('chatmessage', ChatMessageView)
router.register('coin_info', CoinMarketView)
urlpatterns = router.urls

# urlpatterns = [
#     path('create/', ChatCreateView.as_view()),
#     path('<pk>/delete/', ChatDeleteView.as_view()),
# ]
