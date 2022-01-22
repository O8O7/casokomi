from apscheduler.schedulers.background import BackgroundScheduler
from app.views import CoinMarketView


def start():
    scheduler = BackgroundScheduler(timezone="Asia/Tokyo")
    coin = CoinMarketView()
    scheduler.add_job(coin.save_coin_data, "interval", minutes=60,
                      id="coinFetch_001", replace_existing=True)
    scheduler.start()
