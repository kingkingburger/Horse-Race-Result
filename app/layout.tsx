"use client";
import React, { PropsWithChildren } from "react";
import "./globals.css";
import Link from "next/link";
export default function Layout({ children }: PropsWithChildren) {
  return (
    <html>
      <body>
        <div className="navbar">
          <Link href="/">홈</Link>
          <Link href="/list">List</Link>
          <Link href="/custom">Custom</Link>
          <Link href="/pomodoro">Pomodoro</Link>
        </div>
        {children}
      </body>
    </html>
  );
}
