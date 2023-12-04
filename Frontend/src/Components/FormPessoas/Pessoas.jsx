import React, { useState } from "react";
import { Form, Button, Col, Row, Stack, FormControl } from "react-bootstrap";
import { urlBackend } from "../../assets/funcoes";
import { IMaskInput } from "react-imask";
import Cookie from "universal-cookie";


function FormPessoa(props) {
  const [validated, setValidated] = useState(false);
  const [pessoa, setPessoa] = useState(props.pessoa);

  console.log(pessoa)

  const cookies = new Cookie()
  const jwtAuth = cookies.get('authorization')

  function manipularMudanca(e) {
    const elemForm = e.currentTarget;
    const id = elemForm.id;
    const valor = elemForm.value;
    setPessoa({ ...pessoa, [id]: valor });
  }

  function removePontosTraco(cpf) {
    return cpf.replace(/[.-]/g, '');
  }

  function handleSubmit(event) {
    const form = event.currentTarget;

    const cpfSemPontosTraco = removePontosTraco(pessoa.cpf);
    setPessoa({ ...pessoa, cpf: cpfSemPontosTraco });;

    console.log("Dados a serem enviados:", JSON.stringify(pessoa));


    if (form.checkValidity()) {
      const confirmacaoMensagem = props.modoEdicao
        ? "Deseja realmente atualizar a pessoa?"
        : "Deseja realmente cadastrar a pessoa?";

      const confirmacaoAcao = window.confirm(confirmacaoMensagem);

      if (confirmacaoAcao) {
        if (!props.modoEdicao) {
          fetch(urlBackend + "/pessoas", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "authorization": `${jwtAuth}`
            },
            body: JSON.stringify(pessoa),
          })
            .then((resposta) => resposta.json())
            .then((dados) => {
              if (dados.status) {
                const confirmacaoCadastro = window.confirm("Pessoa cadastrada com sucesso!");
                if (confirmacaoCadastro) {
                  fetchDadosAtualizados();
                  props.exibirTabela(true);
                } else {
                  // Adicione a lógica para redirecionar ou fazer algo após a confirmação
                }
              }
              // window.alert(dados.mensagem);
            })
            .catch((erro) => {
              window.alert("Erro ao executar a requisição :" + erro.message);
            });
        } else {
          fetch(urlBackend + "/pessoas", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "authorization": `${jwtAuth}`
            },
            body: JSON.stringify(pessoa),
          })
            .then((resposta) => resposta.json())
            .then((dados) => {
              if (dados.status) {
                const confirmacaoAtualizacao = window.confirm("Pessoa atualizada com sucesso!");
                if (confirmacaoAtualizacao) {
                  fetchDadosAtualizados();
                  props.exibirTabela(true);
                } else {
                  // Adicione a lógica para redirecionar ou fazer algo após a confirmação
                }
              }
              // window.alert(dados.mensagem);
            })
            .catch((erro) => {
              window.alert("Erro ao executar a requisição :" + erro.message);
            });
        }

        setValidated(false);
      }
    } else {
      setValidated(true);
    }
    event.preventDefault();
  }

  function fetchDadosAtualizados() {
    // Buscar os dados atualizados da tabela de pessoas
    fetch(urlBackend + "/pessoas", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authorization": `${jwtAuth}`
      },
    })
      .then((resposta) => resposta.json())
      .then((listaPessoasAtualizada) => {
        if (Array.isArray(listaPessoasAtualizada)) {
          props.setPessoas(listaPessoasAtualizada);
        }
      })
      .catch((erro) => {
        console.error("Erro ao buscar dados atualizados:", erro);
      });
  }

  return (
    <>
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        variant="light"
      >

        <Form.Group className="mb-5 mt-4">
          <h3>Cadastro de Pessoas</h3>
        </Form.Group>

        <Row>
          <Form.Group className="mb-3">
            <Form.Label className="mb-2">Nome</Form.Label>
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
              <Form.Label className="mb-2">CPF</Form.Label>
              <Form.Control
                type="text"
                placeholder="111.111.111-11"
                as={IMaskInput}
                mask="000.000.000-00"
                required
                value={pessoa.cpf}
                id="cpf"
                onChange={manipularMudanca}
              />

              <Form.Control.Feedback type="invalid">
                Por favor, informe um cpf válido!
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group className="mb-3">
              <Form.Label className="mb-2">Data de Nascimento</Form.Label>
              <Form.Control
                type="date"
                placeholder="ex: 11/11/1111"
                required
                value={pessoa.nascimento}
                id="nascimento"
                onChange={manipularMudanca}
              />

              <Form.Control.Feedback type="invalid">
                Por favor informe uma data de nasciemento
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label className="mb-2">Endereço</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o endereço completo (Rua/av , número , complemento)"
                required
                value={pessoa.endereco}
                id="endereco"
                onChange={manipularMudanca}
              />

              <Form.Control.Feedback type="invalid">
                Por favor, informe um endereço!
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label className="mb-2">Cidade</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite a cidade"
                required
                value={pessoa.cidade}
                id="cidade"
                onChange={manipularMudanca}
              />

              <Form.Control.Feedback type="invalid">
                Por favor, informe uma cidade!
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label className="mb-2">Telefone</Form.Label>
              <Form.Control
                type="text"
                placeholder="ex:(11)11111-1111"
                as={IMaskInput}
                mask="(00) 00000-0000"
                required
                value={pessoa.telefone}
                id="telefone"
                onChange={manipularMudanca}
              />

              <Form.Control.Feedback type="invalid">
                Por favor, informe um telefone
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label className="mb-2">E-Mail</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Insira seu e-mail"
                value={pessoa.email}
                id="email"
                onChange={manipularMudanca}
              />
              <Form.Control.Feedback type="invalid">
                Por favor, informe um e-mail
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          {/* <Col>
            <Form.Group className="mb-5">
              <Form.Label className="mb-2">Tipo de Pessoa</Form.Label>
              <Form.Select
                required
                aria-label="Tipo de pessoa"
                value={pessoa.tipo}
                id="tipo"
                onChange={manipularMudanca}
              >
                <option> </option>
                <option value="Doador">Doador</option>
                <option value="Prestador">Prestador</option>
                <option value="Recebedor">Recebedor</option>
                <option value="Contratante">Contratante</option>
              </Form.Select>

              <Form.Control.Feedback type="invalid">
                Selecione um tipo de pessoa!
              </Form.Control.Feedback>
            </Form.Group>
          </Col> */}
          <Col>
            <Form.Group className="mb-3">
              <Form.Label className="mb-2">Profissão </Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite a profissão"
                value={pessoa.profissao1}
                id="profissao1"
                onChange={manipularMudanca}
              />
            </Form.Group>
          </Col>
        </Row>


        <Stack className="mt-3 mb-3" direction="horizontal" gap={3}>
          <Button variant="primary" type="submit" className="mb-3">
            {props.modoEdicao ? "Atualizar" : "Cadastrar"}
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
