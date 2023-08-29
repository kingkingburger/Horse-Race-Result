"use client";

import { useRouter } from "next/navigation";
import { inspect } from "util";
import styles from "./create.module.css";

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
        const now = new Date().toISOString()
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, content, now }),
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
      <div className="flex justify-center items-center">
        <div className="w-1/3">
          <div className="text-center">
            <div className="mb-4">
              <input
                type="text"
                name="title"
                placeholder="title"
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <textarea
                name="content"
                placeholder="content"
                className="w-full p-2 border rounded"
              ></textarea>
            </div>
            <div>
              <input
                type="submit"
                value="create"
                className="w-full p-2 bg-blue-500 text-white rounded cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
