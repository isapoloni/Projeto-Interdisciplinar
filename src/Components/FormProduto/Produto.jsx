import { Form, Button } from 'react-bootstrap';

const ProdutoForm = () => {
  return (
    <Form>
      <Form.Group controlId="nomeInput">
        <Form.Label>Nome</Form.Label>
        <Form.Control type="text" placeholder="Digite o nome do produto" />
      </Form.Group>

      <Form.Group controlId="doadorInput">
        <Form.Label>Doador</Form.Label>
        <Form.Control type="text" placeholder="Digite o nome do doador" />
      </Form.Group>

      <Form.Group controlId="recebedorInput">
        <Form.Label>Recebedor</Form.Label>
        <Form.Control type="text" placeholder="Digite o nome do recebedor" />
      </Form.Group>

      <Form.Group controlId="descricaoInput">
        <Form.Label>Descrição</Form.Label>
        <Form.Control as="textarea" rows={3} placeholder="Digite a descrição do produto" />
      </Form.Group>

      <Form.Group controlId="dataEntradaInput">
        <Form.Label>Data de Entrada</Form.Label>
        <Form.Control type="date" />
      </Form.Group>

      <Form.Group controlId="dataSaidaInput">
        <Form.Label>Data de Saída</Form.Label>
        <Form.Control type="date" />
      </Form.Group>

      <Form.Group controlId="disponibilidadeInput">
        <Form.Label>Disponibilidade</Form.Label>
        <Form.Control type="text" placeholder="Digite a disponibilidade do produto" />
      </Form.Group>

      <Form.Group controlId="funcionarioInput">
        <Form.Label>Funcionário</Form.Label>
        <Form.Control type="text" placeholder="Digite o nome do funcionário" />
      </Form.Group>

      <Form.Group controlId="dataVencimentoInput">
        <Form.Label>Data de Vencimento</Form.Label>
        <Form.Control type="date" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Enviar
      </Button>
    </Form>
  );
};

export default ProdutoForm;
