import { useState } from "react";
import {
  Button,
  Container,
  FormControl,
  InputGroup,
  Table,
} from "react-bootstrap";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { RiSearchLine } from "react-icons/ri";

export const TableEvent = (props) => {
  const [listEvents, setListEvents] = useState(props.eventosBD);

  const deletEvents = (titulo) => {
    console.log("Antes do filter");
    const listUpEvents = props.eventosBD.filter(
      (evento) => evento.titulo !== titulo
    );
    console.log("depois do filter");

    props.setListEvents(listUpEvents);
    setListEvents(listUpEvents);
    console.log("Fim");
  };

  const filterEvents = (e) => {
    const termSearch = e.currentTarget.value;
    const resultSearch = props.eventosBD.filter((evento) =>
      evento.titulo.toLowerCase().includes(termSearch.toLowerCase())
    );
    setListEvents(resultSearch);
  };

  return (
    <>
      <Container>
        <InputGroup className="mt-2">
          <FormControl
            type="text"
            id="termSearch"
            placeholder="Buscar"
            onChange={filterEvents}
          />
          <InputGroup.Text>
            <RiSearchLine />
          </InputGroup.Text>
        </InputGroup>
        <div style={{ margin: "30px" }}>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <td>Ações</td>
                <td>Titlulo</td>
                <td>Hora</td>
                <td>Data Inicial</td>
                <td>Data Final</td>
                <td>Descrição</td>
              </tr>
            </thead>
            <tbody>
              {listEvents.map((evento) => {
                return (
                  <tr key={evento.titulo} style={{ height: "70px" }}>
                    <td
                      style={{
                        display: "Flex",
                        justifyContent: "space-around",
                        height: "70px",
                      }}
                    >
                      <a>
                        <FaEdit />
                      </a>
                      <a>
                        <FaTrashAlt
                          onClick={() => {
                            if (confirm("Confirma a exclusão do Evento ?"))
                              deletEvents(evento.titulo);
                          }}
                        />
                      </a>
                    </td>
                    <td>{evento.titulo}</td>
                    <td>{evento.hora}</td>
                    <td>{evento.dataInicial}</td>
                    <td>{evento.dataFinal}</td>
                    <td>{evento.descricao}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <hr />
          <div style={{ margin: "30px" }}>
            <Button onClick={props.alterPage} variant="primary" size="lg">
              Cadastrar
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
};
