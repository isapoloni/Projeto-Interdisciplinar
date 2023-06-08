import { useState } from "react";
import { Form, Button, Col, Row, Stack } from "react-bootstrap";
import { urlBackend } from "../../assets/funcoes";

export default function ServicoForm(props) {
  const [validated, setValidated] = useState(false);
  const [servico, setServico] = useState(props.servico);

  function manipularOnChange(e) {
    const elementForm = e.currentTarget;
    const id = elementForm.id;
    const valor = elementForm.value;
    setServico({ ...servico, [id]: valor });
  }

  function manipulaSubmissao(evento) {
    const form = evento.currentTarget;
    if (form.checkValidity()) {
      if (!props.modoEdicao) {
        fetch(urlBackend + "/servicos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(servico)
        })
          .then((resposta) => {
            return resposta.json();
          })
          .then((dados) => {
            if (dados.status) {
              props.setModoEdicao(false);
              let novaLista = props.listaServicos;
              novaLista.push(servico);
              props.setServicos(novaLista);
              props.exibirTabela(true);
            }
            window.alert(dados.mensagem);
          })
          .catch((erro) => {
            window.alert("Erro ao executar a requisição: " + erro.message);
          });
      } else {
        fetch(urlBackend + "/servicos", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(servico)
        })
          .then((resposta) => {
            window.location.reload();
            return resposta.json();
          });
      }
      setValidated(false);
    } else {
      setValidated(true);
    }
    evento.preventDefault();
    evento.stopPropagation();
  }

  return (
    <>
      <Form
        noValidate
        validated={validated}
        onSubmit={manipulaSubmissao}
        variant="light"
      >
        <Form.Group className="mb-3">
          <h3>Cadastro de Serviços</h3>
        </Form.Group>

        <Row>
          <Col xs={1}>
            <Form.Group>
              <Form.Label>Código</Form.Label>
              <Form.Control
                value={servico.id}
                type="text"
                id="id"
                onChange={manipularOnChange}
                required
              />              
            </Form.Group>
          </Col>

          <Col>
            <Form.Group>
              <Form.Label>Serviço</Form.Label>
              <Form.Control
                value={servico.servico}
                type="text"
                placeholder="Digite o nome do serviço"
                id="servico"
                onChange={manipularOnChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Por favor, informe o nome do serviço!
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col xs={3}>
            <Form.Group>
              <Form.Label>Jornada de Trabalho</Form.Label>
              <Form.Control
                value={servico.jornada}
                as="select"
                id="jornada"
                onChange={manipularOnChange}
                required
              >
                <option>Selecione</option>
                <option>Por Hora</option>
                <option>Por Diária</option>
                <option>Por Contrato</option>
                <option>À Combinar</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                Por favor, Selecione uma opção!
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group>
          <Form.Label>Descrição</Form.Label>
          <Form.Control
            value={servico.descricao}
            as="textarea"
            rows={3}
            placeholder="Digite a descrição do serviço"
            id="descricao"
            onChange={manipularOnChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            Por favor, informe a descrição!
          </Form.Control.Feedback>
        </Form.Group>

        <Row>
          <Col xs={5}>
          <Form.Group>
              <Form.Label>Custo Estimado </Form.Label>
              <Form.Control
                value={servico.custo}
                type="text"
                placeholder="Insira um custo estimado"
                id="custo"
                onChange={manipularOnChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Por favor, informe o custo estimado!
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          
          <Col xs={3}>
          <Form.Group>
              <Form.Label>Serviço Remoto?</Form.Label>
              <Form.Control
                value={servico.modelo}
                as="select"
                id="modelo"
                onChange={manipularOnChange}
                required
              >
                <option>Selecione</option>
                <option>Remoto</option>
                <option>Presencial</option>
                
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                Por favor, Selecione uma opção!
              </Form.Control.Feedback>
            </Form.Group>
      
          </Col>
          </Row>

        <Stack className="mt-3 mb-3" direction="horizontal" gap={3}>
          <Button variant="primary" type="submit">
            {props.modoEdicao ? "Atualizar" : "Cadastrar"}
          </Button>
          <Button
            variant="danger"
            type="button"
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
