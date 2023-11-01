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
import { RiSearchLine } from 'react-icons/ri';
import Stack from '@mui/material/Stack';
import { urlBackend } from '../../assets/funcoes';
import { HiTrash } from 'react-icons/hi';
import { Container, Button } from 'react-bootstrap';

export default function TableCategoria(props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function filtrarCategorias(e) {
    const termoBusca = e.currentTarget.value;
    fetch(urlBackend + '/categoriaProduto', { method: 'GET' })
      .then((resposta) => resposta.json())
      .then((listaCategorias) => {
        if (Array.isArray(listaCategorias)) {
          const resultadoBusca = listaCategorias.filter((categoria) =>
            categoria.categoria.toLowerCase().includes(termoBusca.toLowerCase())
          );
          props.setCategorias(resultadoBusca);
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
        Cadastrar categoria
      </Button>

      <TextField
        fullWidth
        type="text"
        id="termoBusca"
        placeholder="Buscar Categoria"
        onChange={filtrarCategorias}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <RiSearchLine />
            </InputAdornment>
          ),
        }}
      />

      <TableContainer component={Paper} className="mt-5">
        <Table striped bordered hover size="sm" className="custom-table">
          <TableHead>
            <TableRow className="text-center">
              <TableCell style={{ fontSize: '16px', fontWeight: 'bold', textAlign: 'center' }}>Código</TableCell>
              <TableCell style={{ fontSize: '16px', fontWeight: 'bold', textAlign: 'center' }}>Categoria</TableCell>
              <TableCell style={{ fontSize: '16px', fontWeight: 'bold', textAlign: 'center' }}>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.listaCategorias
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((categoria) => (
                <TableRow key={categoria.codigo}>
                  <TableCell style={{ textAlign: 'center' }}>{categoria.codigo}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{categoria.categoria}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={2} justifyContent="center">
                      <IconButton
                        variant="outlined"
                        style={{ color: '#1683cc' }} 
                        onClick={() => {
                          if (window.confirm('Deseja atualizar os dados da categoria?')) {
                            props.editar(categoria);
                          }
                        }}
                      >
                        <MdModeEdit />
                      </IconButton>

                      <IconButton
                        variant="outlined"
                        style={{ color: '#cc3116' }} 
                        onClick={() => {
                          if (window.confirm('Deseja excluir?')) {
                            props.deletar(categoria);
                        
                          }
                        }}
                      >
                        <HiTrash />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={props.listaCategorias?.length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
        />
      </TableContainer>
    </Container>
  );
}
