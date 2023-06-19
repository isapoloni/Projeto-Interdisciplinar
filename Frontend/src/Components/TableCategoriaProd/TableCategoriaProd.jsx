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

export default function TableCategoria(props) {
  // const [categorias, setCategorias] = useState(props.listaCategorias);

  function filtrarCategorias(e) {
    const termoBusca = e.currentTarget.value;
    fetch(urlBackend + "/categoria", { method: "GET" })
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
            <th className="text-center">Categoria</th>
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
