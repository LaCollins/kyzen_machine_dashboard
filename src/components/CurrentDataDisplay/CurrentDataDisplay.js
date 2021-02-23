import './CurrentDataDisplay.css';
import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import UpdateModal from '../UpdateModal/UpdateModal';

const CurrentDataDisplay = (props) => {

    return (
        <div className="CurrentDataDisplay">
            <Card className="displayCard pt-4 pr-5 pl-5 pb-4">
                <h3 className="mb-2">Current Readings</h3>
                {props.toggleTemp ? (<Button variant="outline-primary" onClick={props.ToggleFtoC}>Convert from °C to °F</Button>)
                : (<Button variant="outline-primary" onClick={props.ToggleFtoC}>Convert from °F to °C</Button>)}
                <div className="row justify-content-between mt-2">
                    <div>Concentration:</div>
                    <span className="conc">{props.dataObj.conc}%</span>
                    </div>
                <div className="row justify-content-between mt-2">
                    <div>Temperature:</div>
                    {props.toggleTemp ? (<span>{Math.round((props.dataObj.temp - 32) / 1.8)}°C</span>)
                        : (<span>{props.dataObj.temp}°F</span>)}
                </div>
                <UpdateModal props={props.dataObj} refreshData={props.refreshData} />
            </Card>
        </div>
    )
}

export default CurrentDataDisplay;
