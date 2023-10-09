// Desenvolvido por Isabela Poloni

import { useState } from "react";
import { Container } from "react-bootstrap";
import TableProduto from "../../Components/TableProduto";
import ProdutoForm from "../../Components/FormProduto/FormProduto";
import listaProdutos from "../../Data/mockProduto";
import Header from "../../Components/Header";

export default function CadProdutos() {
  const [produtos, setProdutos] = useState(listaProdutos);
  const [exibirTabela, setExibirTabela] = useState(true);

  return (
    <>
      <Header />
      <div style={{ margin: "70px", marginTop: "10px" }}>
        {exibirTabela ? (
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
          />
        )}
      </div>
    </>
  );
}
