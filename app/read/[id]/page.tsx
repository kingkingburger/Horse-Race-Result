import { PropsWithChildren, PropsWithRef } from "react";

export default async function Read(props: PropsWithRef<any>) {
  console.log("props = ", props);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_MONGO_API_URL}/api/test?testId=${props.params.id}`,
    { cache: "no-store" }
  );
  const topic = await response.json();
  return (
    <>
      <h2>{topic.title}</h2>
      {topic.body}
    </>
  );
}
