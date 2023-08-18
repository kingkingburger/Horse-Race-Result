"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Update() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const router = useRouter();

  const params = useParams();
  const id = params?.id;
  useEffect(() => {
    fetch(`http://localhost:9999/topics/${id}`)
      .then((response) => response.json())
      .then((result) => {
        setTitle(result.title);
        setBody(result.body);
        console.log(result);
      });
  }, [id]);
  return (
    <form
      onSubmit={async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const title = (
          event.currentTarget.elements.namedItem("title") as HTMLInputElement
        )?.value;
        const body = (
          event.currentTarget.elements.namedItem("body") as HTMLInputElement
        )?.value;
        const options = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, body }),
        };
        fetch(`http://localhost:9999/topics/${id}`, options)
          .then((response) => response.json())
          .then((result) => {
            console.log(result);
            const lastId = result.id;
            router.refresh();
            router.push(`/read/${lastId}`);
          });
      }}
    >
      <p>
        <input
          type="text"
          name="title"
          placeholder={"title"}
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
        />
      </p>
      <p>
        <textarea
          name={"body"}
          placeholder={"body"}
          value={body}
          onChange={(e) => setBody(e.currentTarget.value)}
        />
      </p>
      <p>
        <input type={"submit"} value={"update"} />
      </p>
    </form>
  );
}
