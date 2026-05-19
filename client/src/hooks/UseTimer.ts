import { useEffect, useState, useCallback } from "react";

export const UseTimer = (initialTime: number) => {
    const [time, setTime] = useState<number>(initialTime);

    useEffect(() => {
        if (time <= 0) return;
        const timer = setInterval(() => {
            setTime((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [time]);

    const reset = useCallback(() => {
        setTime(initialTime);
    }, [initialTime]);

    return { time, reset };
};