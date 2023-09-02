"use client";
import React, { useEffect, useState } from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { getTimeDiff } from "@/app/board/getTimeDiff";
import dayjs from "dayjs";

interface topic {
  testId: number;
  title: string;
  createdAt: Date;
}

export default function Card4() {
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

  const list = [
    {
      title: "Orange",
      img: "https://nextui.org/images/fruit-1.jpeg",
      price: "$5.50",
    },
    {
      title: "Tangerine",
      img: "https://nextui.org/images/fruit-2.jpeg",
      price: "$3.00",
    },
    {
      title: "Raspberry",
      img: "https://nextui.org/images/fruit-3.jpeg",
      price: "$10.00",
    },
    {
      title: "Lemon",
      img: "https://nextui.org/images/fruit-4.jpeg",
      price: "$5.30",
    },
    {
      title: "Avocado",
      img: "https://nextui.org/images/fruit-5.jpeg",
      price: "$15.70",
    },
    {
      title: "Lemon 2",
      img: "https://nextui.org/images/fruit-6.jpeg",
      price: "$8.00",
    },
    {
      title: "Banana",
      img: "https://nextui.org/images/fruit-7.jpeg",
      price: "$7.50",
    },
    {
      title: "Watermelon",
      img: "https://nextui.org/images/fruit-8.jpeg",
      price: "$12.20",
    },
  ];

  return (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
      {list.map((item, index) => (
        <Card
          shadow="sm"
          key={index}
          isPressable
          onPress={() => console.log("item pressed")}
        >
          <CardBody className="overflow-visible p-0">
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              alt={item.title}
              className="w-full object-cover h-[140px]"
              src={item.img}
            />
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b>{item.title}</b>
            <p className="text-default-500">{item.price}</p>
          </CardFooter>
        </Card>
      ))}
      {topics.map((topic: topic, index: number) => (
        <Card
          shadow="sm"
          key={index}
          isPressable
          onPress={() => console.log("item pressed")}
        >
          <CardBody className="overflow-visible p-0">
            <div className="flex">
              <div className="w-3/12">{index + 1}</div>
              <div className="w-6/12">
                <button onClick={() => handleLinkClick(topic)}>
                  {topic.title}
                </button>
              </div>
              <div className="w-3/12">
                {getTimeDiff(dayjs(topic.createdAt))}
              </div>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
