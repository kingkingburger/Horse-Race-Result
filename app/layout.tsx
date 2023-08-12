import React, { PropsWithChildren } from "react";
import "./globals.css";
import Link from "next/link";
import { Control } from "@/app/Control";

function getRandomColorName(colorArray: string[]) {
  return colorArray[Math.floor(Math.random() * colorArray.length)];
}

export default async function Layout({ children }: PropsWithChildren) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_MONGO_API_URL}/api/test`,
    {
      cache: "no-store",
    }
  );
  const topics = await response.json();

  return (
    <html className="dark">
      <body>
        <div className="navbar">
          <Link href="/">홈</Link>
          <Link href="/list">List</Link>
          <Link href="/custom">Custom</Link>
          <Link href="/pomodoro">Pomodoro</Link>
          <Link href="/tetris">Tetris</Link>

          <Control topics={topics} />
        </div>

        {children}
      </body>
    </html>
  );
}
