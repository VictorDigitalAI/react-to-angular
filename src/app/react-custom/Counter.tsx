import * as React from "react";
import {useEffect, useState} from "react";

interface CounterProps {
    counter: number;
    onIncrease: () => void;
}

const Counter = (props: CounterProps) => {
    const {counter, onIncrease} = props;

    const [count, setCount] = useState(0);
    useEffect(() => {
        setCount(counter);
    }, []);

    const handleIncrease = () => {
        setCount(count + 1);
        onIncrease();
    };

    const handleDecrease = () => {
        setCount(count - 1);
    };

    return (
        <div>
            <div id="value">Parent value: {counter}</div>
            <div id="value">Local value: {count}</div>
            <button onClick={handleIncrease}>Increase</button>
            <button onClick={handleDecrease}>Local decrease</button>
        </div>
    );
};

export default Counter;