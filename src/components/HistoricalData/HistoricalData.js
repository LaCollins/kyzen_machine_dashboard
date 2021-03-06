import React, { useEffect, useState } from 'react';
import { LineChart } from 'react-chartkick'
import 'chart.js'
import './HistoricalData.css';
import historicalData from '../../helpers/data/historicalData';

const HistoricalData = (props) => {
    const [data, setHistoricalData] = useState([]);
    const [concData, setConcData] = useState({"name" : "Conc", "data" : {}});
    const [tempData, setTempData] = useState({"name" : "Temp", "data" : {}});
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        historicalData()
            .then((resp) => {
                const sortedArray = resp.sort((a, b) => new Date(b.timeStamp) - new Date(a.timeStamp)); // Sorts entries by date and time
                setHistoricalData(sortedArray);
                let concEntries = {};
                let tempEntries = {};
                for(let i = 0; i < data.length; i++) {
                    const concKey = data[i].timeStamp.split('T')[0];
                    const tempKey = data[i].timeStamp.split('T')[0];
                    concEntries[concKey] = data[i].conc;
                    tempEntries[tempKey] = data[i].temp;
                }
                setConcData({"name" : "Conc", "data" : concEntries});
                setTempData({"name" : "Temp", "data" : tempEntries});
                setChartData([concData, tempData]);
            })
            .catch((error) => console.error(error));
    }, [data]);

    return (
        <div className="HistoricalData">
        <h3 className="HD-header">Historical Data</h3>
        <div className="chartContainer">
            <LineChart data={chartData} />
        </div>
        </div>
    )
}

export default HistoricalData;
