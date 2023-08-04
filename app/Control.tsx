"use client";
import Link from "next/link";
import React from "react";
import { useParams, useRouter } from "next/navigation";

export function Control() {
  const params = useParams();
  const id = params.id;
  const router = useRouter();
  return (
    <ul>
      <li>
        <Link href="/create">Create</Link>
      </li>
      {id ? (
        <>
          <li>
            <Link href={`/update/${id}`}>Update</Link>
          </li>
          <li>
            <input
              type="button"
              value="delete"
              onClick={async () => {
                const options = { method: "DELETE" };
                const resp = await fetch(`http://localhost:9999/topics/${id}`, {
                  method: "DELETE",
                });
                await resp.json();
                router.push("/");
                router.refresh();
              }}
            />
          </li>
        </>
      ) : null}
    </ul>
  );
}
