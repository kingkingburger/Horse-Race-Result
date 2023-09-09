# from pytrends.request import TrendReq
# trend = TrendReq(hl='ko-KR', tz=540)
# df = trend.trending_searches(pn='south_korea')
# today_info = trend.today_searches()
#
# print(today_info)
# print(df)

import feedparser

# RSS 피드 URL
rss_url = "https://trends.google.co.kr/trends/trendingsearches/daily/rss?geo=KR"

# RSS 피드 파싱
feed = feedparser.parse(rss_url)

# "item" 요소의 "title"과 "ht:news_item_title" 데이터 출력
for entry in feed.entries:
    title = entry.title
    news_item_title = entry.get("ht_news_item_title", "N/A")

    print("Title:", title)
    print("ht:news_item_title:", news_item_title)
    print("-" * 40)
