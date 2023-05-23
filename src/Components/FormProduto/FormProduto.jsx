import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

export default function  ProdutoForm(props) {
  const [validated, setValidated] = useState(false);

  const [produto, setProduto] = useState({
    nome: "",
    doador: "",
    recebedor: "",
    descricao: " ",
    dtEntrada: "",
    dtSaida: "",
    disponibilidade: "",
    funcionario: "",
    dtVencimento: "",
    categoria: ""
  });

  function manipularOnChange(e) {
    const elementForm = e.currentTarget;
    const id = elementForm.id;
    const valor = elementForm.value;
    console.log('o elemento ' + id + " tem um novo valor " + valor)
    setProduto({ ...produto, [id]: valor });
  }

  function handleSubmit(event) {
    const form = event.currentTarget;
    console.log('entrei aqui')
    if (form.checkValidity()) {

      let produtos = props.listaProdutos;
      produtos.push(produto);
      props.setProdutos(produtos);

      props.exibirTabela(true);

      console.log('push feito')
      setValidated(false);


    } else {
      setValidated(true);
    }
    event.preventDefault(); 
  }

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>

      <Form.Group >
        <Form.Label>Nome</Form.Label>
        <Form.Control
          value={produto.nome}
          type="text"
          placeholder="Digite o nome do produto"
          id='nome'
          onChange={manipularOnChange}
          required
        />
        <Form.Control.Feedback type="invalid">
          Por favor, informe o nome do produto!
        </Form.Control.Feedback>
      </Form.Group>


      <Form.Group >
        <Form.Label>Doador</Form.Label>
        <Form.Control
          value={produto.doador}
          type="text"
          placeholder="Digite o nome do doador"
          id='doador'
          onChange={manipularOnChange}
          required
        />
        <Form.Control.Feedback type="invalid">
          Por favor, informe o nome do doador!
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group >
        <Form.Label>Recebedor</Form.Label>
        <Form.Control
          value={produto.recebedor}
          type="text"
          placeholder="Digite o nome do recebedor"
          id='recebedor'
          onChange={manipularOnChange}
        />
      </Form.Group>

      <Form.Group >
        <Form.Label>Descrição</Form.Label>
        <Form.Control
          value={produto.descricao}
          as="textarea"
          rows={3}
          placeholder="Digite a descrição do produto"
          id='descricao'
          onChange={manipularOnChange}
          required />
        <Form.Control.Feedback type="invalid">
          Por favor, informe a descrição!
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group >
        <Form.Label>Data de Entrada</Form.Label>
        <Form.Control
          value={produto.dtEntrada}
          type="date"
          id='dtEntrada'
          onChange={manipularOnChange}
          required />
        <Form.Control.Feedback type="invalid">
          Por favor, informe a data de entrada!
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group >
        <Form.Label>Data de Saída</Form.Label>
        <Form.Control
          value={produto.dtSaida}
          type="date"
          id='dtSaida'
          onChange={manipularOnChange}
        />
      </Form.Group>

      <Form.Group >
        <Form.Label>Disponibilidade</Form.Label>
        <Form.Control
          value={produto.disponibilidade}
          type="text"
          placeholder="Digite a disponibilidade do produto"
          id='disponibilidade'
          onChange={manipularOnChange}
          required
        />
        <Form.Control.Feedback type="invalid">
          Por favor, informe a disponibilidade!
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group >
        <Form.Label>Funcionário</Form.Label>
        <Form.Control
          value={produto.funcionario}
          type="text"
          placeholder="Digite o nome do funcionário"
          id='funcionario'
          onChange={manipularOnChange}
          required
        />
        <Form.Control.Feedback type="invalid">
          Por favor, informe o Funcionário!
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group >
        <Form.Label>Data de Vencimento</Form.Label>
        <Form.Control
          value={produto.dtVencimento}
          type="date"
          id='dtVencimento'
          onChange={manipularOnChange}
          required
        />
        <Form.Control.Feedback type="invalid">
          Por favor, informe a data de vencimento!
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group >
        <Form.Label>Categoria</Form.Label>
        <Form.Control
          value={produto.categoria}
          as="select"
          id='categoria'
          onChange={manipularOnChange}
          required>

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

      <Button variant="primary" type="submit">
        Enviar
      </Button>
      <Button variant="danger" type="button" className="mb-3" onClick={()=>{
        props.exibirTabela(true);
      }}>Voltar</Button>
    </Form>
  );
}

