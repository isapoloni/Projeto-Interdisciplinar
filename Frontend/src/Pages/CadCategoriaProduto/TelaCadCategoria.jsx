// Desenvolvido por Isabela Poloni

import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import CategoriaForm from "../../Components/FormCategoriaProd/FormCategoriaProd"
import TableCategoria from "../../Components/TableCategoriaProd/TableCategoriaProd";
import { urlBackend } from "../../assets/funcoes";
import Header from "../../Components/Header";

export default function CadCategoriaProduto(props) {

  const [exibirTabela, setExibirTabela] = useState(true)
  const [categorias, setCategorias] = useState([])
  const [modoEdicao, setModoEdicao] = useState(false)
  const [categoriaEdicao, setCategoriaEdicao] = useState({
    codigo: "",
    categoria: ""
  })

  function prepararTela(categoria) {
    setModoEdicao(true);
    setCategoriaEdicao(categoria);
    setExibirTabela(false)
  }

  function deletarCategoria(categoria) {
    fetch(urlBackend + '/categoriaProduto', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(categoria)
    }).then((resposta) => {
      window.alert('Categoria excluído com sucesso!!!')
      window.location.reload();
      return resposta.json()
    })
  }


  useEffect(() => {
    buscar()
  }, []);

  function buscar() {
    fetch(urlBackend + '/categoriaProduto', {
      method: "GET"
    }).then((resposta) => {
      return resposta.json()
    }).then((dados) => {
      if (Array.isArray(dados)) {
        setCategorias(dados)

      }
      else {

      }
    });
  }

  function exibirTabelaEAtualizarDados() {
    setExibirTabela(true);
    buscar();
  }

  return (
    <>
      <Header />
      <Container>
        {
          exibirTabela ?
            <TableCategoria
              listaCategorias={categorias}
              setCategorias={setCategorias}
              exibirTabela={setExibirTabela}
              editar={prepararTela}
              deletar={deletarCategoria}
            />
            :
            <CategoriaForm
              listaCategorias={categorias}
              setCategorias={setCategorias}
              exibirTabela={setExibirTabela}
              modoEdicao={modoEdicao}
              editar={prepararTela}
              setModoEdicao={setModoEdicao}
              categoria={categoriaEdicao}
              buscar={buscar}
              dadosAtualizados={exibirTabelaEAtualizarDados}
            />
        }
      </Container>
    </>
  );

}
