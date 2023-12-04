// SucessoModal.js
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { BsCheckCircle } from 'react-icons/bs';

const SucessoModal = ({ show, onClose, tipoSucesso }) => {
  let titulo, mensagem;

  if (tipoSucesso === 'cadastro') {
    titulo = 'Cadastro Bem-Sucedido';
    mensagem = 'Seu produto foi cadastrado com sucesso!';
  } else if (tipoSucesso === 'edicao') {
    titulo = 'Atualização Bem-Sucedida';
    mensagem = 'Seu produto foi atualizado com sucesso!';
  } // Adicione mais casos conforme necessário

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <BsCheckCircle style={{ color: 'green', marginRight: '10px' }} /> 
          {titulo}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {mensagem}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SucessoModal;
