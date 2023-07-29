import { useEffect, useState } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

const CountdownTimer = () => {
  const [time, setTime] = useState(25 * 60); // 25 minutes in seconds
  const [isBreakTime, setIsBreakTime] = useState(false);

  useEffect(() => {
    if (time === 0) {
      setIsBreakTime((prev) => !prev); // Toggle isBreakTime state
      setTime(isBreakTime ? 25 * 60 : 5 * 60); // Set time based on break or work time
    }

    const timer = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
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
      <p>Time remaining: {formatTime(time)}</p>
    </div>
  );
};

export default CountdownTimer;
