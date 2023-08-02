import { PropsWithChildren, PropsWithRef } from "react";

export default function Read(props: PropsWithRef<any>) {
  return (
    <>
      <h2>Read</h2>
      parameters: {props.params.id}
    </>
  );
}
