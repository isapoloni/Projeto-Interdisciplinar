// Desenvolvido por Francisco Carlos de Souza Junior

import React, { useState } from "react";
import { useEffect } from "react";
import { Form, Button, Col, Row, Stack } from "react-bootstrap";

function FormPessoa(props) {
  const [isFormValid, setIsFormValid] = useState(false); // estado para controlar a validação do formulário
  const [errorMessage, seterrorMessage] = useState("");

  const [validated, setValidated] = useState(false);
  const [pessoa, setPessoa] = useState({
    nome: " ",
    cpf: "",
    nascimento: "",
    endereco: "",
    cidade: "",
    telefone: "",
    email: "",
    tipo: {
      doador: false,
      prestador: false,
      recebedor: false,
      contratante: false,
    },
    disponibilidade: "",
    profissao1: "",
    profissao2: "",
  });

  function manipularMudanca(e) {
    const elemForm = e.currentTarget;
    const id = elemForm.id;
    const valor =
      elemForm.type === "checkbox" ? elemForm.checked : elemForm.value;
    if (["doador", "prestador", "recebedor", "contratante"].includes(id))
      //se for o id de um dos 4 tipos, seta o tipo
      setPessoa((p) => ({ ...p, tipo: { ...p.tipo, [id]: valor } }));
    else setPessoa({ ...pessoa, [id]: valor }); //se não seta a prop pelo id
  }

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    setValidated(true);

    if (form.checkValidity() === false) {
      // se não estiver válido
      setValidated(false);
      seterrorMessage("Preencha todos os campos obrigatórios!");
      return; //faz o que precisa e para a função
    }

    if (
      !pessoa.tipo.contratante &&
      !pessoa.tipo.doador &&
      !pessoa.tipo.prestador &&
      !pessoa.tipo.recebedor
    ) {
      seterrorMessage("Ao menos um tipo de pessoa é necessário");
      setValidated(false);
      return; //se um dos 4 não estiver marcado, faz o que precisa e para a função
    }
    seterrorMessage("Salvando....");
    //se tiver td certo, continua....
    return;
    let pessoas = props.listaPessoas;
    pessoas.push(pessoa);
    props.setPessoas(pessoas);
    props.exibirTabela(true);
    console.log("push feito");
    setValidated(false);
    console.log("Pelo menos um checkbox está marcado!");
  }

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <h3>Cadastro de Pessoas</h3>
        </Form.Group>
        <Row>
          <Form.Group as={Col} md="4">
            <Form.Label>First name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="First name"
              defaultValue=""
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Por favor, informe o nome da pessoa!
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="nome">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite o nome da pessoa"
              required
              value={pessoa.nome}
              id="nome"
              onChange={manipularMudanca}
            />
            <Form.Control.Feedback type="invalid">
              Por favor, informe o nome da pessoa!
            </Form.Control.Feedback>
          </Form.Group>
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
                    checked={pessoa.tipo[tipo]}
                    onChange={manipularMudanca}
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
        <p className="danger">{errorMessage}</p>

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
