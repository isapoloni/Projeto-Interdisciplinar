// ExclusaoSucessoModal.js
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ExclusaoSucessoModal = ({ show, onClose }) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Doação Excluída com Sucesso</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        A doação foi excluída com sucesso!
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ExclusaoSucessoModal;
