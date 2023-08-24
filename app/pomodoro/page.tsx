"use client";

import { useEffect, useState } from "react";
import CountdownTimer from "@/app/pomodoro/CountdonwTimer";

import styles from "./pomodoro.module.css"; // css module로 css를 import 하는 방법

export default function Pomodoro() {
  const [time, setTime] = useState(25 * 60);

  useEffect(() => {
    if (time === 0) return;

    const timer = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [time]);

  return (
    <div className="flex justify-center">
      <div className={styles.mainContent}>
        It's a Pomodoro timer. I work for 25 minutes and take a five-minute
        break
        <CountdownTimer />
      </div>
    </div>
  );
}
