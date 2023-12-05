import { useState } from "react";
import { Form, Button, Col, Row, Stack, } from "react-bootstrap";
import { urlBackend } from "../../assets/funcoes";
import Cookies from "universal-cookie";

export default function CategoriaServicoForm(props) {
    const [validated, setValidated] = useState(false);
    const [categoria, setCategoria] = useState(props.modoEdicao ? props.categoria : {

    });

    console.log(props.modoEdicao)

    const cookies = new Cookies()
    const jwtAuth = cookies.get('authorization')
    function manipularOnChange(e) {
        const elementForm = e.currentTarget;
        const id = elementForm.id;
        const valor = elementForm.value;
        setCategoria({ ...categoria, [id]: valor });
    }

    function manipulaSubmissao(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {
            const confirmacaoMensagem = props.modoEdicao ? "Deseja realmente atualizar a categoria?" : "Deseja realmente cadastrar a categoria?";
            const confirmacaoAcao = window.confirm(confirmacaoMensagem);

            if (confirmacaoAcao) {
                if (!props.modoEdicao) {
                    fetch(urlBackend + `/catservico`, {

                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "authorization": `${jwtAuth}`
                        },
                        body: JSON.stringify(categoria)
                    })
                        .then((resposta) => {
                            return resposta.json()
                        })
                        .then((dados) => {
                            if (dados.status) {
                                const confirmacaoCadastro = window.confirm("Categoria cadastrada com sucesso!");
                                if (confirmacaoCadastro) {
                                    props.setModoEdicao(false)
                                    let novaLista = props.listaCategorias;
                                    novaLista.push(categoria)
                                    props.setCategorias(novaLista)
                                    props.buscar()
                                    // props.exibirTabela(true)
                                    props.dadosAtualizados()
                                }
                            } else {
                                // Adicione a lógica para redirecionar ou fazer algo após a confirmação
                            }
                        })
                        .catch((erro) => {
                            window.alert("Erro ao executar a requisição: " + erro.message)
                        })
                }
                else {
                    fetch(urlBackend + `/catservico`, {

                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            "authorization": `${jwtAuth}`
                        },
                        body: JSON.stringify(categoria)
                    })
                        .then((resposta) => resposta.json())
                        .then((dados) => {
                            const confirmacaoAtualizacao = window.confirm("Categoria atualizada com sucesso!");
                            if (confirmacaoAtualizacao) {
                                props.setModoEdicao(false);
                                props.exibirTabela(true);
                                props.dadosAtualizados();
                            } else {
                                // Adicione a lógica para redirecionar ou fazer algo após a confirmação
                            }
                            //   window.alert(dados.mensagem);
                        })
                        .catch((erro) => {
                            window.alert("Erro ao executar a requisição: " + erro.message);
                        });
                }
                setValidated(false)
            } else {

                setValidated(true)
            }
            evento.preventDefault();
            evento.stopPropagation();
        }
    }

    return (
        <>
            <Form
                noValidate
                validated={validated}
                onSubmit={manipulaSubmissao}
                variant="light"
            >

                <Form.Group className="mb-3 mt-4">
                    <h3>Cadastro de Categorias de Serviços</h3>
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
                        <Form.Group className="mb-3">
                            <Form.Label className="mb-2">Nome Categoria</Form.Label>
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


                <div className="d-flex justify-content-end mt-3 mb-3">
                    <Stack className="mt-3 mb-3" direction="horizontal" gap={3}>
                        <Button variant="primary" type="submit">
                            {props.modoEdicao ? "Atualizar" : "Cadastrar"}
                        </Button>
                        <Button
                            variant="danger"
                            type="button"
                            onClick={() => {
                                props.setModoEdicao(false)
                                props.exibirTabela(true);
                            }}
                        >
                            Voltar
                        </Button>
                    </Stack>
                </div>
            </Form>
        </>
    );
}