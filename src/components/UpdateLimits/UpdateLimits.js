import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import NumPad from 'react-numpad';
import updateCurrentData from '../../helpers/data/updateCurrentData';
import './UpdateLimits.css';
import Form from 'react-bootstrap/Form';

const UpdateLimits = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const [concHigh, setConcHigh] = useState(0);
    const [concLow, setConcLow] = useState(0);

    const [warningUpperTooLow, setWarningUpperTooLow] = useState(false);
    const [warningLowerTooHigh, setWarningLowerTooHigh] = useState(false);

    const [tempHigh, setTempHigh] = useState(0);
    const [tempLow, setTempLow] = useState(0);

    useEffect(() => {
        if(props.concentration) {
            setConcHigh(props.concUpper);
            setConcLow(props.concLower);
        } else {
            setTempHigh(props.tempUpper);
            setTempLow(props.tempLower);
        }
    }, [props]);

 const updateUpperConc = (value) => {
      if(value < concLow) {
          setWarningUpperTooLow(true);
      } else 
      {
          setConcHigh(value);
          setWarningUpperTooLow(false);
      }
 }

 const updateLowerConc = (value) => {
    if(value > concHigh) {
        setWarningLowerTooHigh(true);
    } else 
    {
        setConcLow(value);
        setWarningLowerTooHigh(false);
    }
}

const updateUpperTemp = (value) => {
    if(value < tempLow) {
        setWarningUpperTooLow(true);
    } else 
    {
        setTempHigh(value);
        setWarningUpperTooLow(false);
    }
}

const updateLowerTemp = (value) => {
    if(value > tempHigh) {
        setWarningLowerTooHigh(true);
    } else 
    {
        setTempLow(value);
        setWarningLowerTooHigh(false);
    }
}

  const updateData = () => {
    if (props.concentration) {
        const high = parseInt(concHigh);
        const low = parseInt(concLow);
    
        const newReadingObject = {
          "conc" : props.dataObj.conc,
          "temp" : props.dataObj.temp,
          "tempLimit" : {
              "upper" : props.dataObj.tempLimit.upper,
              "lower" : props.dataObj.tempLimit.lower,
          },
          "concLimit" : {
              "upper": high,
              "lower": low
          }
        }
        updateCurrentData(newReadingObject)
        .then(() => {
         handleClose();
         props.refreshData();
         })
       .catch((error) => console.error(error));
    } else {
        const high = parseInt(tempHigh);
        const low = parseInt(tempLow);
    
        const newReadingObject = {
          "conc" : props.dataObj.conc,
          "temp" : props.dataObj.temp,
          "tempLimit" : {
              "upper" : high,
              "lower" : low,
          },
          "concLimit" : {
              "upper": props.dataObj.concLimit.upper,
              "lower": props.dataObj.concLimit.lower
          }
        }
        updateCurrentData(newReadingObject)
        .then(() => {
         handleClose();
         props.refreshData();
         })
       .catch((error) => console.error(error))
    }

  }

    return (
        <>
          <Button variant="outline-primary mt-2" onClick={handleShow}>
            Update
          </Button>
    
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
            { props.concentration ? (<Modal.Title>Update Concentration Limits</Modal.Title>)
            : (<Modal.Title>Update Temperature Limits</Modal.Title>)}
            </Modal.Header>
            <Modal.Body>
              {props.concentration ? (
              <><div>Concentration Upper Limit:</div>
              <NumPad.Number
                onChange={(value) => { updateUpperConc(value)} }
                value={concHigh}
                negative={false}
            /></>)
            : (
                <><div>Temperature Upper Limit:</div>
                <NumPad.Number
                  onChange={(value) => { updateUpperTemp(value)} }
                  value={tempHigh}
                  negative={false}
              /></>)}
            { warningUpperTooLow ? (<div className="warning">Upper range must be higher than the lower value!</div>)
                                : ('')}
            {props.concentration ? (
            <><div>Concentration Lower Limit:</div>
              <NumPad.Number
                onChange={(value) => { updateLowerConc(value)} }
                value={concLow}
                negative={false}
            /></>)
            :
            (
                <><div>Temperature Lower Limit:</div>
                  <NumPad.Number
                    onChange={(value) => { updateLowerTemp(value)} }
                    value={tempLow}
                    negative={false}
                /></>)}

            { warningLowerTooHigh ? (<div className="warning">Lower range must be lower than the upper value!</div>)
                                : ('')}
            {!props.concentration ? (
                <div>
                <Form.Group>
                    <Form.Check type="radio" name="tempconversion" aria-label="tempconversion" inline label="Fahrenheit"></Form.Check>
                    <Form.Check type="radio" name="tempconversion" aria-label="tempconversion" inline label="Celsius"></Form.Check>
                </Form.Group>
                </div>
            )
        : ('')}
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

export default UpdateLimits;
