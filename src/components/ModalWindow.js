import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


const ModalWindow = (props) => {
    const{show, close, title, body, txtBlueBtn, txtRedBtn, cancel} = props;
    return (
        <Modal show={show} onHide={close}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{body}</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={close}>
                    {txtBlueBtn}
                </Button>
                <Button variant="danger" onClick={cancel}>
                    {txtRedBtn}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalWindow;