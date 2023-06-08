import Services from "../Modelo/ServicesPid.js";
import conectar from "./Conexao.js";

export default class ServicesBD {
  //Método para cadastrar um evento.
  async record(service) {
    if (service instanceof Services) {
      const connection = await conectar();
      const sql =
        "INSERT INTO services ( serviceType, workSchedule, estimatedCost, workModel, serviceDescription) VALUES ( ?, ?, ?, ?, ?)";
      const values = [
        service.serviceType,
        service.workSchedule,
        service.estimatedCost,
        service.workModel,
        service.serviceDescription,
      ];
      const result = await connection.query(sql, values);
      return await result[0].insertId;
    }
  }
  // Método para atualizar um evento.
  async update(service) {
    if (service instanceof Services) {
      const connection = await conectar();
      const sql =
        "UPDATE services SET serviceType=?, workSchedule=?, estimatedCost=?, workModel=?, serviceDescription=? WHERE id=?";
      const values = [
        service.serviceType,
        service.workSchedule,
        service.estimatedCost,
        service.workModel,
        service.serviceDescription,
        service.id
      ];
      await connection.query(sql, values);
    }
  }

  //Método para excluir um evento.
  async delete(service) {
    if (service instanceof Services) {
      const connection = await conectar();
      const sql = "DELETE FROM services WHERE id=?";
      const values = [service.id];
      await connection.query(sql, values);
    }
  }
  //Método para consultar eventos.

  async consult(term) {
    const connection = await conectar();
    const sql = "SELECT * FROM services";
    const value = ["%" + term + "%"];
    const [rows] = await connection.query(sql, value);
    const serviceList = [];
    for (const row of rows) {
      const service = new Services(
        row["id"],
        row["serviceType"],
        row["workSchedule"],
        row["estimatedCost"],
        row["workModel"],
        row["serviceDescription"]
      );
      serviceList.push(service);
    }

    return serviceList;
  }

  //Método para consultar um evento pelo ID.

  async consultId(id) {
    const connection = await conectar();
    const sql = "SELECT * FROM services WHERE title = ?";
    const value = [id];
    const [rows] = await connection.query(sql, value);
    const serviceList = [];
    for (const row of rows) {
      const service = new Services(
        row["id"],
        row["serviceType"],
        row["workSchedule"],
        row["estimatedCost"],
        row["workModel"],
        row["serviceDescription"]
      );
      serviceList.push(service);
    }
    return serviceList;
  }
}
