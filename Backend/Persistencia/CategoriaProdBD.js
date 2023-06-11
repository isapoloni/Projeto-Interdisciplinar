import conectar from "./Conexao.js";
import CategoriaProd from "../Modelo/CategoriaProd.js";

export default class CategoriaProdutoBD {
  
  async incluir(categoriaProd) {
    if (categoriaProd instanceof CategoriaProd) {
      const conexao = await conectar();

      const sql = "INSERT INTO categoria_produto (categoria) VALUES (?)";
      const valores = [categoriaProd.categoria];

      const resultado = await conexao.query(sql, valores);
      return resultado[0].insertId;
    }
  }

  async alterar(categoriaProd) {
    if (categoriaProd instanceof CategoriaProd) {
      const conexao = await conectar();

      const sql = "UPDATE categoria_produto SET categoria = ? WHERE codigo = ?";
      const valores = [categoriaProd.categoria, categoriaProd.codigo];

      await conexao.query(sql, valores);
    }
  }

  async excluir(categoriaProd) {
    if (categoriaProd instanceof CategoriaProd) {
      const conexao = await conectar();

      const sql = "DELETE FROM categoria_produto WHERE codigo = ?";
      const valores = [categoriaProd.codigo];

      await conexao.query(sql, valores);
    }
  }

  async consultar(termo) {
    const conexao = await conectar();

    const sql = "SELECT * FROM categoria_produto WHERE categoria LIKE ?";
    const valores = ['%' + termo + '%'];

    const [rows] = await conexao.query(sql, valores);

    const listaCategorias = [];

    for (const row of rows) {
      const categoriaProd = new CategoriaProd(row['codigo'], row['categoria']);
      listaCategorias.push(categoriaProd);
    }

    return listaCategorias;
  }

  async consultarCodigo(codigo) {
    const conexao = await conectar();

    const sql = "SELECT * FROM categoria_produto WHERE codigo = ?";
    const valores = [codigo];

    const [rows] = await conexao.query(sql, valores);

    const listaCategorias = [];

    for (const row of rows) {
      const categoriaProd = new CategoriaProd(row['codigo'], row['categoria']);
      listaCategorias.push(categoriaProd);
    }

    return listaCategorias;
  }
}
