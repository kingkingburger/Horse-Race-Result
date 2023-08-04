import { useEffect, useState } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { inspect } from "util";
import styles from "./pomodoro.module.css";
dayjs.extend(duration);

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const CountdownTimer = () => {
  const [time, setTime] = useState(25 * 60); // 25 minutes in seconds
  const [isBreakTime, setIsBreakTime] = useState(false);
  const [textColor, setTextColor] = useState("#000"); // 초기 색상은 검정(#000)으로 설정

  useEffect(() => {
    if (time === 0) {
      setIsBreakTime((prev) => !prev); // Toggle isBreakTime state
      setTime(isBreakTime ? 25 * 60 : 5 * 60); // Set time based on break or work time
    }

    const timer = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
      const newColor = getRandomColor();
      setTextColor(newColor);
    }, 1000);

    return () => clearInterval(timer);
  }, [time, isBreakTime]);

  // Function to format seconds as mm:ss
  const formatTime = (seconds: number): string => {
    const formattedTime = dayjs.duration(seconds, "seconds").format("mm:ss");
    return formattedTime;
  };

  return (
    <div>
      <h1>Countdown Timer</h1>
      {isBreakTime ? <p>Break Time</p> : <p>Work Time</p>}
      Time remaining:{" "}
      <p className={styles.timer} style={{ color: textColor }}>
        {formatTime(time)}
      </p>
    </div>
  );
};

export default CountdownTimer;
