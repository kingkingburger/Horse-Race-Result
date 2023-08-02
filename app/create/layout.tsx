import { PropsWithChildren } from "react";

export default function Layout(props: PropsWithChildren) {
  return (
    <form>
      <h2> Create layout</h2>
      {props.children}
    </form>
  );
}
