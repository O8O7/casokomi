from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework import routers
from .views import UserRetrieve, UserRandom


# 追加
router = DefaultRouter()
router.register('random', UserRandom)

urlpatterns = [
    path('', include(router.urls)),
    path('user/<int:pk>/', UserRetrieve.as_view()),
]
