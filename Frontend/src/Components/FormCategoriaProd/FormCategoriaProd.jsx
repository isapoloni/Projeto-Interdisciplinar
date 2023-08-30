import { useState } from "react";
import { Form, Button, Col, Row, Stack, } from "react-bootstrap";
import { urlBackend } from "../../assets/funcoes";

export default function CategoriaForm(props) {
    const [validated, setValidated] = useState(false);
    const [categoria, setCategoria] = useState(props.categoria);

    function manipularOnChange(e) {
        const elementForm = e.currentTarget;
        const id = elementForm.id;
        const valor = elementForm.value;
        setCategoria({ ...categoria, [id]: valor });
    }

    function manipulaSubmissao(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {

            if (!props.modoEdicao) {
                fetch(urlBackend + "/categoria", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(categoria)
                })
                    .then((resposta) => {
                        return resposta.json()
                    })
                    .then((dados) => {
                        if (dados.status) {
                            props.setModoEdicao(false)
                            let novaLista = props.listaCategorias;
                            novaLista.push(categoria)
                            props.setCategorias(novaLista)
                            props.buscar()
                            props.exibirTabela(true)
                        }
                        window.alert(dados.mensagem)
                    })
                    .catch((erro) => {
                        window.alert("Erro ao executar a requisição: " + erro.message)
                    })
            }
            else {
                fetch(urlBackend + '/categoria', {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(categoria)
                })
                    .then((resposta) => {

                        window.location.reload();
                        return resposta.json()

                    })
            }
            setValidated(false)
        } else {

            setValidated(true)
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
                    <h3>Cadastro Categoria de Categorias</h3>
                </Form.Group>

                <Row>
                    {/* <Col>
            <Form.Group>
              <Form.Label>Código</Form.Label>
              <Form.Control
                value={categoria.codigo}
                type="text"
                placeholder="Digite o codigo do categoria"
                id="codigo"
                onChange={manipularOnChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Por favor, informe o codigo do categoria!
              </Form.Control.Feedback>
            </Form.Group>
          </Col> */}

                    <Col>
                        <Form.Group>
                            <Form.Label>Nome Categoria</Form.Label>
                            <Form.Control
                                value={categoria.categoria}
                                type="text"
                                placeholder="Digite o nome da categoria"
                                id="categoria"
                                onChange={manipularOnChange}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Por favor, informe o nome do categoria!
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