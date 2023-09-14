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
  Title: string;
  news_title: string;
  link: string;
}

export default function Board() {
  const router = useRouter();
  const [topics, setTopics] = useState([]);
  const [feed, setFeed] = useState("");
  const [recommend, setRecommend] = useState<recommend[]>([]);
  const [recommendTitle, setRecommendTitle] = useState("");
  // const [recommendNews, setRecommendNews] = useState("");
  // const [recommendLink, setRecommendLink] = useState("");

  const parser = new Parser();
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
        console.log("recommendJson.data = ", recommendJson.data);
        const recommendArray: recommend[] = recommendJson.data;
        setRecommend(recommendJson.data);
        for (const recommendArrayElement of recommendArray) {
          setRecommendTitle(recommendArrayElement.Title);
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
      <div className="mx-auto mt-3 w-full sm:w-1/2">
        오늘의 글감:
        {/*{recommend.map((item: recommend) => (*/}
        {/*  <div key={item.link}>{item.Title}</div>*/}
        {/*))}*/}
        {recommend}
        <div className="text-right mb-1">
          <Link href="/create" className="rounded border-1 border-gray-500 p-2">
            글쓰기
          </Link>
        </div>
        <div className="flex">
          <div className="w-6/12">제목</div>
          <div className="w-3/12">날짜</div>
        </div>
        <ul>
          {topics.map((topic: topic, index: number) => (
            <li className="p-3 border-t-2" key={topic.testId}>
              <div className="flex">
                <div className="w-6/12">
                  <button onClick={() => handleLinkClick(topic)}>
                    {topic.title}
                  </button>
                </div>
                <div className="w-3/12">
                  {getTimeDiff(dayjs(topic.createdAt))}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
