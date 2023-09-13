import feedparser
import json

# RSS 피드 URL
rss_url = "https://trends.google.co.kr/trends/trendingsearches/daily/rss?geo=KR"

# RSS 피드 파싱
feed = feedparser.parse(rss_url)

# 결과를 저장할 리스트
result_list = []

# "item" 요소의 "title"과 "ht:news_item_title" 데이터를 리스트에 추가
for entry in feed.entries:
    title = entry.title
    news_item_title = entry.get("ht_news_item_title", "N/A")
    link = entry.link

    result_list.append({"title": title, "news_title": news_item_title, 'link': link})

# JSON 형식으로 결과를 파일에 저장
with open("todayResult.json", "w", encoding="utf-8") as json_file:
    json.dump(result_list, json_file, ensure_ascii=False, indent=4)

print("Results saved to 'todayResult.json'")
