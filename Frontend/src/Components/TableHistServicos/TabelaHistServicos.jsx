// Desenvolvido por Isabella Poloni

import {
  Table,
  Container,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { MdModeEdit } from "react-icons/md";
import { HiTrash } from "react-icons/hi";
import { RiSearchLine } from "react-icons/ri";
import { urlBackend } from "../../assets/funcoes";
import Cookies from "universal-cookie";

export default function TableHistServico(props) {
  const cookies = new Cookies();
  const jwtAuth = cookies.get("authorization");
  function filtrarServicos(e) {
    const termoBusca = e.currentTarget.value;
    fetch(urlBackend + "/histServ", {
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
          const resultadoBusca = listaServicos.filter((histServico) =>
          histServico.prestador.toLowerCase().includes(termoBusca.toLowerCase())
            // histServico.histServico.toLowerCase().includes(termoBusca.toLowerCase())
          );
          props.setHistServicos(resultadoBusca);
        }
      });
  }
  function formatarDataBrasileira(dataISO) {
    const data = new Date(dataISO);
    const dia = data.getUTCDate().toString().padStart(2, '0');
    const mes = (data.getUTCMonth() + 1).toString().padStart(2, '0'); // Adiciona 1 ao mês, pois os meses em JavaScript são baseados em zero
    const ano = data.getUTCFullYear();
  
    return `${dia}/${mes}/${ano}`;
  }
  
  return (
    <Container>
      <Button
        className="mb-4"
        onClick={() => {
          props.exibirTabela(false);
        }}
      >
        Cadastrar serviço com pessoa
      </Button>

      <InputGroup className="mt-2">
        <FormControl
          type="text"
          id="termoBusca"
          placeholder="Busque serviços aqui"
          onChange={filtrarServicos}
        />
        <InputGroup.Text>
          <RiSearchLine />
        </InputGroup.Text>
      </InputGroup>

      <Table striped bordered hover size="sm" className="mt-5">
        <thead>
          <tr className="text-center">
            <th className="text-center">Código</th>
            {/* <th className="text-center">Pessoa</th> */}
            <th className="text-center">Prestador</th>
            <th className="text-center">Serviço</th>
            <th className="text-center">Data do Serviço</th>
            <th className="text-center">Valor</th>
          </tr>
        </thead>
        <tbody>
          {
          props.listaHistoricoDeServicos?.map((histServico) => {
            return (
              <tr key={histServico.id}>
                <td>{histServico.id}</td>
                <td>{histServico.prestador}</td>
                <td>{histServico.servico}</td>
                <td>{formatarDataBrasileira(histServico.serviceData)}</td>
                <td>{histServico.valor}</td>
                <td>
                  <Button
                    variant="outline-primary"
                    onClick={() => {
                      if (
                        window.confirm("Deseja atualizar os dados do serviço?")
                      ) {
                        props.editar(histServico);
                      }
                    }}
                  >
                    <MdModeEdit />
                  </Button>{" "}
                  <Button
                    variant="outline-danger"
                    onClick={() => {
                      if (window.confirm("Deseja excluir?")) {
                        props.deletar(histServico);
                      }
                    }}
                  >
                    <HiTrash />
                  </Button>
                </td>
              </tr>
            );
          })
          }
        </tbody>
      </Table>
    </Container>
  );
}
