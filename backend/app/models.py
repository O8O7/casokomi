from django.db import models
# from django.contrib.auth import get_user_model
from accounts.models import UserAccount
from django.utils.functional import cached_property

# Create your models here.


class ChatRoom(models.Model):
    name = models.CharField("部屋名", max_length=32, unique=True)
    created_at = models.DateField(auto_now_add=True)

    # 次の行からの関数の返り値を記憶しておいて、何度も同じ関数が呼ばれた時に、関数そのものを実行せずに、覚えていた返り値を返す動作に置き換えます。
    # @cached_property
    # def members(self):
    #     return get_user_model().objects.filter(
    #         member__room=self,
    #     ).annotate(last_seen=models.Max())

    def __str__(self):
        return self.name


class ChatMessage(models.Model):
    username = models.ForeignKey(
        UserAccount, on_delete=models.CASCADE, related_name="username_chatmessage")
    room_name = models.ForeignKey(
        ChatRoom, on_delete=models.CASCADE, related_name="room_name_chatmessage")
    comment = models.CharField("コメント", max_length=64)
    posted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.comment


class Member(models.Model):
    room = models.ForeignKey(ChatRoom, on_delete=models.CASCADE)
    # chat_message = models.ForeignKey(ChatMessage, on_delete=models.CASCADE)
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)


class Hert(models.Model):
    message = models.ForeignKey(ChatMessage, on_delete=models.CASCADE)
    pass


class CoinMarketInfo(models.Model):
    name = models.CharField("名前", max_length=32, default="NotFound")
    symbol = models.CharField("シンボル", max_length=32, default="NotFound")
    rank = models.IntegerField("ランク", default="NotFound")
    day_perchange = models.FloatField("24h変化", default="NotFound")
    market_cap = models.FloatField("マーケットキャップ", default="NotFound")
    last_updated = models.CharField("最終更新日", max_length=50)

    def __str__(self):
        return self.name
