import { useEffect, useState } from "react";
import { Form, Button, Col, Row, Stack } from "react-bootstrap";
import { urlBackend } from "../../assets/funcoes";
import { IMaskInput } from "react-imask";
import Cookies from "universal-cookie";
import { DropdownList } from "react-widgets/cjs";
export default function ServicoForm(props) {
  // console.log(props)

  const [validated, setValidated] = useState(false);
  const [servico, setServico] = useState(props.modoEdicao ? props.servico : {
    id:'',
    servico:'',
    descricao:'',
    categoria:'',
  });
  const cookies = new Cookies();
  const jwtAuth = cookies.get("authorization");
  // const [cpfSelecionado, setCpfSelecionado] = useState('');
  function mascaraMoeda(event) {
    const onlyDigits = event.target.value
      .split("")
      .filter((s) => /\d/.test(s))
      .join("")
      .padStart(3, "0");
    const digitsFloat = onlyDigits.slice(0, -2) + "." + onlyDigits.slice(-2);
    event.target.value = maskCurrency(digitsFloat);
  }

  function maskCurrency(valor, locale = "pt-BR", currency = "BRL") {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
    }).format(valor);
  }

  function manipularOnChange(e) {
    const elementForm = e.currentTarget;
    const id = elementForm.id;
    const valor = elementForm.value;
    setServico({ ...servico, [id]: valor });
  }
  // useEffect(() => {
  //   if (props.modoEdicao) {
  //     fetch(urlBackend + "/pessoas", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "authorization": `${jwtAuth}`
  //       },
  //     }).then((resposta) => {
  //       return resposta.json()
  //     }).then((dados) => {
  //       if (Array.isArray(dados)) {
  //         dados.filter((pessoa) => {
  //           if (pessoa.nome === servico.cpfPessoa) {
  //             setCpfSelecionado(pessoa.cpf)
  //           }
  //         })
  //       }
  //     })
  //   }
  // })
  // console.log(props.modoEdicao)
  // console.log( servico.id,
  //    servico.servico,
  //    servico.descricao,
  //    servico.categoria.codigo)
  function manipulaSubmissao(evento) {
    const form = evento.currentTarget;
    if (form.checkValidity()) {
      if (!props.modoEdicao) {
        // console.log('aqui')
        fetch(urlBackend + "/servicos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `${jwtAuth}`,
          },
          body: JSON.stringify({ 
            servico:servico.servico,
            descricao:servico.descricao,
            categoria:servico.categoria.codigo}),
        })
          .then((resposta) => resposta.json())
          .then((dados) => {
            if (dados.status) {
              window.alert("Cadastro realizado com sucesso!");
              props.setModoEdicao(false);
              let novaLista = props.listaServicos;
              novaLista.push(servico);
              props.setServicos(novaLista);
              props.buscar();
              props.exibirTabela(true);
            } else {
              window.alert("Erro ao cadastrar serviço: " + dados.mensagem);
            }
          })
          .catch((erro) => {
            window.alert("Erro ao executar a requisição: " + erro.message);
          });
      } else {
        fetch(urlBackend + "/servicos", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: `${jwtAuth}`,
          },
          body: JSON.stringify({ 
            id:servico.id,
            servico:servico.servico,
            descricao:servico.descricao,
            categoria:typeof servico.categoria === 'string' ? props.categorias.filter((cat) => cat.categoria === servico.categoria)[0].codigo : servico.categoria.codigo})
        })
          .then((resposta) => resposta.json())
          .then((dados) => {
            if (dados.status) {
              window.alert("Atualização realizada com sucesso!");
              props.buscar()
              props.setModoEdicao(false);
              props.exibirTabela(true);
              props.setModoEdicao(false);
            } else {
              window.alert("Erro ao atualizar serviço: " + dados.mensagem);
            }
          })
          .catch((erro) => {
            window.alert("Erro ao executar a requisição: " + erro.message);
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
        <Form.Group className="mb-3 mt-4">
          <h3>Cadastro de Serviços</h3>
        </Form.Group>

        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label className="mb-2">Serviço</Form.Label>
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

          {/* <Col xs={3}>
            <Form.Group>
              <Form.Label>Jornada de Trabalho</Form.Label>
              <Form.Control
                value={servico.jornada}
                as="select"
                id="jornada"
                onChange={manipularOnChange}
                required
              >
                <option></option>
                <option value="Por hora">Por hora</option>
                <option value="Por Diária">Por Diária</option>
                <option value="Por Contrato">Por Contrato</option>
                <option value="A Combinar">A Combinar</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                Por favor, Selecione uma opção!
              </Form.Control.Feedback>
            </Form.Group>
          </Col> */}
        </Row>
        {/* <Row>
          {
          //Here
          }
        <Col>
          <Form.Group>
            <Form.Label>Cpf da pessoa</Form.Label>
            <Form.Control
              value={servico.cpfPessoa}
              as="select"
              id="cpfPessoa"
              onChange={manipularOnChange}
              required
            >
              <option></option>
              
               {props.cpfPessoas.map((pessoa) => (
                
                 <option key={pessoa.cpf} value={ props.modoEdicao?
                 `${pessoa.nome}` :`${pessoa.cpf}`
                  
                }>{`${pessoa.nome} - ${pessoa.cpf}`}</option>
               ))} 
              
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              Por favor, informe o cpf da pessoa!
            </Form.Control.Feedback>
          </Form.Group>
      </Col>
          {
          //Here
          }
        </Row> */}
        <Form.Group className="mb-3">
          <Form.Label className="mb-2">Descrição</Form.Label>
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
          {/* <Col xs={5}>
            <Form.Group>
              <Form.Label>Custo Estimado </Form.Label>
              <Form.Control
                value={servico.custo}
                type="text"
                placeholder="Insira um custo estimado"
                id="custo"
                onInput={mascaraMoeda}
                onChange={manipularOnChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Por favor, informe o custo estimado!
              </Form.Control.Feedback>
            </Form.Group>
          </Col> */}

          <Col xs={3}>
            <Form.Group>
              <Form.Label>Categoria</Form.Label>
              <DropdownList
                data={props.categorias}
                value={servico.categoria ? servico.categoria : null}
                onChange={(value) => {
                setServico({ ...servico, 
                categoria: value })}}
                textField="categoria"
                id="categoria"
                placeholder="Selecione uma categoria"
                caseSensitive={false}
                filter="contains"
                required
                    />
              {/* <Form.Control
                value={servico.categoria}
                as="select"
                id="categoria"
                onChange={manipularOnChange}
                required
              >
                <option></option>
                {props.categorias.map((categoria) => (

                  <option value={categoria.codigo}>{categoria.categoria}</option>
                ))}
              </Form.Control> */}
              <Form.Control.Feedback type="invalid">
                Por favor, informe a categoria!
              </Form.Control.Feedback>
            </Form.Group>
            {/* <Form.Group>
              <Form.Label>Serviço Remoto?</Form.Label>
              <Form.Control
                value={servico.modelo}
                as="select"
                id="modelo"
                onChange={manipularOnChange}
                required
              >
                <option></option>
                <option>Remoto</option>
                <option>Presencial</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                Por favor, Selecione uma opção!
              </Form.Control.Feedback>
            </Form.Group> */}
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
