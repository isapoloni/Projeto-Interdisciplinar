import conectar from "./Conexao.js";
import CategoriasServico from "../Modelo/CategoriasServico.js";

export default class CategoriasServicoBD {
  async incluir(catServico) {
    if (catServico instanceof CategoriasServico) {
      const conexao = await conectar();

      const sql = "INSERT INTO categoria_servico (categoria) VALUES (?)";
      const valores = [catServico.categoria];

      const resultado = await conexao.query(sql, valores);
      return resultado[0].insertId;
    }
  }

  async alterar(catServico) {
    if (catServico instanceof CategoriasServico) {
      const conexao = await conectar();

      const sql = "UPDATE categoria_servico SET categoria = ? WHERE codigo = ?";
      const valores = [catServico.categoria, catServico.codigo];

      await conexao.query(sql, valores);
    }
  }

  async excluir(catServico) {
    if (catServico instanceof CategoriasServico) {
      const conexao = await conectar();

      const sql = "DELETE FROM categoria_servico WHERE codigo = ?";
      const valores = [catServico.codigo];

      await conexao.query(sql, valores);
    }
  }

  async consultar(termo) {
    const conexao = await conectar();

    const sql = "SELECT * FROM categoria_servico WHERE categoria LIKE ?";
    const valores = ["%" + termo + "%"];

    const [rows] = await conexao.query(sql, valores);

    const listaCategorias = [];

    for (const row of rows) {
      const catServico = new CategoriasServico(row["codigo"], row["categoria"]);
      listaCategorias.push(catServico);
    }

    return listaCategorias;
  }

  async consultarCodigo(codigo) {
    const conexao = await conectar();

    const sql = "SELECT * FROM categoria_servico WHERE codigo = ?";
    const valores = [codigo];

    const [rows] = await conexao.query(sql, valores);

    const listaCategorias = [];

    for (const row of rows) {
      const categoria_servico = new CategoriasServico(
        row["codigo"],
        row["categoria"]
      );
      listaCategorias.push(catServico);
    }

    return listaCategorias;
  }
}
