// Desenvolvido por Isabella Poloni

import {
  Table,
  Container,
  Button,
  InputGroup,
  FormControl,
  Stack
} from "react-bootstrap";
import { MdModeEdit } from "react-icons/md";
import { HiTrash } from "react-icons/hi";
import { RiSearchLine } from "react-icons/ri";
import { urlBackend } from "../../assets/funcoes";
import Cookies from "universal-cookie";
export default function TableCategoria(props) {
  // const [categorias, setCategorias] = useState(props.listaCategorias);
  // console.log(props)
  console.log(props.modoEdicao)
  // console.log(props.setModoEdicao)
  const cookies = new Cookies()
  const jwtAuth= cookies.get('authorization')
  function filtrarCategorias(e) {
    const termoBusca = e.currentTarget.value;
    fetch(urlBackend + "/categoriaProduto", { method: "GET", headers: { "Content-Type": "application/json", "authorization": ` ${jwtAuth}` } })
      .then((resposta) => {
        return resposta.json();
      })
      .then((listaCategorias) => {
        if (Array.isArray(listaCategorias)) {
          const resultadoBusca = listaCategorias.filter((categoria) =>
            categoria.categoria.toLowerCase().includes(termoBusca.toLowerCase())
          );
          props.setCategorias(resultadoBusca);
        }
      });
  }

  return (
    <Container>
      <Button
        className="mb-4"
        onClick={() => {
  
          props.exibirTabela(false);
          // props.setModoEdicao(false)
        }}
      >
        Cadastrar categoria
      </Button>

      <InputGroup className="mt-2">
        <FormControl
          type="text"
          id="termoBusca"
          placeholder="Buscar"
          onChange={filtrarCategorias}
        />
        <InputGroup.Text>
          <RiSearchLine />
        </InputGroup.Text>
      </InputGroup>

      <Table striped bordered hover size="sm" className="mt-5">
        <thead>
          <tr className="text-center">
            <th className="text-center">Código</th>
            <th className="text-center">Categoria de Produto</th>
            <th className="text-center" >Ações</th>
          </tr>
        </thead>
        <tbody>
          {props.listaCategorias?.map((categoria) => {
            return (
              <tr key={categoria.codigo}>
                <td>{categoria.codigo}</td>
                <td>{categoria.categoria}</td>
                <td >
                  <Stack className="justify-content-center" direction="horizontal" gap={2}>
                  <Button variant="outline-primary"
                    onClick={() => {
                      if (
                        window.confirm("Deseja atualizar os dados do categoria?")
                      ) {
                        props.setTipoCategoria('produto')

                        props.editar(categoria);
                      }
                    }}
                  >
                    <MdModeEdit />
                  </Button>
                  {""}
                  {/* <Button variant="outline-danger"
                    onClick={() => {
                      window.confirm("Não é possivel excluir uma categoria")
                    }}
                  >
                    <HiTrash />
                  </Button> */}
                  </Stack>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Table striped bordered hover size="sm" className="mt-5">
        <thead>
          <tr className="text-center">
            <th className="text-center">Código</th>
            <th className="text-center">Categoria de Serviço</th>
            <th className="text-center" >Ações</th>
          </tr>
        </thead>
        <tbody>
          {props.listaCategoriasServico?.map((categoria) => {
            return (
              <tr key={categoria.codigo}>
                <td>{categoria.codigo}</td>
                <td>{categoria.categoria}</td>
                <td >
                  <Stack className="justify-content-center" direction="horizontal" gap={2}>
                  <Button variant="outline-primary"
                    onClick={() => {
                      if (
                        window.confirm("Deseja atualizar os dados do categoria?")
                      ) {
                        props.setTipoCategoria('servico')
                        props.editar(categoria);
                      }
                    }}
                  >
                    <MdModeEdit />
                  </Button>
                  {""}
                  {/* <Button variant="outline-danger"
                    onClick={() => {
                      window.confirm("Não é possivel excluir uma categoria")
                    }}
                  >
                    <HiTrash />
                  </Button> */}
                  </Stack>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
}
