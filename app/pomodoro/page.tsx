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

  // Function to format seconds as mm:ss
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div>
      <div className="border-8 flex justify-center grid">
        <div className={styles.mainContent}>
          뽀모도로 타이머 입니다. 25분을 기준 5분 휴식입니다
        </div>
        <CountdownTimer />
      </div>
    </div>
  );
}
