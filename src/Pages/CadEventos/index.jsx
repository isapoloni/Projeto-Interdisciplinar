import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Header from "../../Components/Header";
import { Container } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import TimePicker from "react-bootstrap-time-picker";
import "./styled.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker.css";

function CadEventos() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };
  const [selectedDate, setSelectedDate] = useState(null);
  const handleChangeDate = (date) => setSelectedDate(date);
  const [selectedTime, setSelectedTime] = useState(null);
  const handleChangeHours = (time) => setSelectedTime(time);

  return (
    <>
      <Header titles="Cadastro de Eventos" />
      <Container>
        <Form
          className="FormEvent"
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <Row>
            <Col className="mb-3">
              <Form.Group as={Col} md="10" controlId="validationCustom01">
                <Form.Label>Evento</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Titulo do Evento"
                />
                <Form.Control.Feedback type="invalid">
                  Insira o titulo do Evento.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="timePicker">
                <Form.Label>Hora:</Form.Label>
                <TimePicker
                  onChange={handleChangeHours}
                  value={selectedTime}
                  className="form-control"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Insira o horário inicial do evento.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="datePicker">
                <Form.Label>Data Inicio</Form.Label>
                <ReactDatePicker
                  selected={selectedDate}
                  onChange={handleChangeDate}
                  dateFormat="dd/MM/yyyy"
                  className="form-control"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Insira Data Inicial do Evento
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="datePicker">
                <Form.Label>Data Final (Opcional)</Form.Label>
                <ReactDatePicker
                  selected={selectedDate}
                  onChange={handleChangeDate}
                  dateFormat="dd/MM/yyyy"
                  className="form-control"
                  required
                />
              </Form.Group>
              <br />
            </Col>
            <Col className="md-3">
              <Form.Group as={Col} md="10" controlId="validationCustom02">
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                  as="textarea"
                  aria-label="With textarea"
                  placeholder="Descrição do Evento"
                  rows={4}
                  cols={100}
                  readOnly
                />
                <Form.Control.Feedback type="invalid">
                  Insira a descrição do Evento
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <hr />

          <Button type="submit">Cadastrar Evento</Button>
        </Form>
      </Container>
    </>
  );
}

export default CadEventos;
