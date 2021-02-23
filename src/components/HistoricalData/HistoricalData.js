import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import './HistoricalData.css';
import historicalData from '../../helpers/data/historicalData';

const HistoricalData = () => {
    const [data, setHistoricalData] = useState([]);

    useEffect(() => {
        historicalData()
            .then((resp) => {
                setHistoricalData(resp)
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
                {data.length > 0 ? (data.map((entry) => <tr><td key={entry.id}>{entry.temp}</td><td>{entry.conc}</td></tr>))
                : ('')}
            </tbody>
        </Table>
        </div>
    )
}

export default HistoricalData;
