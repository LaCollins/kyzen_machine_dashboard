import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import './HistoricalData.css';
import historicalData from '../../helpers/data/historicalData';

const HistoricalData = (props) => {
    const [data, setHistoricalData] = useState([]);

    useEffect(() => {
        historicalData()
            .then((resp) => {
                const sortedArray = resp.sort((a, b) => new Date(b.timeStamp) - new Date(a.timeStamp)); // Sorts entries by date and time
                setHistoricalData(sortedArray)
            })
            .catch((error) => console.error(error))
    }, [data])

    return (
        <div className="HistoricalData">
        <h3 className="HD-header">Historical Data</h3>
        <Table striped bordered hover variant="light">
            <thead>
                <tr>
                    <th>Temp</th>
                    <th>Conc</th>
                </tr>
            </thead>
            <tbody>
                {props.toggleTemp === false && data.length > 0 ? (data.map((entry) => <tr><td key={entry.id}>{entry.temp}°F</td><td>{entry.conc}%</td></tr>))
                : (data.map((entry) => <tr><td key={entry.id}>{Math.round((entry.temp - 32) / 1.8)}°C</td><td>{entry.conc}%</td></tr>))}
            </tbody>
        </Table>
        </div>
    )
}

export default HistoricalData;
