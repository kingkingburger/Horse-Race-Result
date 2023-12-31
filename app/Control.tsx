"use client";
import { Link } from "@nextui-org/react";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

interface topic {
  testId: number;
  title: string;
}

type topicType = {
  [P in keyof topic]?: topic[P];
};

export function Control(props: any) {
  const params = useParams();
  const id = params?.id || 0;
  const router = useRouter();
  const topics = props.topics as { testId: number; title: string }[];
  const handleLinkClick = (topic: any) => {
    router.push(`/read/${topic.testId}`);
  };
  return (
    <div>
      <Dropdown>
        <DropdownTrigger>
          <Button variant="bordered">개시글들</Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Dynamic Actions" items={topics}>
          {(topic: topicType) => (
            <DropdownItem
              onClick={() => handleLinkClick(topic)}
              key={topic.testId}
            >
              <Link href={`/read/${topic.testId}`}>{topic.title}</Link>
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
      <div>
        <Link href="/create">게시판 생성하기</Link>
      </div>
      {id ? (
        <>
          <li>
            <Link href={`/update/${id}`}>Update</Link>
          </li>
          <li>
            <input
              type="button"
              value="delete"
              onClick={async () => {
                const options = { method: "DELETE" };
                const resp = await fetch(`http://localhost:9999/topics/${id}`, {
                  method: "DELETE",
                });
                await resp.json();
                router.push("/");
                router.refresh();
              }}
            />
          </li>
        </>
      ) : null}
    </div>
  );
}
