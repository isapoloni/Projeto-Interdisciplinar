// Desenvolvido por Isabela Poloni

import { useState } from "react";
import {
  Form,
  Button,
  Col,
  Row,
  Stack,
} from "react-bootstrap";
import { urlBaseProduto } from "../../util/definicoesProduto";

export default function ProdutoForm(props) {
  const [validated, setValidated] = useState(false);

  const [produto, setProduto] = useState({
    codigo: "",
    nome: "",
    metrica: "",
    descricao: " ",
    categoria: "",
  });

  function manipularOnChange(e) {
    const elementForm = e.currentTarget;
    const id = elementForm.id;
    const valor = elementForm.value;
    console.log("o elemento " + id + " tem um novo valor " + valor);
    setProduto({ ...produto, [id]: valor });
  }

  function handleSubmit(event) {
    const form = event.currentTarget;
    console.log("entrei aqui");
    if (form.checkValidity()) {

      if (props.modoEdicao) {

      }
      props.exibirTabela(true);
      setValidated(false);
    } else {
      fetch(urlBaseProduto + "/produtos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(produto)
      }).then((resposta) => {
        return resposta.json();
      })
      .then((dados) => {
          window.alert(dados.mensagem);
       })
       .catch((erro) => {
        window.alert('Erro ao executar a requisição')
       })
      event.preventDefault();
    }

    return (
      <>
        <Form
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
          variant="light"
        >
          <Form.Group className="mb-3">
            <h3>Cadastro de Produtos</h3>
          </Form.Group>

          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Código</Form.Label>
                <Form.Control
                  value={produto.codigo}
                  type="text"
                  placeholder="Digite o codigo do produto"
                  id="codigo"
                  onChange={manipularOnChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Por favor, informe o codigo do produto!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col>
              <Form.Group>
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  value={produto.nome}
                  type="text"
                  placeholder="Digite o nome do produto"
                  id="nome"
                  onChange={manipularOnChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Por favor, informe o nome do produto!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col>
              <Form.Group>
                <Form.Label>Unidade</Form.Label>
                <Form.Control
                  value={produto.metrica}
                  as="select"
                  id="metrica"
                  onChange={manipularOnChange}
                  required
                >
                  <option>Selecione</option>
                  <option>Peça</option>
                  <option>Unidade</option>
                  <option>Quilograma (kg)</option>
                  <option>Grama (g)</option>
                  <option>Litro (L)</option>
                  <option>Pacote</option>
                  <option>Par</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  Por favor, informe a metrica!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

          </Row>
          <Form.Group>
            <Form.Label>Descrição</Form.Label>
            <Form.Control
              value={produto.descricao}
              as="textarea"
              rows={3}
              placeholder="Digite a descrição do produto"
              id="descricao"
              onChange={manipularOnChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Por favor, informe a descrição!
            </Form.Control.Feedback>
          </Form.Group>

          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Categoria</Form.Label>
                <Form.Control
                  value={produto.categoria}
                  as="select"
                  id="categoria"
                  onChange={manipularOnChange}
                  required
                >
                  <option>Selecione a categoria</option>
                  <option>Alimento</option>
                  <option>Roupas</option>
                  <option>Dinheiro</option>
                  <option>Outros</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  Por favor, informe a categoria!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

          </Row>

          <Stack className="mt-3 mb-3" direction="horizontal" gap={3}>
            <Button variant="primary" type="submit">
              Enviar
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
}