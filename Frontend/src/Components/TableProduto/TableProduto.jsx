import React, { useState } from 'react';
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
import { HiTrash } from 'react-icons/hi';
import { RiSearchLine } from 'react-icons/ri';
import { Container, Button, InputGroup, FormControl } from 'react-bootstrap';
import { urlBackend } from '../../assets/funcoes';

export default function TableProduto(props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function filtrarProdutos(e) {
    const termoBusca = e.currentTarget.value;
    fetch(urlBackend + "/produto", { method: "GET" })
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
      <Button
        className="mb-4"
        onClick={() => {
          props.exibirTabela(false);
        }}
      >
        Cadastrar produto
      </Button>

      <InputGroup className="mt-2">
        <TextField
          fullWidth
          type="text"
          id="termoBusca"
          placeholder="Busque aqui o produto desejado"
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
              <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Código</TableCell>
              <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Nome</TableCell>
              <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Unidade</TableCell>
              <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Descrição</TableCell>
              <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Categoria</TableCell>
              <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.listaProdutos?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((produto) => (
              <TableRow key={produto.codigo}>
                <TableCell>{produto.codigo}</TableCell>
                <TableCell>{produto.nome}</TableCell>
                <TableCell>{produto.metrica}</TableCell>
                <TableCell>{produto.descricao}</TableCell>
                <TableCell>{produto.categoria}</TableCell>
                <TableCell>
                  <IconButton
                    variant="outlined"
                    style={{ color: '#1683cc' }}
                    onClick={() => {
                      if (window.confirm('Deseja atualizar os dados do produto?')) {
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
