// Desenvolvido por Isabella Poloni

import {
  Table,
  Container,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { MdModeEdit } from "react-icons/md";
import { HiTrash } from "react-icons/hi";
import { RiSearchLine } from "react-icons/ri";
import { urlBackend } from "../../assets/funcoes";

export default function TableProduto(props) {
  // const [produtos, setProdutos] = useState(props.listaProdutos);

  function filtrarProdutos(e) {
    const termoBusca = e.currentTarget.value;
    fetch(urlBackend + "/produtos", { method: "GET" })
      .then((resposta) => {
        return resposta.json();
      })
      .then((listaProdutos) => {
        if (Array.isArray(listaProdutos)) {
          const resultadoBusca = listaProdutos.filter((produto) =>
            produto.nome.toLowerCase().includes(termoBusca.toLowerCase())
          );
          props.setProdutos(resultadoBusca);
        }
      });
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
          <tr className="text-center">
            <th className="text-center">Código</th>
            <th className="text-center">Nome</th>
            <th className="text-center">Unidade</th>
            <th className="text-center">Descrição</th>
            <th className="text-center">Categoria</th>
            <th className="text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {props.listaProdutos?.map((produto) => {
            return (
              <tr key={produto.codigo}>
                <td>{produto.codigo}</td>
                <td>{produto.nome}</td>
                <td>{produto.metrica}</td>
                <td>{produto.descricao}</td>
                <td>{produto.categoria}</td>
                <td>
                  <Button variant="outline-primary"
                    onClick={() => {
                      if (
                        window.confirm("Deseja atualizar os dados do produto?")
                      ) {
                        props.editar(produto);
                      }
                    }}
                  >
                    <MdModeEdit />
                  </Button>
                  {""}
                  <Button variant="outline-danger"
                    onClick={() => {
                      if (window.confirm("Deseja excluir?")) {
                        props.deletar(produto);
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
