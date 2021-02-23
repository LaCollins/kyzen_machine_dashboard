import React, { useState } from 'react';
import Toast from 'react-bootstrap/Toast';

const Warning = (props) => {
    const [showConc, setShowConc] = useState(props);
    const [tooHigh, setTooHigh] = useState(props.tooHigh)
    const [tooLow, setTooLow] = useState(props.tooLow)
    
    const toggleShowConc = () => setShowConc(!showConc);

    return (
        <Toast show={showConc} onClose={toggleShowConc} className="bg-danger text-white">
        <Toast.Header>
            <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
            <strong className="mr-auto">WARNING</strong>
        </Toast.Header>
        { tooHigh ? (<Toast.Body>The concentration is too high! The maximum concentration is 20.</Toast.Body>)
            : <Toast.Body>The concentration is too low!</Toast.Body>}
        </Toast>
    )
}

export default Warning;
