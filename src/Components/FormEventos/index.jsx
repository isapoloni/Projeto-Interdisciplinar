import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

export const FormEventos = (props) => {
  const [validated, setValidated] = useState(false);
  const [events, setEvents] = useState({
    titulo: "",
    hora: "",
    dataInicial: "",
    dataFinal: "",
    descricao: "",
  });

  const manipInput = (e) => {
    const elemForm = e.currentTarget;
    const id = elemForm.id;
    const value = elemForm.value;
    setEvents({ ...events, [id]: value });
  };

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity()) {
      props.eventosBD.push(events);
      setValidated(false);
      props.alterPage(true);
    } else {
      setValidated(true);
    }
    e.preventDefault();
  };

  return (
    <>
      <h1>Cadastro de Eventos</h1>
      <Form
        className="FormEvent"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <Row>
          <Col className="mb-3">
            <Form.Group as={Col} md="10">
              <Form.Label>Evento</Form.Label>
              <Form.Control
                required
                type="text"
                value={events.titulo}
                id="titulo"
                onChange={manipInput}
                placeholder="Titulo do Evento"
              />
              <Form.Control.Feedback type="invalid">
                Insira o titulo do Evento.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6">
              <Form.Label>Hora</Form.Label>
              <Form.Control
                value={events.hora}
                className="form-control"
                id="hora"
                onChange={manipInput}
                placeholder="Exemplo: 19:30h"
                required
              />
              <Form.Control.Feedback type="invalid">
                Insira o horário inicial do evento.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Label>Data Inicio</Form.Label>
              <Form.Control
                type="date"
                id="dataInicial"
                onChange={manipInput}
                value={events.dataInicial}
                required
              />
              <Form.Control.Feedback type="invalid">
                Insira Data Inicial do Evento
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Label>Data Final (Opcional)</Form.Label>
              <Form.Control
                type="date"
                id="dataFinal"
                onChange={manipInput}
                value={events.dataFinal}
              />
              <Form.Control.Feedback type="invalid">
                Insira Data Inicial do Evento
              </Form.Control.Feedback>
            </Form.Group>
            <br />
          </Col>
          <Col className="md-3">
            <Form.Group as={Col} md="10">
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                as="textarea"
                id="descricao"
                aria-label="With textarea"
                placeholder="Descrição do Evento"
                value={events.descricao}
                onChange={manipInput}
                rows={4}
                cols={100}
              />
              <Form.Control.Feedback type="invalid">
                Insira a descrição do Evento
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <hr />

        <Button type="submit" variant="primary">
          Cadastrar
        </Button>
        <Button
          style={{ marginLeft: "20px" }}
          type="button"
          variant="secondary"
          onClick={props.alterPage}
        >
          Voltar
        </Button>
      </Form>
    </>
  );
};
