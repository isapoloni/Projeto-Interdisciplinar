import { useState } from "react";
import { Form, Button, Col, Row,} from "react-bootstrap";

function FormPessoa(props) {
  const [validated, setValidated] = useState(false);
  const [pessoa, setPessoa] = useState({
    nome: " ",
    cpf: "",
    nascimento: "",
    endereco: "",
    cidade: "",
    telefone: "",
    tipo: "",
    disponibilidade: "",
    profissao1: "",
    profissao2: ""
  });
  function manipularMudanca(e) {
    const elemForm = e.currentTarget;
    const id = elemForm.id;
    const valor = elemForm.value;
    setPessoa({ ...pessoa, [id]: valor });
  }
  function handleSubmit(event) {
    const form = event.currentTarget;
    console.log('entrei aqui')
    if (form.checkValidity()) {
      let pessoas = props.listaPessoas;
      pessoas.push(pessoa);
      props.setPessoas(pessoas);
      props.exibirTabela(true);
      console.log('push feito')
      setValidated(false);


    } else {
      setValidated(true);
    }
    event.preventDefault();
  }

  // const handleSubmit = (event) => {
  //   const form = event.currentTarget;
  //   if (form.checkValidity() === false 
  //   ) {props.listaPessoas.push(pessoa);
  //   props.exibirTabela(true)};{


  //     event.preventDefault();
  //     event.stopPropagation();
  //   }

  //   setValidated(true);
  // };
  return (
    <div>

      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row>
          <Form.Group >
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite o nome da pessoa"
              required
              value={pessoa.nome}
              id="nome"
              onChange={manipularMudanca}
            />
          </Form.Group>
          <Form.Control.Feedback type="invalid">
            Por favor, informe o nome da pessoa!
          </Form.Control.Feedback>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-5">
              <Form.Label>CPF</Form.Label>
              <Form.Control type="text"
                placeholder="111.111.111-11"
                required
                value={pessoa.cpf}
                id="cpf"
                onChange={manipularMudanca}
              />
            </Form.Group>
            <Form.Control.Feedback type="invalid">
              Por favor, informe um cpf válido!
            </Form.Control.Feedback>
          </Col>

          <Col>
            <Form.Group className="mb-5">
              <Form.Label>Data de Nascimento</Form.Label>
              <Form.Control type="date"
                placeholder="ex: 11/11/1111"
                required
                value={pessoa.nascimento}
                id="nascimento"
                onChange={manipularMudanca}
              />
            </Form.Group>
            <Form.Control.Feedback type="invalid">
              Por favor informe uma data de nasciemento
            </Form.Control.Feedback>
          </Col>
        </Row>

        <Row>
          <Form.Group >
            <Form.Label>Endereço</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite o endereço completo (Rua/av , número , complemento)"
              required
              value={pessoa.endereco}
              id="endereco"
              onChange={manipularMudanca}
            />
          </Form.Group>
          <Form.Control.Feedback type="invalid">
            Por favor, informe um endereço!
          </Form.Control.Feedback>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-5">
              <Form.Label>Cidade</Form.Label>
              <Form.Control type="text"
                placeholder="Digite a cidade"
                required
                value={pessoa.cidade}
                id="cidade"
                onChange={manipularMudanca}
              />
            </Form.Group>
            <Form.Control.Feedback type="invalid">
              Por favor, informe uma cidade!
            </Form.Control.Feedback>
          </Col>
          <Col>
            <Form.Group className="mb-5">
              <Form.Label>Telefone</Form.Label>
              <Form.Control
                type="text"
                placeholder="ex:(11)11111-1111"
                required
                value={pessoa.telefone}
                id="telefone"
                onChange={manipularMudanca}
              />
            </Form.Group>
            <Form.Control.Feedback type="invalid">
              Por favor, informe um telefone
            </Form.Control.Feedback>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-5">
              <Form.Label>Tipo de Pessoa</Form.Label>
              <Form.Select aria-label="Tipo de pessoa" value={pessoa.tipo}
                id="tipo"
                onChange={manipularMudanca}>
                <option>Escolha uma das opções </option>
                <option value="Doador">Doador</option>
                <option value="Prestador">Prestador</option>
                <option value="Recebedor">Recebedor</option>
                <option value="Contratante">Contratante</option>
              </Form.Select>

            </Form.Group>
            <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
          </Col>
          <Col>
            <Form.Group className="mb-5">
              <Form.Label>Disponibilidade</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite a disponibilidade de horário caso a pessoa seja um prestador"
                value={pessoa.disponibilidade}
                id="disponibilidade"
                onChange={manipularMudanca}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-5">
              <Form.Label>Profissão Primária</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite a profissão/área de atuação principal"
                value={pessoa.profissao1}
                id="profissao1"
                onChange={manipularMudanca}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-5">
              <Form.Label>Profissão Secundária</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite a profissão/área de interesse ou atuação secundária"
                value={pessoa.profissao2}
                id="profissao2"
                onChange={manipularMudanca}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Button variant="primary" type="submit" className="mb-3">
              Cadastrar
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button variant="danger" type="button" className="mb-3" onClick={() => {
              props.exibirTabela(true);
            }}>
              Voltar
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default FormPessoa
