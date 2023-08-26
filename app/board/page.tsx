"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface topic {
  testId: number;
  title: string;
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
      <ul>
        {topics.map((topic: topic) => (
          <li key={topic.testId}>
            <button onClick={() => handleLinkClick(topic)}>
              {topic.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
