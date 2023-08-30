import Servico from "../Modelo/Servicos.js";
import Conect from "./Conexao.js";

export default class ServicoBD {
  async gravar(servico) {
    if (servico instanceof Servico) {
      const conect = await Conect();
      const sql =
        "INSERT INTO servicos(servico,jornada,descricao,custo,modelo) VALUES (?,?,?,?,?) ";
      const values = [
        servico.servico,
        servico.jornada,
        servico.descricao,
        servico.custo,
        servico.modelo
      ];
      const resultado = await conexao.query(sql, values);
      return resultado[0].insertId;
    }
  }

  
  async atualizar(servico) {
    if (servico instanceof Servico) {
      const conect = await Conect();
      const sql =
        "UPDATE servicos SET servico=?,jornada=?,descricao=?,custo=?,modelo=? WHERE id=?";
      const values = [
        servico.servico,
        servico.jornada,
        servico.descricao,
        servico.custo,
        servico.modelo,
        servico.id
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
    const sql = "SELECT * FROM servicos";
    const values = ["%" + term + "%"];
    const [rows] = await conect.query(sql, values);
    const listServicos = [];
    for (const row of rows) {
      const servico = new Servico(
        row["id"],
        row["servico"],
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
