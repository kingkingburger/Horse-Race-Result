"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Link } from "@nextui-org/react";
import { getTimeDiff } from "@/app/board/getTimeDiff";
import dayjs, { Dayjs } from "dayjs";

interface topic {
  testId: number;
  title: string;
  createdAt: Date;
}

export default function Board() {
  const router = useRouter();
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    async function fetchTopics() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_MONGO_API_URL}/api/test`,
          {
            cache: "no-store",
          }
        );
        const fetchedTopics = await response.json();
        console.log("fetchedTopics = ", fetchedTopics);
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
