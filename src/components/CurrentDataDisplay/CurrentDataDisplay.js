import './CurrentDataDisplay.css';
import React, { useEffect, useState } from 'react';
import currentData from '../../helpers/data/currentData';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const CurrentDataDisplay = () => {
    const [dataObj, setDataObj] = useState([]);

    useEffect(() => {
        if(dataObj.length === 0) {
            currentData()
                .then((resp) => {
                    setDataObj(resp.data);
                })
                .catch(error => console.error(error));
        }
    }, [dataObj])

    return (
        <div className="CurrentDataDisplay">
            <Card className="displayCard p-5">
                <div className="row justify-content-between">
                    <div>Concentration:</div>
                    <span className="conc">{dataObj.conc}</span>
                    <Button variant="outline-primary">Update</Button>
                    </div>
                <div className="row justify-content-between mt-2">
                    <div>Temperature:</div>
                    <span>{dataObj.temp}</span>
                    <Button variant="outline-primary">Update</Button>
                    </div>
            </Card>
        </div>
    )
}

export default CurrentDataDisplay;
