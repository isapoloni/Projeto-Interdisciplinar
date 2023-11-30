

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
import { AiFillPlusCircle, AiOutlineClear } from 'react-icons/ai'
import { urlBackend } from "../../assets/funcoes";
import { MdModeEdit } from "react-icons/md";
import Stack from 'react-bootstrap/Stack';
import Cookies from "universal-cookie";

export default function TabelaPessoas(props) {

  const cookies = new Cookies()
  const jwtAuth = cookies.get('authorization')
  console.log(cookies)
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
      <div className="button-container">
        <Button
          className="button-cadastro"
          onClick={() => {
            props.exibirTabela(false);
          }}
        >
          <AiFillPlusCircle style={{ marginRight: '8px' }} /> Novo Cadastro
        </Button>
      </div>
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
            <TableRow >
              <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }} align="center">Nome</TableCell>
              <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }} align="center">CPF</TableCell>
              <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }} align="center">Data de Nascimento</TableCell>
              <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }} align="center">Endereço</TableCell>
              <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }} align="center">Cidade</TableCell>
              <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }} align="center">Telefone</TableCell>
              <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }} align="center">E-Mail</TableCell>
              <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }} align="center">Tipo</TableCell>
              <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }} align="center">Profissão</TableCell>
              <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }} align="center">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.listaPessoas?.map((pessoa) => (
              <TableRow key={pessoa.nome}>
                <TableCell align="center">{pessoa.nome}</TableCell>
                 <TableCell align='center'>{pessoa.cpf}</TableCell>
                 <TableCell align='center'>{pessoa.nascimento}</TableCell>
                 <TableCell align='center'>{pessoa.endereco}</TableCell>
                 <TableCell align='center'>{pessoa.cidade}</TableCell>
                 <TableCell align='center'>{pessoa.telefone}</TableCell>
                 <TableCell align='center'>{pessoa.email}</TableCell>
                 <TableCell align='center'>{pessoa.tipo}</TableCell>
                 <TableCell align='center'>{pessoa.profissao1}</TableCell>
                 <TableCell align='center'>
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
