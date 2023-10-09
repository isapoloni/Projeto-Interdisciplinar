import Pessoas from "../Modelo/Pessoas.js";
import Servico from "../Modelo/Servicos.js";
import Conect from "./Conexao.js";

export default class ServicoBD {
  async gravar(servico) {
    if (servico instanceof Servico) {
      const conect = await Conect();
      const sql =
        "INSERT INTO servicos (servico, cpfPessoa, jornada, descricao, custo, modelo) VALUES (?,?,?,?,?,?) ";
      const values = [
        servico.servico,
        servico.cpfPessoa,
        servico.jornada,
        servico.descricao,
        servico.custo,
        servico.modelo,
      ];
      const resultado = await conect.query(sql, values);
      return resultado[0].insertId;
    }
  }

  async atualizar(servico) {
    if (servico instanceof Servico) {
      const conect = await Conect();
      const sql =
        "UPDATE servicos SET servico=?, cpfPessoa=?, jornada=?, descricao=?, custo=?, modelo=? WHERE id=?";
      const values = [
        servico.servico,
        servico.cpfPessoa,
        servico.jornada,
        servico.descricao,
        servico.custo,
        servico.modelo,
        servico.id,
      ];
      await conect.query(sql, values);
    }
  }

  async excluir(servico) {
    if (servico instanceof Servico) {
      const conect = await Conect();
      const sql = "DELETE FROM servicos WHERE id=?";
      const values = [servico.id];
      await conect.query(sql, values);
    }
  }

  async consultar(term) {
    const conect = await Conect();
    const sql =
      "SELECT s.id, s.servico, c.nome AS cpfPessoa, s.jornada, s.descricao, s.custo, s.modelo FROM Servicos s INNER JOIN Pessoas c ON s.cpfPessoa = c.cpf";
    const values = ["%" + term + "%"];
    const [rows] = await conect.query(sql, values);
    const listServicos = [];
    for (const row of rows) {
      // const pessoas = new Pessoas(
      //   row["cpf"],
      //   row["nome"],
      //   row["nascimento"],
      //   row["endereco"],
      //   row["cidade"],
      //   row["telefone"],
      //   row["email"],
      //   row["tipo"],
      //   row["profissao1"]
      // );
      const servico = new Servico(
        row["id"],
        row["servico"],
        // pessoas,
        row["cpfPessoa"],
        row["jornada"],
        row["descricao"],
        row["custo"],
        row["modelo"]
      );
      listServicos.push(servico);
    }
    return listServicos;
  }
}
