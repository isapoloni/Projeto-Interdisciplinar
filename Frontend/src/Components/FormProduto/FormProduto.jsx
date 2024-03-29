import { useState } from "react";
import { Form, Button, Col, Row, Stack, } from "react-bootstrap";
import { urlBackend } from "../../assets/funcoes";
import { useNavigate } from "react-router-dom";
import { DropdownList } from 'react-widgets';
import 'react-widgets/styles.css';
import Cookie from "universal-cookie";

export default function ProdutoForm(props) {
  const [validated, setValidated] = useState(false);
  const [produto, setProduto] = useState(props.produto);
  const cookies = new Cookie()
  const jwtAuth= cookies.get('authorization')

  function manipularOnChange(e) {
    const elementForm = e.currentTarget;
    const id = elementForm.id;
    const valor = elementForm.value;
    setProduto({ ...produto, [id]: valor });
  }

  function manipulaSubmissao(evento) {
    const form = evento.currentTarget;
    if (form.checkValidity()) {
      if (!props.modoEdicao) {
        fetch(urlBackend + "/produto", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "authorization": `${jwtAuth}`
          },
          body: JSON.stringify(produto)
        })
          .then((resposta) => {
            return resposta.json()
          })
          .then((dados) => {
            if (dados.status) {
              props.setModoEdicao(false)
              let novaLista = props.listaProdutos;
              novaLista.push(produto)
              props.setProdutos(novaLista)
              props.buscarProduto()
              props.dadosAtualizados()
            }
            window.alert(dados.mensagem)
            console.log('Corpo da requisição:', JSON.stringify(produto)); 
            console.log('caiu aqui', dados)
          })
          .catch((erro) => {
            console.log('Corpo da requisição:', JSON.stringify(produto)); 
            window.alert("Erro ao executar a requisição: " + erro.message)
            console.log('deu ruim', erro)
            console.log('dados', dados)
          })
      }
      else {
        fetch(urlBackend + '/produto', {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(produto)
        })
          .then((resposta) => {
            console.log('Corpo da requisição:', JSON.stringify(produto)); 
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
        <Form.Group className="mb-3">
          <h3>Cadastro de Produtos</h3>
        </Form.Group>

        <Row>

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
                <option></option>
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

        {/* <Row>
          {

            <Col>
              <Form.Group>
                <Form.Label>Categoria</Form.Label>
                <Form.Control
                  value={produto.codigoCategoria}
                  as="select"
                  id="codigoCategoria"
                  onChange={manipularOnChange}
                  required
                >
                  <option></option>
                  {props.categorias.map((categoria) => (

                    <option value={categoria.codigo}>{categoria.categoria}</option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  Por favor, informe a categoria!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          }
        </Row> */}

        <Col>
          <Form.Group>
            <Form.Label>Categoria</Form.Label>
            <DropdownList
              value={props.categorias.find(categoria => categoria.codigo === produto.codigoCategoria)}
              data={props.categorias}
              textField="categoria"
              valueField="codigo"
              onChange={(value) => {
                const codigoCategoriaSelecionada = value && value.codigo;
                setProduto({ ...produto, codigoCategoria: codigoCategoriaSelecionada });
              }}
              placeholder="Selecione ou busque uma categoria"
              required
            />
            <Form.Control.Feedback type="invalid">
              Por favor, informe a categoria!
            </Form.Control.Feedback>
          </Form.Group>
        </Col>


        <div className="d-flex justify-content-end mt-3 mb-3">
        <Stack className="mt-3 mb-3" direction="horizontal" gap={3} >
            <Button variant="primary" type="submit">
              {props.modoEdicao ? "Atualizar" : "Cadastrar"}
            </Button>
            <Button
              variant="danger"
              type="button"
              onClick={() => {
                props.exibirTabela(true);
                // navigate(`/${repoName}/CadastroProduto`);
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