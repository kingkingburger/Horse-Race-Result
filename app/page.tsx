"use client";
import Example from "@/app/custom/page";
import React from "react";
import Link from "next/link";
import { Button } from "@nextui-org/react";

export default function Page() {
  return (
    <div>
      <h1>Hello, Next.js!</h1>
      <Link href="/custom">
        <div>custom</div>
      </Link>
      <Link href="/about">
        <div>about</div>
      </Link>
      <Button>Click me</Button>
    </div>
  );
}
