import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import './Range.css';
import UpdateLimits from '../UpdateLimits/UpdateLimits';

const Range = (props) => {
    const [concLower, setConcLower] = useState(0);
    const [concUpper, setConcUpper] = useState(0);
    const [tempLower, setTempLower] = useState(0);
    const [tempUpper, setTempUpper] = useState(0);

    useEffect(() => {
        if(props.dataObj.length !== 0) {
            setConcLower(props.dataObj.concLimit.lower);
            setConcUpper(props.dataObj.concLimit.upper);
            setTempLower(props.dataObj.tempLimit.lower);
            setTempUpper(props.dataObj.tempLimit.upper);
        }
    }, [props])

    return (
        <div className="Limits">
        <Card className="RangeCard">
            <Card.Title className="mt-4">Allowable Limit Ranges</Card.Title>
            <Card.Body>
                <div>Concentration: {concLower}% - {concUpper}%</div>
                <UpdateLimits 
                    concentration={true}
                    concLower={concLower}
                    concUpper={concUpper}
                    dataObj={props.dataObj}
                    refreshData={props.refreshData} />
                {props.toggleTemp ? (<div className="mt-2">Temperature: {Math.round((tempLower - 32) / 1.8)}°C - {Math.round((tempUpper - 32) / 1.8)}°C</div>)
                : (<div className="mt-2">Temperature: {tempLower}°F - {tempUpper}°F</div>)}
                <UpdateLimits 
                    concentration={false}
                    tempLower={tempLower}
                    tempUpper={tempUpper}
                    dataObj={props.dataObj}
                    refreshData={props.refreshData} />
            </Card.Body>
        </Card>
        </div>
    )
}

export default Range;
