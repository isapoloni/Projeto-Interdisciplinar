import { useState } from "react";
import ProdutoForm from "../../Components/FormProduto/FormProduto"
import TableProduto from "../../Components/TableProduto/TableProduto";
import listaProdutos from "../../Data/mockProduto";


export default function CadProdutos() {
  const [produtos, setProdutos] = useState(listaProdutos);
  const [exibirTabela, setExibirTabela] = useState(true);


  return (
    <>
      {
        exibirTabela ?
          <TableProduto
            listaProdutos={produtos}
            setProdutos={setProdutos}
            exibirTabela={setExibirTabela}
          />
          :
          <ProdutoForm
            listaProdutos={produtos}
            setProdutos={setProdutos}
            exibirTabela={setExibirTabela}
          />
      }

    </>
  )
}

