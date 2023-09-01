"use client";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {Link} from "@nextui-org/react";
import {getTimeDiff} from "@/app/board/getTimeDiff";
import dayjs, {Dayjs} from "dayjs";

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
                console.log('fetchedTopics = ', fetchedTopics);
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
            <Link href="/create">게시판 생성하기</Link>
            <div className="mx-auto mt-3 w-full sm:w-1/2">
                <ul>
                    {topics.map((topic: topic, index: number) => (
                        <li className="border-t-1 border-b-1 border-gray-500" key={topic.testId}>
                            <div className="flex">
                                <div className="col-auto">
                                    <button className="" onClick={() => handleLinkClick(topic)}>
                                        {index + 1}. {topic.title}
                                    </button>
                                </div>
                            </div>
                            <div className="mx-3 text-small">
                                {getTimeDiff(dayjs(topic.createdAt))}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
