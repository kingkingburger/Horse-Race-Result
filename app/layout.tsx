import React, { PropsWithChildren } from "react";
import "./globals.css";
import Link from "next/link";

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
  const response = await fetch("http://localhost:9999/topics");
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
        <ul>
          <li>
            <Link href="/create">Create</Link>
          </li>
          <li>
            <Link href="/update/1">Update</Link>
          </li>
          <li>
            <input type="button" value="delete" />
          </li>
        </ul>
      </body>
    </html>
  );
}
