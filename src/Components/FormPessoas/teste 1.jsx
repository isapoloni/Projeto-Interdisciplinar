// Desenvolvido por Francisco Carlos de Souza Junior

import React from "react";
import { Form, Button, Col, Row, Stack } from "react-bootstrap";
import * as formik from "formik";
import * as yup from "yup";

function FormPessoa(props) {
  const { Formik } = formik;

  const schema = yup.object().shape({
    nome: yup.string().required("Por favor preencha o nome."),
    cpf: yup.string().required("Por favor preencha o CPF."),
    nascimento: yup.string().required("Por favor preencha o Nascimento."),
    endereco: yup.string().required("Por favor preencha o Endereceo....."),
    cidade: yup.string().required("Por favor preencha o telefone."),
    telefone: yup.string().required("Por favor preencha o telefone."),
    email: yup.string().required("Por favor preencha o telefone."),
    tipo: ["doador", "prestador", "recebedor", "contratante"],
    disponibilidade: yup.string().required("Por favor preencha o telefone."),
    profissao1: yup.string().required("Por favor preencha o telefone."),
    profissao2: yup.string().required("Por favor preencha o telefone."),
  });

  return (
    <Formik
      validationSchema={schema}
      onSubmit={console.log}
      initialValues={{
        nome: "",
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
      }}
      validate={(values) => {
        if (!values.tipo.length) {
          return { tipo: "Please choose at least one topping" };
        }

        return {};
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <h3>Cadastro de Pessoas</h3>
          </Form.Group>
          <Row>
            <Form.Group controlId="nome">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o nome da pessoa"
                required
                value={values.nome}
                id="nome"
                onChange={handleChange}
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
                  value={values.cpf}
                  id="cpf"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Control.Feedback type="invalid">
                {errors.cpf}
              </Form.Control.Feedback>
            </Col>

            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Data de Nascimento</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="ex: 11/11/1111"
                  required
                  value={values.nascimento}
                  id="nascimento"
                  onChange={handleChange}
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
                  value={values.endereco}
                  id="endereco"
                  onChange={handleChange}
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
                  value={values.cidade}
                  id="cidade"
                  onChange={handleChange}
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
                  value={values.telefone}
                  id="telefone"
                  onChange={handleChange}
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
                  value={values.email}
                  id="email"
                  onChange={handleChange}
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
                      checked={values.tipo[tipo]}
                      onChange={handleChange}
                    />
                  )
                )}
                <Form.Control.Feedback type="invalid">
                  Ao menos um tipo é necessário.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Disponibilidade</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite a disponibilidade de horário caso a pessoa seja um prestador"
                  value={values.disponibilidade}
                  id="disponibilidade"
                  onChange={handleChange}
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
                  value={values.profissao1}
                  id="profissao1"
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Profissão Secundária</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite a profissão/área de interesse ou atuação secundária"
                  value={values.profissao2}
                  id="profissao2"
                  onChange={handleChange}
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
      )}
    </Formik>
  );
}

export default FormPessoa;
