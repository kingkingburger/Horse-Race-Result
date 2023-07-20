"use client";
import React, { PropsWithChildren } from "react";
import "./globals.css";
import Link from "next/link";
export default function Layout({ children }: PropsWithChildren) {
  return (
    <html>
      <div className="navbar">
        <Link href="/">홈</Link>
        <Link href="/list">List</Link>
      </div>
      <body>{children}</body>
    </html>
  );
}
