"use client";
// server component에서는 html에 자바스크립트 기능 넣기 불가능

import { age } from "./data";
import { Image } from "@nextui-org/react";

export default function list() {
  let product = ["tomatoes", "pasta", "potato", "love"];

  return (
    <div>
      {age}
      <h4>
        {product.map((v, i) => {
          return (
            <div key={i}>
              <h4>{v}</h4>
              <Image src={`/${i + 1}.webp`} alt="태스트이미지" />
            </div>
          );
        })}
      </h4>
    </div>
  );
}
