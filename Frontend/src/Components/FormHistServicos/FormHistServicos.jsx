import { useEffect, useState } from "react";
import { Form, Button, Col, Row, Stack } from "react-bootstrap";
import { urlBackend } from "../../assets/funcoes";
import { IMaskInput } from "react-imask";
import Cookies from "universal-cookie";
export default function HistServicoForm(props) {
  // console.log(props)
  const [validated, setValidated] = useState(false);
  const [servico, setServico] = useState(props.servico);
  const cookies = new Cookies();
  const jwtAuth = cookies.get("authorization");
  // const [cpfSelecionado, setCpfSelecionado] = useState('');
  // console.log('cpf' , cpfSelecionado)
  console.log("props", props);
  console.log("modoEdicao", props.modoEdicao);
  //new Date(servico.serviceData).toISOString().split("T")[0]
  console.log("serv", servico);
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
  function manipulaSubmissao(evento) {
    const form = evento.currentTarget;
    if (form.checkValidity()) {
      if (!props.modoEdicao) {
        fetch(urlBackend + "/histServ", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `${jwtAuth}`,
          },
          body: JSON.stringify(servico),
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
              props.buscar();
              props.exibirTabela(true);
            }
            window.alert(dados.mensagem);
          })
          .catch((erro) => {
            window.alert("Erro ao executar a requisição: " + erro.message);
          });
      } else {
        console.log('aqui',)
        fetch(urlBackend + "/histServ", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: `${jwtAuth}`,
          },
          body: JSON.stringify({
            id: servico.id,
            prestador: props.cpfPessoas.filter(pessoaSelecionada => pessoaSelecionada.nome === servico.prestador)[0].cpf,
            servico: props.servicos.filter(servicoSelecionado => servicoSelecionado.servico === servico.servico)[0].id,
            serviceData: new Intl.DateTimeFormat("pt-BR").format(new Date(servico.serviceData)),
            valor: servico.valor

          }),
        }).then((resposta) => {
          // window.location.reload();
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
        <Form.Group className="mb-5 mt-4">
          <h3>Registro de prestação de serviço</h3>
        </Form.Group>

        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Prestador</Form.Label>
              <Form.Control
                value={servico.prestador}
                as="select"
                id="prestador"
                onChange={manipularOnChange}
                required
              >
                <option></option>

                {props.cpfPessoas.map((pessoa) => (

                  <option key={pessoa.cpf} value={props.modoEdicao ?
                    `${pessoa.nome}` : `${pessoa.cpf}`

                  }>{`${pessoa.nome} - ${pessoa.cpf}`}</option>
                ))}

              </Form.Control>
              <Form.Control.Feedback type="invalid">
                Por favor, informe o nome do prestador!
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Serviço</Form.Label>
              <Form.Control
                value={servico.servico}
                as="select"
                id="servico"
                onChange={manipularOnChange}
                required
              >
                <option></option>

                {props.servicos.map((servico) => (

                  <option key={servico.id} value={props.modoEdicao ?
                    `${servico.servico}` : `${servico.id}`

                  }>{`${servico.servico} - ${servico.id}`}</option>
                ))}

              </Form.Control>
              <Form.Control.Feedback type="invalid">
                Por favor, informe o nome do serviço!
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Data</Form.Label>
              <Form.Control
                value={!props.modoEdicao ? servico.serviceData : new Date(servico.serviceData).toISOString().split("T")[0]}
                id="serviceData"
                type="date"
                placeholder="Insira a data"
                onChange={manipularOnChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Por favor, informe a data!
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col className="mb-3">
            <Form.Group>
              <Form.Label>Valor </Form.Label>
              <Form.Control
                value={servico.valor}
                type="text"
                placeholder="Insira o valor"
                id="valor"
                onInput={mascaraMoeda}
                onChange={manipularOnChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Por favor, informe o valor!
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
