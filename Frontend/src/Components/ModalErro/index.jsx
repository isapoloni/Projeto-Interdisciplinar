// ErroModal.js
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ErroModal = ({ show, onClose, mensagemErro }) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Erro</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{mensagemErro}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onClose}>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ErroModal;
