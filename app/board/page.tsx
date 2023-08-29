"use client";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {Link} from "@nextui-org/react";

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
            <div className="flex justify-center mt-3 w-full sm:w-1/2">
                <ul>
                    {topics.map((topic: topic, index: number) => (
                        <li key={topic.testId}>
                            {/*<div className="w-full sm:w-1/2">*/}
                            <button className="" onClick={() => handleLinkClick(topic)}>
                                {index + 1}. {topic.title}
                            </button>
                            {/*</div>*/}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
