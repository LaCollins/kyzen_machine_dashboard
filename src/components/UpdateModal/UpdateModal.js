import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import NumPad from 'react-numpad';
import Warning from '../Warning/Warning';

const UpdateModal = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [placeholder, setPlaceholder] = useState(props.props.conc);
    const [newConc, setNewConc] = useState(props.props.conc);
    const [highConcWarning, setHighConcWarning] = useState(false);
    const [lowConcWarning, setLowConcWarning] = useState(false);

    useEffect(() => {
        setPlaceholder(props.props.conc);
    }, [placeholder, props]);

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
              { highConcWarning || lowConcWarning ? (<Warning showConc={true} tooHigh={highConcWarning} tooLow={lowConcWarning} />)
                    : ('')}
              <div>Concentration:</div>
              <NumPad.Number
                onChange={(value) => { updateConc(value)} }
                placeholder={placeholder}
                value={newConc}
                negative={false}
            />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="primary">Understood</Button>
            </Modal.Footer>
          </Modal>
        </>
      );
}

export default UpdateModal;
