from django.contrib.auth import get_user_model

from rest_framework import permissions, serializers, status
from rest_framework.decorators import permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.generics import RetrieveAPIView

from .serializers import UserSerializer, UserListSerializer
from .models import UserAccount

User = get_user_model()


# アカウント登録
class RegisterView(APIView):
    # AllowAnyで認証しなくてもAPIに接続できるようになる
    permission_classes = (permissions.AllowAny, )

    def post(self, request):
        try:
            data = request.data
            name = data['name']
            email = data['email'].lower()
            password = data['password']

            # ユーザーの存在確認
            if not User.objects.filter(email=email).exists():
                # ユーザーが存在しない場合は作成
                User.objects.create_user(
                    name=name, email=email, password=password)

                return Response(
                    {'success': 'ユーザーの作成に成功しました'},
                    status=status.HTTP_201_CREATED
                )
            else:
                return Response(
                    {'error': 'すでに登録されているメールアドレスです'},
                    status=status.HTTP_400_BAD_REQUEST
                )

        except:
            return Response(
                {'error': 'アカウント登録時に問題が発生しました'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

# ユーザー情報取得


class UserView(APIView):
    def get(self, request):
        try:
            user = request.user
            # UserSerializerでjson形式にする
            user = UserSerializer(user, context={"request": request})

            return Response(
                {'user': user.data},
                status=status.HTTP_200_OK
            )

        except:
            return Response(
                {'error': 'ユーザーの取得に問題が発生しました'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


# ?username=kensukeのようにfilterをかける
class UserRetrieve(RetrieveAPIView):
    # 誰でも検索できる
    permission_classes = (permissions.AllowAny, )
    queryset = UserAccount.objects.all()
    serializer_class = UserListSerializer


class UserRandom(ModelViewSet):
    permission_classes = (permissions.AllowAny, )
    queryset = UserAccount.objects.order_by('?')[:20]
    serializer_class = UserListSerializer
