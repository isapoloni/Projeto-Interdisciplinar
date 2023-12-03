import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { BsCheckCircle } from 'react-icons/bs'; // Importe o ícone de sucesso

const ExclusaoSucessoModal = ({ show, onClose, tipoSucesso }) => {
  let titulo = '';
  let mensagem = '';

  switch (tipoSucesso) {
    case 'exclusao':
      titulo = 'Doação Excluída com Sucesso';
      mensagem = 'A doação foi excluída com sucesso!';
      break;
    case 'edicao':
      titulo = 'Doação Editada com Sucesso';
      mensagem = 'A doação foi editada com sucesso!';
      break;
    case 'cadastro':
      titulo = 'Doação Cadastrada com Sucesso';
      mensagem = 'A doação foi cadastrada com sucesso!';
      break;
    default:
      titulo = 'Sucesso';
      mensagem = 'Operação realizada com sucesso!';
      break;
  }

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

export default ExclusaoSucessoModal;
