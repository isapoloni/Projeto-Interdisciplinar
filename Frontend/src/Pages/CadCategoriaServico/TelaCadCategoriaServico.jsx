// Desenvolvido por Isabela Poloni

import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import  CategoriaServicoForm from "../../Components/FormCategoriaServico/FormCategoriaServico"
import TableCategoriaServico from "../../Components/TableCategoriaServico/TableCategoriaServico";
import { urlBackend } from "../../assets/funcoes";
import Header from "../../Components/Header";
import Cookies from "universal-cookie";

export default function CadCategoriaServico(props) {

  const [exibirTabela, setExibirTabela] = useState(true)
  const [categorias, setCategorias] = useState([])
  const [tipoCategoria,setTipoCategoria] = useState('')
  const [categoriaServico, setCategoriaServico] = useState([])
  const [modoEdicao, setModoEdicao] = useState(false)
  const [categoriaEdicao, setCategoriaEdicao] = useState({
    codigo: "",
    categoria: ""
  })
  const cookies = new Cookies()
  const jwtAuth= cookies.get('authorization')
  function prepararTela(categoria) {
    setModoEdicao(true);
    setCategoriaEdicao(categoria);
    setExibirTabela(false)

  }

  function deletarCategoria(categoria) {
    fetch(urlBackend + '/catservico', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' ,      
          "authorization": `${jwtAuth}`
    },
      body: JSON.stringify(categoria)
    }).then((resposta) => {
      window.alert('Categoria excluído com sucesso!!!')
      window.location.reload();
      return resposta.json()
    })
  }


  function buscar(){
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
          setCategorias(dados)
  
        }
        else {
  
        }
      });
  }
  useEffect(() => {
    buscar()
  }, []);
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
            <TableCategoriaServico
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
            <CategoriaServicoForm
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
