import { PropsWithChildren, PropsWithRef } from "react";

export default async function Read(props: PropsWithRef<any>) {
  const response = await fetch(
    `http://localhost:9999/topics/${props.params.id}`
  );
  const topic = await response.json();
  return (
    <>
      <h2>{topic.title}</h2>
      {topic.body}
    </>
  );
}
