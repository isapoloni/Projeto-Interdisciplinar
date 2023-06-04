// Desenvolvido por Isabela Poloni

import { useState } from "react";
import ProdutoForm from "../../Components/FormProduto/FormProduto";
import TableProduto from "../../Components/TableProduto/TableProduto";
import { Container } from "react-bootstrap";
import Header from "../../Components/Header";

export default function CadProdutos() {
  const [produtos, setProdutos] = useState(listaProdutos);
  const [exibirTabela, setExibirTabela] = useState(true);

  return (
    <>
      <Header />
      <Container>
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
      </Container>
    </>
  );
}
