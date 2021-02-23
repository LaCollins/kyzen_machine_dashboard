import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import NumPad from 'react-numpad';
import Warning from '../Warning/Warning';
import updateCurrentData from '../../helpers/data/updateCurrentData';
import updateHistoricalData from '../../helpers/data/updateHistoricalData';

const UpdateModal = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const [newConc, setNewConc] = useState(0);
    const [highConcWarning, setHighConcWarning] = useState(false);
    const [lowConcWarning, setLowConcWarning] = useState(false);

    const [newTemp, setNewTemp] = useState(0);
    const [highTempWarning, setHighTempWarning] = useState(false);
    const [lowTempWarning, setLowTempWarning] = useState(false);

    const [tempType, setTempType] = useState('f');

    useEffect(() => {
        setNewConc(props.props.conc);
        setNewTemp(props.props.temp);
    }, [props]);

    const tempTypeChange = (e) => {
      setTempType(e.target.value);
    }

    const updateConc = (value) => {
        if(value > props.props.concLimit.upper) {
            setHighConcWarning(true);
            setLowConcWarning(false);
        } else if(value < props.props.concLimit.lower)
        {
            setLowConcWarning(true);
            setHighConcWarning(false);
        } else {
            setLowConcWarning(false);
            setHighConcWarning(false);
        }
        setNewConc(value);
    }

    const updateTemp = (value) => {
      let tempValue;
      if(tempType === 'c') {
        tempValue = Math.round((parseInt(value) * 1.8) + 32)
      } else {
        tempValue = value;
      }

      if(tempValue > props.props.tempLimit.upper) {
          setHighTempWarning(true);
          setLowTempWarning(false);
      } else if(tempValue < props.props.tempLimit.lower)
      {
          setLowTempWarning(true);
          setHighTempWarning(false);
      } else {
          setLowTempWarning(false);
          setHighTempWarning(false);
      }
      setNewTemp(tempValue);
  }

  const updateData = () => {
    const conc = parseInt(newConc);
    const temp = parseInt(newTemp);

    const newReadingObject = {
      "conc" : conc,
      "temp" : temp,
      "tempLimit" : {
          "upper" : 75,
          "lower" : 35
      },
      "concLimit" : {
          "upper": 20,
          "lower": 10
      }
    }

    const newRecord = {
      "conc": conc,
      "temp": temp,
      "timeStamp": new Date(),
    }

    updateHistoricalData(newRecord)
      .then(() => {
        updateCurrentData(newReadingObject)
          .then(() => {
            handleClose();
            props.refreshData();
          })
      })
      .catch((error) => console.error(error));
  }


    const resetStates = () => {
      setNewConc(0);
      setNewTemp(0);
      setLowConcWarning(false);
      setHighConcWarning(false);
      setLowTempWarning(false);
      setHighTempWarning(false);
    }

    return (
        <>
          <Button variant="outline-primary mt-5" onClick={handleShow}>
            Update
          </Button>
    
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Update Concentration and Temperature</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              { highConcWarning || lowConcWarning ? 
                (<Warning 
                  showConc={true} 
                  tooHigh={highConcWarning}
                  tooLow={lowConcWarning}
                  concUpper={props.props.concLimit.upper}
                  concLower={props.props.concLimit.lower}
                  />)
                    : ('')}
              <div>Concentration:</div>
              <NumPad.Number
                onClick={resetStates}
                onChange={(value) => { updateConc(value)} }
                value={newConc}
                negative={false}
            />
            { highTempWarning || lowTempWarning ? 
                (<Warning 
                  showTemp={true} 
                  tooHigh={highTempWarning}
                  tooLow={lowTempWarning}
                  tempUpper={props.props.tempLimit.upper}
                  tempLower={props.props.tempLimit.lower}
                  tempType={tempType}
                  />)
                    : ('')}
              <div>Temperature:</div>
              {tempType === 'c' ? (<NumPad.Number
                onClick={resetStates}
                onChange={(value) => { updateTemp(value)} }
                value={Math.round((newTemp - 32) / 1.8)}
                negative={false}
              />)
              : (<NumPad.Number
                onClick={resetStates}
                onChange={(value) => { updateTemp(value)} }
                value={newTemp}
                negative={false}
              />)}
               <div>
                <Form.Group>
                    <Form.Check 
                      type="radio" 
                      name="tempconversion"
                      aria-label="tempconversion"
                      inline label="Fahrenheit"
                      checked={tempType === 'f'}
                      onChange={tempTypeChange}
                      value="f"></Form.Check>
                    <Form.Check
                      type="radio"
                      name="tempconversion"
                      aria-label="tempconversion"
                      inline label="Celsius"
                      checked={tempType === 'c'}
                      onChange={tempTypeChange}
                      value="c"></Form.Check>
                </Form.Group>
                </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="outline-primary" onClick={updateData}>Submit Changes</Button>
            </Modal.Footer>
          </Modal>
        </>
      );
}

export default UpdateModal;
