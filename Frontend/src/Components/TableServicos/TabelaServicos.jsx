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

export default function TableServico(props) {
  function filtrarServicos(e) {
    const termoBusca = e.currentTarget.value;
    fetch(urlBackend + "/servico", { method: "GET" })
      .then((resposta) => {
        return resposta.json();
      })
      .then((listaServicos) => {
        if (Array.isArray(listaServicos)) {
          const resultadoBusca = listaServicos.filter((servico) =>
            servico.nome.toLowerCase().includes(termoBusca.toLowerCase())
          );
          props.setServicos(resultadoBusca);
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
        Cadastrar serviço
      </Button>

      <InputGroup className="mt-2">
        <FormControl
          type="text"
          id="termoBusca"
          placeholder="Buscar"
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
            <th className="text-center">Serviço</th>
            <th className="text-center">Jornada</th>
            <th className="text-center">Descrição</th>
            <th className="text-center">Custo</th>
            <th className="text-center">Tipo</th>
          </tr>
        </thead>
        <tbody>
          {props.listaServicos?.map((servico) => {
            return (
              <tr key={servico.id}>
                <td>{servico.id}</td>
                <td>{servico.serviceType}</td>
                <td>{servico.workSchedule}</td>
                <td>{servico.serviceDescription}</td>
                <td>{servico.estimatedCost}</td>
                <td>{servico.workModel}</td>
                <td>
                  <Button
                    onClick={() => {
                      if (
                        window.confirm("Deseja atualizar os dados do serviço?")
                      ) {
                        props.editar(servico);
                      }
                    }}
                  >
                    <MdModeEdit />
                  </Button>{" "}
                  <Button
                    onClick={() => {
                      if (window.confirm("Deseja excluir?")) {
                        props.deletar(servico);
                      }
                    }}
                  >
                    <HiTrash />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
}
