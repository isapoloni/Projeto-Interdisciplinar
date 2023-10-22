import HistServModel from "../Modelo/HistServModel.js";
import Conect from "./Conexao.js";

export default class HistServBD {
  async gravar(histServ) {
    if (histServ instanceof HistServModel) {
      const conect = await Conect();
      const sql =
        "INSERT INTO TbHistServ (prestador, servico, serviceData, valor) VALUES (?,?,?,?) ";
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
        "UPDATE TbHistServ SET servico=?, prestador=?, serviceData=?, valor=? WHERE id=?";
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
      const sql = "DELETE FROM TbHistServ WHERE id=?";
      const values = [histServ.id];
      await conect.query(sql, values);
    }
  }

  async consultar(term) {
    const conect = await Conect();
    const sql =
      "SELECT h.id, s.servico AS servico, c.nome AS prestador, h.jornada, h.serviceData, h.valor FROM TbHistServ h INNER JOIN Pessoas c ON h.prestador = c.cpf INNER JOIN Servico s ON h.servico = s.id";
    // const sql = "select * from TbHistServ like ?";

    const values = ["%" + term + "%"];
    const [rows] = await conect.query(sql, values);
    const listServicos = [];
    for (const row of rows) {
      const histServ = new HistServModel(
        row["id"],
        row["prestador"],
        row["servico"],
        row["serviceData"],
        row["valor"]
      );
      listServicos.push(histServ);
    }
    return listServicos;
  }
}
