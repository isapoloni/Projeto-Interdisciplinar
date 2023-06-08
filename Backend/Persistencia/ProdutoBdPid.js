import conectar from "./Conexao.js";
import Produto from "../Modelo/ProdutoPid.js";


export default class ProdutoBDPid {

  async incluir(produto) {
      if (produto instanceof Produto) {
          const conexao = await conectar();

          const sql = "INSERT INTO produto(codigo, nome, metrica, descricao, categoria) VALUES (?, ?, ?, ?, ?)";
          const valores = [
              produto.codigo,
              produto.nome,
              produto.metrica,
              produto.descricao,
              produto.categoria,
          ];

          await conexao.query(sql, valores);

      }
  }


  async alterar(produto) {
      if (produto instanceof Produto) {
          const conexao = await conectar();

          const sql = "UPDATE produto SET nome = ?, metrica = ?, descricao = ?, categoria = ? WHERE codigo = ?";

          const valores = [
              produto.nome,
              produto.metrica,
              produto.descricao,
              produto.categoria,
              produto.codigo,
          ];

          await conexao.query(sql, valores);
      }
  }


  async excluir(produto) {
      if (produto instanceof Produto) {
          const conexao = await conectar();

          const sql = "DELETE FROM produto WHERE codigo = ? ";

          const valores = [produto.codigo]

          await conexao.query(sql, valores);
      }
  }

  async consutlar(termo) {
      // if (produto instanceof Produto) {
      const conexao = await conectar();

      const sql = "SELECT * FROM produto WHERE nome LIKE ?";

      const valores = ['%' + termo + '%'];

      const [rows] = await conexao.query(sql, valores);

      const listaProdutos = [];

      for (const row of rows) {
          const produto = new Produto(

              row['codigo'],
              row['nome'],
              row['metrica'],
              row['descricao'],
              row['categoria'],
          );
          listaProdutos.push(produto);
      }
      return listaProdutos;
      // }
  }

  async consultarId(codigo) {
      const conexao = await conectar();

      const sql = "SELECT * FROM PRODUTO WHERE codigo = ?";

      const valores = [codigo]

      const [rows] = await conexao.query(sql, valores);

      const listaProdutos = [];

      for (const row of rows) {
          const produto = new Produto(

              row['codigo'],
              row['nome'],
              row['metrica'],
              row['descricao'],
              row['categoria'],

          );
          listaProdutos.push(produto);
      }
      return listaProdutos;
  }


}