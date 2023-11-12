
import { useState } from 'react';
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
import { Container, Button, InputGroup, FormControl } from 'react-bootstrap';
import { RiSearchLine } from "react-icons/ri";
import { HiTrash } from "react-icons/hi";
import { urlBackend } from "../../assets/funcoes";
import { MdModeEdit } from "react-icons/md";
import Stack from "react-bootstrap/Stack";
import Cookies from "universal-cookie";

export default function TabelaPessoas(props) {
  const cookies = new Cookies();
  const jwtAuth = cookies.get("authorization");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [expandedRow, setExpandedRow] = useState(null);


  const handleExpand = (pessoa) => {
    setExpandedRow(expandedRow === pessoa.nome ? null : pessoa.nome);
  };

  function filtrarPessoas(e) {
    const termoBusca = e.currentTarget.value;
    fetch(urlBackend + "/pessoas", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `${jwtAuth}`,
      },
    })
      .then((resposta) => {
        return resposta.json();
      })
      .then((listaPessoas) => {
        if (Array.isArray(listaPessoas)) {
          const resultadoBusca = listaPessoas.filter((pessoa) =>
            pessoa.nome.toLowerCase().includes(termoBusca.toLowerCase())
          );
          props.setPessoas(resultadoBusca);
        }
      });
  }

  function formatarCpf(cpf) {
    const cpfNumerico = cpf.replace(/[^\d]/g, '');
  
    return cpfNumerico.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  
  function formatarData(data) {
    const dataFormatada = new Date(data);
    const dia = dataFormatada.getDate().toString().padStart(2, '0');
    const mes = (dataFormatada.getMonth() + 1).toString().padStart(2, '0');
    const ano = dataFormatada.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }

  return (
    <Container>
      <Button
        variant="primary"
        className="mb-4"
        onClick={() => {
          props.exibirTabela(false);
        }}
      >
        Novo Cadastro
      </Button>

      <InputGroup className="mt-2">
        <TextField
          fullWidth
          type="text"
          id="termoBusca"
          placeholder="Buscar Pessoa"
          onChange={filtrarPessoas}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <RiSearchLine />
              </InputAdornment>
            ),
          }}
        />
      </InputGroup>

      <TableContainer component={Paper} className="mt-5" style={{ overflowX: 'auto' }}>
        <Table striped bordered hover size="sm" className="custom-table">
          <TableHead>
            <TableRow class="text-center">
              <TableCell style={{ fontSize: '16px', fontWeight: 'bold', textAlign: 'center' }}>Nome</TableCell>
              <TableCell style={{ fontSize: '16px', fontWeight: 'bold', textAlign: 'center' }}>CPF</TableCell>
              <TableCell style={{ fontSize: '16px', fontWeight: 'bold', textAlign: 'center' }}>Data de Nascimento</TableCell>
              {/* <TableCell style={{ fontSize: '16px', fontWeight: 'bold', textAlign: 'center' }}>Tipo</TableCell> */}
              <TableCell style={{ fontSize: '16px', fontWeight: 'bold', textAlign: 'center' }}>Profissão</TableCell>
              <TableCell style={{ fontSize: '16px', fontWeight: 'bold', textAlign: 'center' }}>Detalhes</TableCell>
              <TableCell style={{ fontSize: '16px', fontWeight: 'bold', textAlign: 'center' }}>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.listaPessoas?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((pessoa) => (
              <React.Fragment key={pessoa.nome}>
                <TableRow>
                  <TableCell style={{ textAlign: 'center' }}>{pessoa.nome}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{formatarCpf(pessoa.cpf)}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{formatarData(pessoa.nascimento)}</TableCell>
                  {/* <TableCell style={{ textAlign: 'center' }}>{pessoa.tipo}</TableCell> */}
                  <TableCell style={{ textAlign: 'center' }}>{pessoa.profissao1}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>
                    <IconButton onClick={() => handleExpand(pessoa)}>
                      <span style={{ fontSize: '12px', fontWeight: 'bold' }}>Detalhes</span>
                    </IconButton>
                  </TableCell>

                  <TableCell style={{ textAlign: 'center' }}>
                    <Stack direction="horizontal" gap={1}>
                      <IconButton
                        variant="outlined"
                        style={{ color: '#1683cc' }}
                        onClick={() => {
                          if (window.confirm("Deseja atualizar os dados da pessoa?")) {
                            props.editar(pessoa);
                          }
                        }}
                      >
                        <MdModeEdit />
                      </IconButton>{" "}
                      <IconButton
                        variant="outlined"
                        style={{ color: '#cc3116' }}
                        onClick={() => {
                          if (window.confirm("Deseja excluir permanentemente?")) {
                            props.excluir(pessoa);
                          }
                        }}
                      >
                        <HiTrash />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>

                {expandedRow === pessoa.nome && (
                  <TableRow>
                    <TableCell colSpan={11} className="details" style={{ backgroundColor: '#f0f0f0', textAlign: 'justify' }}>
                      <h4 style={{ fontSize: '14px', fontWeight: 'bold' }}>Detalhes da Pessoa</h4>
                      <div>
                        <div>Endereço:</div> {pessoa.endereco}, Cidade: {pessoa.cidade}
                      </div>
                      <div>
                        <div>Contato</div> Telefone: {pessoa.telefone}, Email: {pessoa.email}
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={props.listaPessoas?.length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
        />
      </TableContainer>
    </Container>
  );
}
