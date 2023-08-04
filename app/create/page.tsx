"use client";

import { useRouter } from "next/navigation";

export default function Create() {
  const router = useRouter();
  return (
    <form
      onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const title = (
          event.currentTarget.elements.namedItem("title") as HTMLInputElement
        )?.value;
        const body = (
          event.currentTarget.elements.namedItem("body") as HTMLInputElement
        )?.value;
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, body }),
        };
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/topics`, options)
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
        <input type="text" name="title" placeholder={"title"} />
      </p>
      <p>
        <textarea name={"body"} placeholder={"body"} />
      </p>
      <p>
        <input type={"submit"} value={"create"} />
      </p>
    </form>
  );
}
