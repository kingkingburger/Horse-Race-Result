"use client";

import {useEffect, useState} from "react";
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
                뽀모도로 타이머 입니다. 25분을 기준 5분 휴식입니다
                <CountdownTimer/>
            </div>
        </div>
    );
}
