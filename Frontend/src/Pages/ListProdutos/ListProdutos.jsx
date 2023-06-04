import TableProduto from "../../Components/TableProduto/TableProduto"
import listaProdutos from "../../Data/mockProduto"

export default function ListProdutos() {


  return (
    <>
    <h1>Lista de produtos</h1>
      <TableProduto listaProdutos={listaProdutos} />
    </>
  )

}


