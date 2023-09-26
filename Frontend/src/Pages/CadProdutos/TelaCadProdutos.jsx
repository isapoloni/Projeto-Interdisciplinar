// Desenvolvido por Isabela Poloni

import { useState, useEffect } from "react";
import TableProduto from "../../Components/TableProduto/TableProduto";
import { Container } from "react-bootstrap";
import ProdutoForm from "../../Components/FormProduto/FormProduto";
import { urlBackend } from "../../assets/funcoes";
import Header from "../../Components/Header";
import Cookie from "universal-cookie";
export default function CadProdutos(props) {

  const [exibirTabela, setExibirTabela] = useState(true)
  const [produtos, setProdutos] = useState([])
  const [modoEdicao, setModoEdicao] = useState(false)
  const [produtoEdicao, setProdutoEdicao] = useState({
    codigo: "",
    nome: "",
    metrica: "",
    descricao: "",
    codigoCategoria: ""
  })
  const [categoria, setCategoria] = useState()
  const cookies = new Cookie()
  const jwtAuth= cookies.get('authorization')

  function prepararTela(produto) {
    setModoEdicao(true);
  
    setProdutoEdicao(produto);
    setExibirTabela(false)

  }

  function deletarProduto(produto) {
    fetch(urlBackend + '/produto', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' ,
      "authorization": `${jwtAuth}`},
      body: JSON.stringify(produto)
    }).then((resposta) => {
      window.alert('Produto excluído com sucesso!!!')
      window.location.reload();
      return resposta.json()
    })
  }

  useEffect(() => {
    buscarProduto()
    buscarCategoria()
  }, []);

  function buscarProduto() {
    fetch(urlBackend + '/produto', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authorization": `${jwtAuth}`
      }
    }).then((resposta) => {
      return resposta.json()
    }).then((dados) => {
      if (Array.isArray(dados)) {
        setProdutos(dados)
      }
      else {

      }
    });
  }

  function buscarCategoria() {
    fetch(urlBackend + '/categoria', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authorization": `${jwtAuth}`
      }
    }).then((resposta) => {
      return resposta.json()
    }).then((dados) => {
      if (Array.isArray(dados)) {
        setCategoria(dados)
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
            <TableProduto
              listaProdutos={produtos}
              setProdutos={setProdutos}
              exibirTabela={setExibirTabela}
              editar={prepararTela}
              deletar={deletarProduto}
            />
            :
            <ProdutoForm
              listaProdutos={produtos}
              setProdutos={setProdutos}
              exibirTabela={setExibirTabela}
              modoEdicao={modoEdicao}
              editar={prepararTela}
              setModoEdicao={setModoEdicao}
              produto={produtoEdicao}
              buscarProduto={buscarProduto}
              categorias={categoria}
            />

        }
      </Container>
    </>
  );

}
