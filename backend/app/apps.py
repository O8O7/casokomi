from django.apps import AppConfig


class AppConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'app'

    # # コイン情報をスケジュールで取得する
    def ready(self):
        print("Starting Scheduler")
        from .coin_scheduler import coin_updater
        coin_updater.start()
