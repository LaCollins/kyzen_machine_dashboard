import './CurrentDataDisplay.css';
import React, { useEffect, useState } from 'react';
import currentData from '../../helpers/data/currentData';
import Card from 'react-bootstrap/Card';
import UpdateModal from '../UpdateModal/UpdateModal';

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
                    </div>
                <div className="row justify-content-between mt-2">
                    <div>Temperature:</div>
                    <span>{dataObj.temp}</span>
                </div>
                <UpdateModal props={dataObj} />
            </Card>
        </div>
    )
}

export default CurrentDataDisplay;
