import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './Range.css';

const Range = (props) => {
    const [toggleTemp, setToggleTemp] = useState(false);
    const [concLower, setConcLower] = useState(0);
    const [concUpper, setConcUpper] = useState(0);
    const [tempLower, setTempLower] = useState(0);
    const [tempUpper, setTempUpper] = useState(0);

    const ToggleFtoC = () => setToggleTemp(!toggleTemp);

    useEffect(() => {
        if(props.dataObj.lenght !== 0) {
            setConcLower(props.dataObj.concLimit.lower);
            setConcUpper(props.dataObj.concLimit.upper);
            setTempLower(props.dataObj.tempLimit.lower);
            setTempUpper(props.dataObj.tempLimit.upper);
        }
    }, [props])

    return (
        <div className="Limits">
        <Card className="RangeCard">
            <Card.Title>Allowable Limit Ranges</Card.Title>
            <Card.Body>
                <div>Concentration: {concLower}% - {concUpper}%</div>
                <Button variant="outline-primary" className="mt-2">Update Concentration</Button>
                {toggleTemp ? (<div className="mt-2">Temperature: {Math.round((tempLower - 32) / 1.8)}°C - {Math.round((tempUpper - 32) / 1.8)}°C</div>)
                : (<div className="mt-2">Temperature: {tempLower}°F - {tempUpper}°F</div>)}
                <Button variant="outline-primary" className="mt-2">Update Temp Range</Button>
            </Card.Body>
            <Card.Footer>
                {toggleTemp ? (<Button variant="outline-primary" onClick={ToggleFtoC}>Convert from °F to °C</Button>)
                : (<Button variant="outline-primary" onClick={ToggleFtoC}>Convert from °C to °F</Button>)}
            </Card.Footer>
        </Card>
        </div>
    )
}

export default Range;
