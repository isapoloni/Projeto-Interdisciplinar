// Desenvolvido por Isabela Poloni

import { useState, useEffect } from "react";
import ProdutoForm from "../../Components/FormProduto/FormProduto";
import TableProduto from "../../Components/TableProduto/TableProduto";
import listaProdutos from "../../Data/mockProduto";
import { Container } from "react-bootstrap";
import { urlBaseProduto } from "../../util/definicoesProduto";

export default function CadProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [exibirTabela, setExibirTabela] = useState(true);
  const [modoEdit, setModoEdit] = useState(false)

  useEffect(() => {
    fetch(urlBaseProduto + "/produtos", {
      method:"GET"
    }).then((resposta) =>{
      return resposta.json();
    }).then((dados) => {

      if (Array.isArray(dados)){
        setProdutos(dados);
      } else {
        console.log('caiu a fita mermao')
      }

    })
  }, [])

  return (
    <Container>
      {
      exibirTabela ? (
        <TableProduto
          listaProdutos={produtos}
          setProdutos={setProdutos}
          exibirTabela={setExibirTabela}
        />
      ) : (
        <ProdutoForm
          listaProdutos={produtos}
          setProdutos={setProdutos}
          exibirTabela={setExibirTabela}
          modoEdit={modoEdit}
        />
      )
      }
    </Container>
  );
}
