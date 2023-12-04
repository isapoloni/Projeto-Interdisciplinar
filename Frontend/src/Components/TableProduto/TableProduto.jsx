
import React, { useState } from 'react';
import Cookie from "universal-cookie";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination,
  InputAdornment,
  TextField,
} from '@mui/material';
import { MdModeEdit } from 'react-icons/md';
import { RiSearchLine } from 'react-icons/ri';
import { AiFillPlusCircle, AiOutlineClear } from 'react-icons/ai'
import { Container, Button, InputGroup, FormControl } from 'react-bootstrap';
import { urlBackend } from '../../assets/funcoes';
import ConfirmationModal from '../ModalConfirmacao'

export default function TableProduto(props) {
  const cookies = new Cookie()
  const jwtAuth = cookies.get('authorization')

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedProduto, setSelectedProduto] = useState(null);

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };

  const handleOpenModal = (produto) => {
    setSelectedProduto(produto);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleConfirmUpdate = () => {
    props.editar(selectedProduto);
    handleCloseModal();
  };

  function filtrarProdutos(e) {
    const termoBusca = e.currentTarget.value;
    fetch(urlBackend + "/produto", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authorization": `${jwtAuth}`
      },
    })
      .then((resposta) => {
        return resposta.json();
      })
      .then((listaProdutos) => {
        if (Array.isArray(listaProdutos)) {
          const resultadoBusca = listaProdutos.filter((produto) =>
            produto.nome.toLowerCase().includes(termoBusca.toLowerCase())
          );
          props.setProdutos(resultadoBusca);
        }
      });
  }
  return (
    <Container>
      <div className="button-container">
        <Button
          className="button-cadastro"
          onClick={() => {
            props.exibirTabela(false);
          }}
        >
          <AiFillPlusCircle style={{ marginRight: '8px' }} /> Cadastrar Produto
        </Button>
      </div>
      <InputGroup className="mt-2">
        <TextField
          fullWidth
          type="text"
          id="termoBusca"
          placeholder="Busque o produto desejado"
          onChange={filtrarProdutos}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <RiSearchLine />
              </InputAdornment>
            ),
          }}
        />
      </InputGroup>

      <TableContainer component={Paper} className="mt-5">
        <Table striped bordered hover size="sm" className="custom-table">
          <TableHead>
            <TableRow className="text-center">
              <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }} align="center">Código</TableCell>
              <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }} align="center">Nome</TableCell>
              <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }} align="center">Unidade</TableCell>
              <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }} align="center">Descrição</TableCell>
              <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }} align="center">Categoria</TableCell>
              <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }} align="center">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.listaProdutos?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((produto) => (
              <TableRow key={produto.codigo}>
                <TableCell align="center">{produto.codigo}</TableCell>
                <TableCell align="center">{produto.nome}</TableCell>
                <TableCell align="center">{produto.metrica}</TableCell>
                <TableCell align="center">{produto.descricao}</TableCell>
                <TableCell align="center">{produto.categoria}</TableCell>
                <TableCell align="center">
                  <IconButton
                    variant="outlined"
                    style={{ color: '#1683cc' }}
                    onClick={() => {
                      if (window.confirm("Deseja atualizar os dados do produto?")) {
                        props.editar(produto);
                      }
                    }}
                  >
                    <MdModeEdit />
                  </IconButton>
                  {/* {' '}
                  <IconButton
                    variant="outlined"
                    style={{ color: '#cc3116' }}
                    onClick={() => {
                      if (window.confirm("Deseja excluir?")) {
                        props.deletar(produto);
                    
                      }
                    }}
                  >
                    <HiTrash />
                  </IconButton> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <ConfirmationModal
            open={isModalOpen}
            onClose={handleCloseModal}
            onConfirm={handleConfirmUpdate}
            title={'Confirmar Atualização'}
            contentText={`Deseja atualizar os dados do produto ${selectedProduto?.nome || 'produto'}?`}
          />
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={props.listaProdutos?.length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
        />
      </TableContainer>
    </Container>
  );
}
