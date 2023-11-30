

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
import { MdModeEdit } from "react-icons/md";
import { HiTrash } from "react-icons/hi";
import { AiFillPlusCircle, AiOutlineClear } from 'react-icons/ai'
import { RiSearchLine } from "react-icons/ri";
import { urlBackend } from "../../assets/funcoes";
import Cookies from "universal-cookie";

export default function TableServico(props) {

  const cookies = new Cookies();
  const jwtAuth = cookies.get("authorization");
  function filtrarServicos(e) {
    const termoBusca = e.currentTarget.value;
    fetch(urlBackend + "/servicos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `${jwtAuth}`,
      },
    })
      .then((resposta) => {
        return resposta.json();
      })
      .then((listaServicos) => {
        if (Array.isArray(listaServicos)) {
          const resultadoBusca = listaServicos.filter((servico) =>
            servico.servico.toLowerCase().includes(termoBusca.toLowerCase())
          );
          props.setServicos(resultadoBusca);
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
          <AiFillPlusCircle style={{ marginRight: '8px' }} /> Cadastrar serviço
        </Button>
      </div>
      <InputGroup className="mt-2">
        <TextField
          fullWidth
          type="text"
          id="termoBusca"
          placeholder="Busque o serviço desejado"
          onChange={filtrarServicos}
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
              {/* <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Pessoa</TableCell> */}
              <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Serviço</TableCell>
              <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Categoria</TableCell>
              <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Descrição</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.listaServicos?.map((servico) => (
              <TableRow key={servico.id}>
                <TableCell>{servico.id}</TableCell>
                {/* <TableCell>{servico.cpfPessoa}</TableCell> */}
                <TableCell>{servico.servico}</TableCell>
                <TableCell>{servico.categoria}</TableCell>
                <TableCell>{servico.descricao}</TableCell>
                <TableCell>
                  <IconButton
                    variant="outlined"
                    style={{ color: '#1683cc' }}
                    onClick={() => {
                      if (window.confirm("Deseja atualizar os dados do serviço?")) {
                        props.editar(servico);
                      }
                    }}
                  >
                    <MdModeEdit />
                  </IconButton>{" "}
                  <IconButton
                    variant="outlined"
                    style={{ color: '#cc3116' }}
                    onClick={() => {
                      if (window.confirm("Deseja excluir?")) {
                        props.deletar(servico);
                      }
                    }}
                  >
                    <HiTrash />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
