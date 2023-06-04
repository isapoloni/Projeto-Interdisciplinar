// Desenvolvido por Isabela Poloni
import { Table, Container, Button, InputGroup, FormControl} from "react-bootstrap";
// import { MdModeEdit } from "react-icons/md";
import { HiTrash } from "react-icons/hi";
import { RiSearchLine } from "react-icons/ri";
import { useState } from "react";

export default function TableProduto(props) {
  const [produtos, setProdutos] = useState(props.listaProdutos);

  function excluirProduto(nome) {
    const listaAtualizada = props.listaProdutos.filter(
      (produto) => produto.nome !== nome
    );
    props.setProdutos(listaAtualizada);
    setProdutos(listaAtualizada);
  }

  function filtrarProdutos(e) {
    const termoBusca = e.currentTarget.value;
    const resultadoBusca = props.listaProdutos.filter((produto) =>
      produto.nome.toLowerCase().includes(termoBusca.toLowerCase())
    );
    setProdutos(resultadoBusca);
  }

  return (
    <Container>
      <Button
        className="mb-4"
        onClick={() => {
          props.exibirTabela(false);
        }}
      >
        Cadastrar produto
      </Button>

      <InputGroup className="mt-2">
        <FormControl
          type="text"
          id="termoBusca"
          placeholder="Buscar"
          onChange={filtrarProdutos}
        />
        <InputGroup.Text>
          <RiSearchLine />
        </InputGroup.Text>
      </InputGroup>

      <Table striped bordered hover size="sm" className="mt-5">
        <thead>
          <tr class="text-center">
            <th class="text-center">Nome</th>
            <th class="text-center">Doador</th>
            <th class="text-center">Recebedor</th>
            <th class="text-center">Descrição</th>
            <th class="text-center">Data Entrada</th>
            <th class="text-center">Data Saída</th>
            <th class="text-center">Disponibilidade</th>
            <th class="text-center">Funcionário</th>
            <th class="text-center">Data Vencimento</th>
            <th class="text-center">Categoria</th>
            <th class="text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto) => {
            return (
              <tr key={produto.nome}>
                <td>{produto.nome}</td>
                <td>{produto.doador}</td>
                <td>{produto.recebedor}</td>
                <td>{produto.descricao}</td>
                <td>{produto.dtEntrada}</td>
                <td>{produto.dtSaida}</td>
                <td>{produto.disponibilidade}</td>
                <td>{produto.funcionario}</td>
                <td>{produto.dtVencimento}</td>
                <td>{produto.categoria}</td>
                <td>
                  {/* <Button className="ml-2"><MdModeEdit /></Button> */}
                  <Button
                    onClick={() => {
                      if (
                        window.confirm(
                          "Deseja realmente excluir o produto " +
                            produto.nome +
                            "?"
                        )
                      ) {
                        excluirProduto(produto.nome);
                      }
                    }}
                  >
                    <HiTrash />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
}
