// Desenvolvido por Isabella Poloni

import { Table, Container, Button, InputGroup, FormControl } from "react-bootstrap";
// import { MdModeEdit } from "react-icons/md";
import { HiTrash } from "react-icons/hi";
import { RiSearchLine } from "react-icons/ri";

import { urlBaseProduto } from "../../util/definicoesProduto";

export default function TableProduto(props) {
  // const [produtos, setProdutos] = useState(props.listaProdutos);

  function excluirProduto(nome) {
    const listaAtualizada = props.listaProdutos.filter(
      (produto) => produto.nome !== nome
    );
    props.setProdutos(listaAtualizada);
  }

  function filtrarProdutos(e) {
    const termoBusca = e.currentTarget.value;

    fetch(urlBaseProduto + "/produtos", { method: "GET" })
      .then((resposta) => {
        console.log('resposta', resposta)
        return resposta.json()
      })
      .then((listaProdutos) => {
        if (Array.isArray(listaProdutos)) {
          const resultadoBusca = listaProdutos.filter((produto) => produto.nome.toLowerCase().includes(termoBusca.toLowerCase()))
          props.setProdutos(resultadoBusca)
        }
      })
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
            <th class="text-center">Código</th>
            <th class="text-center">Nome</th>
            <th class="text-center">Unidade</th>
            <th class="text-center">Descrição</th>
            <th class="text-center">Categoria</th>
            <th class="text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {
            props.listaProdutos?.map((produto) => {
              return (
                <tr key={produto.codigo}>
                  <td>{produto.codigo}</td>
                  <td>{produto.nome}</td>
                  <td>{produto.metrica}</td>
                  <td>{produto.descricao}</td>
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
