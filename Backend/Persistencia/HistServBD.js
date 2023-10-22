import HistServModel from "../Modelo/HistServModel.js";
import Conect from "./Conexao.js";

export default class HistServBD {
  async gravarBD(histServ) {
    if (histServ instanceof HistServModel) {
      const conect = await Conect();
      const sql =
        "INSERT INTO tbhistserv (prestador, servico, serviceData, valor) VALUES (?,?,?,?) ";
      const values = [
        histServ.prestador,
        histServ.servico,
        histServ.serviceData,
        histServ.valor,
      ];
      const resultado = await conect.query(sql, values);
      return await resultado[0].insertId;
    }
  }

  async atualizar(histServ) {
    if (histServ instanceof HistServModel) {
      const conect = await Conect();
      const sql =
        "UPDATE tbhistserv SET servico=?, prestador=?, serviceData=?, valor=? WHERE id=?";
      const values = [
        histServ.prestador,
        histServ.servico,
        histServ.serviceData,
        histServ.valor,
        histServ.id,
      ];
      await conect.query(sql, values);
    }
  }

  async excluir(histServ) {
    if (histServ instanceof HistServModel) {
      const conect = await Conect();
      const sql = "DELETE FROM tbhistserv WHERE id=?";
      const values = [histServ.id];
      await conect.query(sql, values);
    }
  }

  async consultar(term) {
    const conect = await Conect();
    const sql =
      "SELECT h.id, s.servico AS servico, c.nome AS prestador, h.serviceData, h.valor FROM tbhistserv h INNER JOIN Pessoas c ON h.prestador = c.cpf INNER JOIN Servico s ON h.servico = s.id";
    // const sql = "select * from TbHistServ like ?";

    const values = ["%" + term + "%"];
    const [rows] = await conect.query(sql, values);
    const listServicos = [];
    for (const row of rows) {
      const histServ = new HistServModel(
        row["id"],
        row["servico"],
        row["prestador"],
        row["serviceData"],
        row["valor"]
      );
      listServicos.push(histServ);
    }
    return listServicos;
  }
}
