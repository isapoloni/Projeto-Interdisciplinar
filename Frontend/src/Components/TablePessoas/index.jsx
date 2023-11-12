

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
import Stack from 'react-bootstrap/Stack';
import Cookies from "universal-cookie";

export default function TabelaPessoas(props) {

  const cookies = new Cookies()
  const jwtAuth = cookies.get('authorization')
  function filtrarPessoas(e) {
    const termoBusca = e.currentTarget.value;
    fetch(urlBackend + "/pessoas", { method: "GET", headers: { "Content-Type": "application/json", "authorization": `${jwtAuth}` } })
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

    <TableContainer component={Paper} className="mt-5">
      <Table striped bordered hover size="sm" className="custom-table">
        <TableHead>
          <TableRow class="text-center">
            <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Nome</TableCell>
            <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>CPF</TableCell>
            <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Data de Nascimento</TableCell>
            <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Endereço</TableCell>
            <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Cidade</TableCell>
            <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Telefone</TableCell>
            <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>E-Mail</TableCell>
            <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Tipo</TableCell>
            <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Profissão</TableCell>
            <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.listaPessoas?.map((pessoa) => (
            <TableRow key={pessoa.nome}>
              <TableCell>{pessoa.nome}</TableCell>
              <TableCell>{pessoa.cpf}</TableCell>
              <TableCell>{pessoa.nascimento}</TableCell>
              <TableCell>{pessoa.endereco}</TableCell>
              <TableCell>{pessoa.cidade}</TableCell>
              <TableCell>{pessoa.telefone}</TableCell>
              <TableCell>{pessoa.email}</TableCell>
              <TableCell>{pessoa.tipo}</TableCell>
              <TableCell>{pessoa.profissao1}</TableCell>
              <TableCell>
                <Stack direction="horizontal" gap={1}>
                  <IconButton
                    variant="outline-primary"
                    onClick={() => {
                      if (window.confirm("Deseja atualizar os dados da pessoa?")) {
                        props.editar(pessoa);
                      }
                    }}
                  >
                    <MdModeEdit />
                  </IconButton>{" "}
                  <IconButton
                    variant="outline-danger"
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
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Container>
  );
}
