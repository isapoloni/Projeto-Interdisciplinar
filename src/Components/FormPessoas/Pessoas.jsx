// Desenvolvido por Francisco Carlos de Souza Junior

import React, { useState } from "react";
import { Form, Button, Col, Row, Stack } from "react-bootstrap";

function FormPessoa(props) {
  const [validated, setValidated] = useState(false);
  const [pessoa, setPessoa] = useState({
    nome: " ",
    cpf: "",
    nascimento: "",
    endereco: "",
    cidade: "",
    telefone: "",
    email: "",
    tipo: [],
    disponibilidade: "",
    profissao1: "",
    profissao2: "",
  });

  const [checkedValues, setCheckedValues] = useState([]);

  function manipularMudanca(e) {
    const elemForm = e.currentTarget;
    const id = elemForm.id;
    const valor = elemForm.value;
    setPessoa({ ...pessoa, [id]: valor });
  }

  function handleSubmit(event) {
    const form = event.currentTarget;
    console.log("entrei aqui");
    if (form.checkValidity()) {
      let pessoas = props.listaPessoas;
      pessoas.push(pessoa);
      props.setPessoas(pessoas);
      props.exibirTabela(true);
      console.log("push feito");
      setValidated(false);
      console.log("Pelo menos um checkbox está marcado!");
    } else {
      setValidated(true);
      console.log("Nenhum checkbox está marcado!");
    }
    event.preventDefault();
  }

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <h3>Cadastro de Pessoas</h3>
        </Form.Group>
        <Row>
          <Form.Group>
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite o nome da pessoa"
              required
              value={pessoa.nome}
              id="nome"
              onChange={manipularMudanca}
            />
          </Form.Group>
          <Form.Control.Feedback type="invalid">
            Por favor, informe o nome da pessoa!
          </Form.Control.Feedback>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>CPF</Form.Label>
              <Form.Control
                type="text"
                placeholder="111.111.111-11"
                required
                value={pessoa.cpf}
                id="cpf"
                onChange={manipularMudanca}
              />
            </Form.Group>
            <Form.Control.Feedback type="invalid">
              Por favor, informe um cpf válido!
            </Form.Control.Feedback>
          </Col>

          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Data de Nascimento</Form.Label>
              <Form.Control
                type="date"
                placeholder="ex: 11/11/1111"
                required
                value={pessoa.nascimento}
                id="nascimento"
                onChange={manipularMudanca}
              />
            </Form.Group>
            <Form.Control.Feedback type="invalid">
              Por favor informe uma data de nasciemento
            </Form.Control.Feedback>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Endereço</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o endereço completo (Rua/av , número , complemento)"
                required
                value={pessoa.endereco}
                id="endereco"
                onChange={manipularMudanca}
              />
            </Form.Group>
            <Form.Control.Feedback type="invalid">
              Por favor, informe um endereço!
            </Form.Control.Feedback>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Cidade</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite a cidade"
                required
                value={pessoa.cidade}
                id="cidade"
                onChange={manipularMudanca}
              />
            </Form.Group>
            <Form.Control.Feedback type="invalid">
              Por favor, informe uma cidade!
            </Form.Control.Feedback>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Telefone</Form.Label>
              <Form.Control
                type="text"
                placeholder="ex:(11)11111-1111"
                required
                value={pessoa.telefone}
                id="telefone"
                onChange={manipularMudanca}
              />
            </Form.Group>
            <Form.Control.Feedback type="invalid">
              Por favor, informe um telefone
            </Form.Control.Feedback>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>E-Mail</Form.Label>
              <Form.Control
                type="email"
                placeholder="Insira seu e-mail"
                value={pessoa.email}
                id="email"
                onChange={manipularMudanca}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Tipo de Pessoa</Form.Label>
              {["doador", "prestador", "recebedor", "contratante"].map(
                (tipo) => (
                  <Form.Check
                    key={tipo}
                    type="checkbox"
                    label={tipo}
                    name={tipo}
                    id={tipo}
                    values={pessoa.tipo}
                    onChange={manipularMudanca}
                    feedback="Selecione uma opção"
                    feedbackType="invalid"
                  />
                )
              )}
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Disponibilidade</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite a disponibilidade de horário caso a pessoa seja um prestador"
                value={pessoa.disponibilidade}
                id="disponibilidade"
                onChange={manipularMudanca}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Profissão Primária</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite a profissão/área de atuação principal"
                value={pessoa.profissao1}
                id="profissao1"
                onChange={manipularMudanca}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Profissão Secundária</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite a profissão/área de interesse ou atuação secundária"
                value={pessoa.profissao2}
                id="profissao2"
                onChange={manipularMudanca}
              />
            </Form.Group>
          </Col>
        </Row>

        <Stack className="mt-3 mb-3" direction="horizontal" gap={3}>
          <Button variant="primary" type="submit" className="mb-3">
            Cadastrar
          </Button>

          <Button
            variant="danger"
            type="button"
            className="mb-3"
            onClick={() => {
              props.exibirTabela(true);
            }}
          >
            Voltar
          </Button>
        </Stack>
      </Form>
    </>
  );
}

export default FormPessoa;
