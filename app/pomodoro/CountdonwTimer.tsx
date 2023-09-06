import { useEffect, useState } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import styles from "./pomodoro.module.css";
import ProgressBar from "@/app/pomodoro/progressbar";

dayjs.extend(duration);

const CountdownTimer = () => {
  const [time, setTime] = useState(25 * 60); // 25 minutes in seconds
  const [isBreakTime, setIsBreakTime] = useState(false);
  const [progress, setProgress] = useState(0);
  const [cycle, setCycle] = useState(0);
  useEffect(() => {
    if (time === 0) {
      setIsBreakTime((prev) => !prev); // Toggle isBreakTime state
      setTime(isBreakTime ? 25 * 60 : 5 * 60); // Set time based on break or work time
    }

    const timer = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
      setProgress((prevProgress) => {
        let mainTime = isBreakTime ? 5 * 60 : 25 * 60;
        const newProgress = prevProgress + 1 / mainTime;
        return newProgress > 1 ? 0 : newProgress;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [time, isBreakTime]);

  useEffect(() => {
    setCycle((prev) => prev + 1);
  }, [isBreakTime]);

  // Function to format seconds as mm:ss
  const formattedTime = dayjs.duration(time, "seconds").format("mm:ss");

  return (
    <div>
      <div
        className={`${styles.info} ${isBreakTime ? styles.break : styles.work}`}
      >
        {isBreakTime ? "Break Time" : "Work Time"}
      </div>
      <div>cycle: {cycle}</div>
      <div className={styles.progressBar}>
        <ProgressBar progress={progress} />
        <div className={styles.circle}>
          <p>{formattedTime}</p>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
