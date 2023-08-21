import {useEffect, useState} from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import {getRandomColor} from "@/app/pomodoro/getRandomColor";
import styles from "./pomodoro.module.css"

dayjs.extend(duration);


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
    const formattedTime = dayjs.duration(time, "seconds").format("mm:ss");

    return (
        <div>
            <h1 className={styles.heading}>Countdown Timer</h1>
            <div className={styles.progressBar}>
                <div className={styles.circle}>
                    <p>{formattedTime}</p>
                </div>
            </div>
            <p className={`${styles.info} ${isBreakTime ? styles.break : styles.work}`}>
                {isBreakTime ? "Break Time" : "Work Time"}
            </p>
        </div>
    );
};

export default CountdownTimer;
