"use client";
import Example from "@/app/custom/page";
import React from "react";
import Link from "next/link";
import { Button, Card, Grid, Text, useTheme } from "@nextui-org/react";

export default function Page() {
  const { theme } = useTheme();
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
      <Card>
        <Card.Body>
          <Text>Default card. (shadow)</Text>
        </Card.Body>
      </Card>
      <Card variant="bordered">
        <Card.Body>
          <Text>Bordered card.</Text>
        </Card.Body>
      </Card>
    </div>
  );
}
