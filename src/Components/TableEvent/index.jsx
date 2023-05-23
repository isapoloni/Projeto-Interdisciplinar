import { useState } from "react";

import {
  Button,
  Container,
  FormControl,
  InputGroup,
  Table,
} from "react-bootstrap";
import { RiSearchLine } from "react-icons/ri";
import { HiTrash } from "react-icons/hi"

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
        <Button onClick={props.alterPage} variant="primary" size="lg" className='mb-4'>
          Cadastrar evento
        </Button>
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

        <Table striped bordered hover size="sm" className="mt-5">
          <thead>
            <tr class="text-center">
              <th class="text-center">Título</th>
              <th class="text-center">Hora</th>
              <th class="text-center">Data Inicial</th>
              <th class="text-center">Data Final</th>
              <th class="text-center">Descrição</th>
              <th class="text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {listEvents.map((evento) => {
              return (
                <tr key={evento.titulo}>
                  <td>{evento.titulo}</td>
                  <td>{evento.hora}</td>
                  <td>{evento.dataInicial}</td>
                  <td>{evento.dataFinal}</td>
                  <td>{evento.descricao}</td>
                  <td>
                    <Button onClick={() => {
                          if (confirm("Confirma a exclusão do Evento ?"))
                            deletEvents(evento.titulo);
                        }}><HiTrash /></Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>



      </Container>
    </>
  );
};
