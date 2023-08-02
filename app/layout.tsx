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
          <Link href="/tetris">Tetris</Link>
        </div>
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
