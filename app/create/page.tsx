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
        const content = (
          event.currentTarget.elements.namedItem("content") as HTMLInputElement
        )?.value;
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, content }),
        };
        fetch(`${process.env.NEXT_PUBLIC_MONGO_API_URL}/api/test`, options)
          .then((response) => response.json())
          .then((result) => {
            console.log(result);
            const lastId = result.testId;
            router.refresh();
            router.push(`/read/${lastId}`);
          });
      }}
    >
      <p>
        <input type="text" name="title" placeholder={"title"} />
      </p>
      <p>
        <textarea name={"content"} placeholder={"content"} />
      </p>
      <p>
        <input type={"submit"} value={"create"} />
      </p>
    </form>
  );
}
