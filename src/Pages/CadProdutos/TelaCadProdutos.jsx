// Desenvolvido por Isabela Poloni

import { useState } from "react";
import ProdutoForm from "../../Components/FormProduto/FormProduto";
import TableProduto from "../../Components/TableProduto/TableProduto";
import listaProdutos from "../../Data/mockProduto";
import { Container } from "react-bootstrap";

export default function CadProdutos() {
  const [produtos, setProdutos] = useState(listaProdutos);
  const [exibirTabela, setExibirTabela] = useState(true);

  return (
    <>
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
