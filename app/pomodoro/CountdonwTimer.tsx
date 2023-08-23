import {useEffect, useRef, useState} from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import {getRandomColor} from "@/app/pomodoro/getRandomColor";
import styles from "./pomodoro.module.css"
import ProgressBar from "@/app/pomodoro/progressbar";

dayjs.extend(duration);


const CountdownTimer = () => {
    const [time, setTime] = useState(25 * 60); // 25 minutes in seconds
    const [isBreakTime, setIsBreakTime] = useState(false);
    const [textColor, setTextColor] = useState("#000"); // 초기 색상은 검정(#000)으로 설정
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (time === 0) {
            setIsBreakTime((prev) => !prev); // Toggle isBreakTime state
            setTime(isBreakTime ? 25 * 60 : 5 * 60); // Set time based on break or work time
        }

        const timer = setInterval(() => {
            setTime((prevTime) => prevTime - 1);
            const newColor = getRandomColor();
            setTextColor(newColor);
            setProgress((prevProgress) => {
                const newProgress = prevProgress + 0.05;
                return newProgress > 1 ? 0 : newProgress;
            })
        }, 1000);

        return () => clearInterval(timer);
    }, [time, isBreakTime]);

    // Function to format seconds as mm:ss
    const formattedTime = dayjs.duration(time, "seconds").format("mm:ss");

    return (
        <div>
            <div className={`${styles.info} ${isBreakTime ? styles.break : styles.work}`}>
                {isBreakTime ? "Break Time" : "Work Time"}
            </div>
            <div className={styles.progressBar}>
                <ProgressBar progress={progress}/>
                <div className={styles.circle} style={{position: 'absolute', top: 0, left: 0, zIndex: 2}}>
                    <p>{formattedTime}</p>
                </div>
            </div>
        </div>
    );
};

export default CountdownTimer;
