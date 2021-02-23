import React, { useState, useEffect } from 'react';
import Toast from 'react-bootstrap/Toast';

const Warning = (props) => {
    const [tooHigh, setTooHigh] = useState(props.tooHigh);
    const [tooLow, setTooLow] = useState(props.tooLow);
    const [showToast, setShowToast] = useState(false);


    useEffect(() => {
        if (props.showConc || props.showTemp) {
            setShowToast(true);
        }
        setTooHigh(props.tooHigh);
        setTooLow(props.tooLow);
    }, [props.showConc, props.showTemp, props.tooHigh, props.tooLow, tooHigh, tooLow])
    
    const toggleShowToast = () => setShowToast(!showToast);

    return (
        <Toast show={showToast} onClose={toggleShowToast} className="bg-danger text-white">
        <Toast.Header>
            <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
            <strong className="mr-auto">WARNING</strong>
        </Toast.Header>
        { tooHigh && props.showConc === true ? (<Toast.Body>The concentration is too high! The maximum concentration is {props.concUpper}%.</Toast.Body>)
            : ('')}
        { tooLow && props.showConc === true ? (<Toast.Body>The concentration is too low! The minimum concentration is {props.concLower}%</Toast.Body>)
            : ('')}
        
        { tooHigh && props.showTemp === true && props.tempType === 'f'? (<Toast.Body>The temperature is too high! The maximum temperature is {props.tempUpper}°F.</Toast.Body>)
            : ('')}
        { tooLow && props.showTemp === true && props.tempType === 'f' ? (<Toast.Body>The temperature is too low! The minimum temperature is {props.tempLower}°F</Toast.Body>)
            : ('')}
        { tooHigh && props.showTemp === true && props.tempType === 'c' ? (<Toast.Body>The temperature is too high! The maximum temperature is {Math.round((props.tempUpper - 32) / 1.8)}°C.</Toast.Body>)
            : ('')}
        { tooLow && props.showTemp === true && props.tempType === 'c' ? (<Toast.Body>The temperature is too low! The minimum temperature is {Math.round((props.tempLower - 32) / 1.8)}°C</Toast.Body>)
            : ('')}
        </Toast>
    )
}

export default Warning;
