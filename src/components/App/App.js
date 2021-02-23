import './App.css';
import firebaseConnection from '../../helpers/data/connection';
import TopBar from '../TopBar/TopBar';
import CurrentDataDisplay from '../CurrentDataDisplay/CurrentDataDisplay';
import Range from '../Range/Range';
import React, { useEffect, useState } from 'react';
import currentData from '../../helpers/data/currentData';
import HistoricalData from '../HistoricalData/HistoricalData';

firebaseConnection();

function App() {

  const [dataObj, setDataObj] = useState([]);
  const [toggleTemp, setToggleTemp] = useState(false);
  const ToggleFtoC = () => setToggleTemp(!toggleTemp);

  useEffect(() => {
      if(dataObj.length === 0) {
          currentData()
              .then((resp) => {
                  setDataObj(resp.data);
              })
              .catch(error => console.error(error));
      }
  }, [dataObj])

  const refreshData = () => {
      currentData()
              .then((resp) => {
                  setDataObj(resp.data);
              })
              .catch(error => console.error(error));
  }

  return (
    <div className="App">
      <TopBar />
      <div className="Dash">
        <CurrentDataDisplay
          dataObj={dataObj}
          refreshData={refreshData}
          toggleTemp={toggleTemp}
          ToggleFtoC={ToggleFtoC} />
        <Range
          dataObj={dataObj}
          refreshData={refreshData}
          toggleTemp={toggleTemp} />
      </div>
      <div className="DataTable">
        <HistoricalData toggleTemp={toggleTemp}/>
      </div>
    </div>
  );
}

export default App;
