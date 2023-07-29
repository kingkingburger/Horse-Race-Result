"use client";

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import CountdownTimer from "@/app/pomodoro/CountdonwTimer";

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
    <div className="h-screen flex justify-center ">
      <p className="text-center border-8">가운데 정렬되는 텍스트 예시입니다.</p>
      <div className="text-center border-8">
        <CountdownTimer />
      </div>
    </div>
  );
}
