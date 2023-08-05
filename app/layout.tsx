import React, { PropsWithChildren } from "react";
import "./globals.css";
import Link from "next/link";
import { Control } from "@/app/Control";

function getRandomColorName(colorArray: string[]) {
  return colorArray[Math.floor(Math.random() * colorArray.length)];
}

export default async function Layout({ children }: PropsWithChildren) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/topics`, {
    cache: "no-store",
  });
  const topics = await response.json();
  const colorArray = [
    "foreground",
    "primary",
    "secondary",
    "success",
    "warning",
    "danger",
  ];
  return (
    <html className="dark">
      <body>
        <div className="navbar">
          <Link href="/">홈</Link>
          <Link href="/list">List</Link>
          <Link href="/custom">Custom</Link>
          <Link href="/pomodoro">Pomodoro</Link>
          <Link href="/tetris">Tetris</Link>

          <Control colorArray={colorArray} topics={topics} />
        </div>

        {children}
      </body>
    </html>
  );
}
