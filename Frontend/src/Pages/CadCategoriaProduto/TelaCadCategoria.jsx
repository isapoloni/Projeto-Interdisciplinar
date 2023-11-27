
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import CategoriaForm from "../../Components/FormCategoriaProd/FormCategoriaProd"
import TableCategoria from "../../Components/TableCategoriaProd/TableCategoriaProd";
import { urlBackend } from "../../assets/funcoes";
import Header from "../../Components/Header";
import Cookies from "universal-cookie";

export default function CadCategoriaProduto(props) {

  const [exibirTabela, setExibirTabela] = useState(true)
  const [categorias, setCategorias] = useState([])
  const [tipoCategoria,setTipoCategoria] = useState('')
  const [categoriaServico, setCategoriaServico] = useState([])
  const [modoEdicao, setModoEdicao] = useState(false)
  const [categoriaEdicao, setCategoriaEdicao] = useState({
    codigo: "",
    categoria: ""
  })

  const cookies = new Cookies();
  const jwtAuth = cookies.get("authorization");

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
      // window.location.reload();
      return resposta.json()
    })
  }


  useEffect(() => {
    buscar()
  }, []);

  function buscar(){
    fetch(urlBackend + '/categoriaProduto', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "authorization": `${jwtAuth}`
        }
      }).then((resposta) => {
        return resposta.json()
      }).then((dados) => {
        if (Array.isArray(dados)) {
          setCategorias(dados)
  
        }
        else {
  
        }
      });
    fetch(urlBackend + '/catservico', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "authorization": `${jwtAuth}`
        }
      }).then((resposta) => {
        return resposta.json()
      }).then((dados) => {
        if (Array.isArray(dados)) {
          setCategoriaServico(dados)
  
        }
        else {
  
        }
      });
  }

  return (
    <>
      <Header />
      <Container>
        {
          exibirTabela ?
            <TableCategoria
              listaCategorias={categorias}
              tipoCategoria={tipoCategoria}
              setTipoCategoria={setTipoCategoria}
              listaCategoriasServico={categoriaServico}
              setCategorias={setCategorias}
              exibirTabela={setExibirTabela}
              editar={prepararTela}
              modoEdicao={modoEdicao}
              setModoEdicao={setModoEdicao}
              deletar={deletarCategoria}
            />
            :
            <CategoriaForm
              listaCategorias={categorias}
              setTipoCategoria={setTipoCategoria}
              tipoCategoria={tipoCategoria}
              listaCategoriasServico={categoriaServico}
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
