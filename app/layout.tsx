import React, { PropsWithChildren } from "react";
import "./globals.css";
import Link from "next/link";
import { Control } from "@/app/Control";

export default async function Layout({ children }: PropsWithChildren) {
  // const [topics, setTopics] = useState([]);
  // useEffect(() => {
  //   fetch("http://localhost:9999/topics")
  //     .then((response) => response.json())
  //     .then((result) => {
  //       setTopics(result);
  //       console.log("result = ", result);
  //     });
  // }, []);
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/topics`, {
    cache: "no-store",
  });
  const topics = await response.json();
  return (
    <html>
      <body>
        <div className="navbar">
          <Link href="/">홈</Link>
          <Link href="/list">List</Link>
          <Link href="/custom">Custom</Link>
          <Link href="/pomodoro">Pomodoro</Link>
          <Link href="/tetris">Tetris</Link>
        </div>
        {topics.map((topic: any) => {
          return (
            <li key={topic.id}>
              <Link href={`/read/${topic.id}`}>{topic.title}</Link>
            </li>
          );
        })}
        {children}
        <Control />
      </body>
    </html>
  );
}
