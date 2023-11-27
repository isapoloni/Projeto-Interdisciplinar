import { useState } from "react";
import { Form, Button, Col, Row, Stack, } from "react-bootstrap";
import { urlBackend } from "../../assets/funcoes";

export default function CategoriaForm(props) {
    const [validated, setValidated] = useState(false);
    const [categoria, setCategoria] = useState(props.modoEdicao ? props.categoria: {
        
    });
    const [tipoCategoria,setTipoCategoria] = useState(props.modoEdicao ? props.tipoCategoria : '') 
    const selectRequestForm ={
        produto:'categoriaProduto',
        servico:'catservico'
    }
    // console.log(selectRequestForm[tipoCategoria])
    console.log(props.modoEdicao)

    // console.log(tipoCategoria)
    const cookies = new Cookies()
    const jwtAuth= cookies.get('authorization')
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
                fetch(urlBackend + `/${selectRequestForm[tipoCategoria]}`, {

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
                            // props.exibirTabela(true)
                            props.dadosAtualizados()
                        }
                        window.alert(dados.mensagem)
                        // window.alert('deu bom')
                    })
                    .catch((erro) => {
                        window.alert("Erro ao executar a requisição: " + erro.message)
                    })
            }
            else {
                fetch(urlBackend + `/${selectRequestForm[tipoCategoria]}`, {

                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(categoria)
                })
                    .then((resposta) => {

                        // window.location.reload();
                        // props.exibirTabela(true)
                        props.dadosAtualizados()
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

                <Form.Group className="mb-3 mt-4">
                    <h3>Cadastro de Categorias</h3>
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
                    <Col>
                    <Form.Group>
                    <Form.Label>Categoria de </Form.Label>
              <Form.Control
                value={tipoCategoria}
                as="select"
                id="tipoCategoria"
                disabled={props.modoEdicao ? true : false} 
                onChange={(e) => setTipoCategoria(e.target.value)}
                required
              >
                <option></option>
                <option value={'produto'}>Produto</option>
                <option value={'servico'}>Serviço</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                Por favor, informe a qual entidade pertence a categoria!
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