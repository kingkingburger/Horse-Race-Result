"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Link } from "@nextui-org/react";
import { getTimeDiff } from "@/app/board/getTimeDiff";
import dayjs, { Dayjs } from "dayjs";
import Parser from "rss-parser";
interface topic {
  testId: number;
  title: string;
  createdAt: Date;
}

interface recommend {
  title: string;
  news_title: string;
  link: string;
}

export default function Board() {
  const router = useRouter();
  const [topics, setTopics] = useState([]);
  const [feed, setFeed] = useState("");
  const [recommend, setRecommend] = useState<recommend[]>([]);
  const [recommendTitle, setRecommendTitle] = useState([""]);
  const [recommendNews, setRecommendNews] = useState([""]);
  const [recommendLink, setRecommendLink] = useState([""]);

  useEffect(() => {
    async function fetchTopics() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_MONGO_API_URL}/api/test`,
          {
            cache: "no-store",
          }
        );
        const recommend = await fetch(`http://localhost:3001/api/readFile`, {
          cache: "no-store",
        });

        const fetchedTopics = await response.json();

        const recommendJson = await recommend.json();
        const recommendArray: recommend[] = JSON.parse(recommendJson.data);
        console.log("recommendJson = ", recommendArray);
        setRecommend(recommendArray);

        for (const recommendArrayElement of recommendArray) {
          console.log("recommendArrayElement = ", recommendArrayElement.title);
          // console.log("recommendArrayElement.Title = ", recommendArrayElement);
          // setRecommendTitle(recommendArrayElement.title);
          // setRecommendNews(recommendArrayElement.news_title);
          // setRecommendLink(recommendArrayElement.link);
        }

        setTopics(fetchedTopics);
      } catch (e) {
        console.error(e);
      }
    }

    fetchTopics();
  }, []);

  const handleLinkClick = (topic: topic) => {
    router.push(`/read/${topic.testId}`);
  };

  return (
    <div>
      <div className="text-right mb-1 col-auto">
        <Link href="/create" className="rounded border-1 border-gray-500 p-2">
          글쓰기
        </Link>
      </div>
      <div className="mt-3  flex">
        <div className="col-auto">
          오늘의 글감:
          {recommend.map((v, index) => {
            return (
              <div key={index}>
                <div>제목: {v.title}</div>
                <Link href={v.link}>뉴스 제목: {v.news_title}</Link>
              </div>
            );
          })}
        </div>
        <div className="col-auto">
          <div className="flex">
            <div className="col-auto mx-4">제목</div>
            <div className="col-auto">날짜</div>
          </div>
          <ul>
            {topics.map((topic: topic, index: number) => (
              <li className="p-3 border-t-2" key={topic.testId}>
                <div className="flex">
                  <div className="col-auto mx-4">
                    <button onClick={() => handleLinkClick(topic)}>
                      {topic.title}
                    </button>
                  </div>
                  <div className="col-auto">
                    {getTimeDiff(dayjs(topic.createdAt))}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
