import './CurrentDataDisplay.css';
import React from 'react';
import Card from 'react-bootstrap/Card';
import UpdateModal from '../UpdateModal/UpdateModal';

const CurrentDataDisplay = (props) => {

    return (
        <div className="CurrentDataDisplay">
            <Card className="displayCard pt-4 pr-5 pl-5 pb-4">
                <h3 className="mb-5">Current Readings</h3>
                <div className="row justify-content-between">
                    <div>Concentration:</div>
                    <span className="conc">{props.dataObj.conc}</span>
                    </div>
                <div className="row justify-content-between mt-2">
                    <div>Temperature:</div>
                    <span>{props.dataObj.temp}</span>
                </div>
                <UpdateModal props={props.dataObj} refreshData={props.refreshData} />
            </Card>
        </div>
    )
}

export default CurrentDataDisplay;
