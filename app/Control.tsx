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

interface colorElement {
  success: string;
  foreground: string;
  primary: string;
  secondary: string;
  warning: string;
  danger: string;
  undefined: undefined;
}

function getRandomColorName(
  colorArray: string[]
):
  | "success"
  | "foreground"
  | "primary"
  | "secondary"
  | "warning"
  | "danger"
  | undefined {
  return colorArray[Math.floor(Math.random() * colorArray.length)] as
    | "success"
    | "foreground"
    | "primary"
    | "secondary"
    | "warning"
    | "danger"
    | undefined;
}
export function Control(props: any) {
  const params = useParams();
  const id = params.id;
  const router = useRouter();
  const topics = props.topics as { id: number; title: string }[];

  return (
    <ul>
      <Dropdown>
        <DropdownTrigger>
          <Button variant="bordered">개시글들</Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Dynamic Actions" items={topics}>
          {(topic: any) => (
            <DropdownItem key={topic.id}>
              <Link href={`/read/${topic.id}`}>{topic.title}</Link>
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
      <li>
        <Link href="/create">Create</Link>
      </li>
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
    </ul>
  );
}
