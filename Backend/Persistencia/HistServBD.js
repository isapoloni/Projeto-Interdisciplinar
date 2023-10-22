import HistServModel from "../Modelo/HistServModel.js";
import Conect from "./Conexao.js";

export default class HistServBD {
  async gravarBD(histServ) {
    if (histServ instanceof HistServModel) {
      console.log("Passou na verificação HistServModel"); // Mensagem de depuração
      const conect = await Conect();
      console.log("Conexão com o banco de dados estabelecida"); // Mensagem de depuração
      const sql =
        "insert into `tbhistserv` (prestador, servico, serviceData, valor) VALUES (?,?,?,?)";
      const values = [
        histServ.prestador,
        histServ.servico,
        histServ.serviceData,
        histServ.valor,
      ];
      console.log("Valores a serem inseridos:", values); // Mensagem de depuração
      const resultado = await conect.query(sql, values);
      console.log("Consulta SQL executada com sucesso"); // Mensagem de depuração
      return await resultado[0].insertId;
    }
  }

  async atualizar(histServ) {
    if (histServ instanceof HistServModel) {
      const conect = await Conect();
      const sql =
        "UPDATE tbhistserv SET prestador=?, servico=?, serviceData=?, valor=? WHERE id=?";
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
      "SELECT h.id, s.servico AS servico, c.nome AS prestador, h.serviceData, h.valor FROM tbhistserv h INNER JOIN pessoas c ON h.prestador = c.cpf INNER JOIN servicos s ON h.servico = s.id";
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
