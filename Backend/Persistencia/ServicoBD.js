import Servico from "../Modelo/Servicos.js";
import Conectar from "./Conexao.js";

export default class ServicoBD {
  // async gravar(servico) {
  //   if (servico instanceof Servico) {
  //     try {
  //       const { data, error } = await Conectar.from("servicos") // Substitua 'servicos' pelo nome da sua tabela
  //         .upsert([servico]); // Utilize upsert para inserir ou atualizar dados

  //       return data[0];
  //     } catch (error) {
  //       console.error("Erro interno do servidor:", error);
  //       return null;
  //     }
  //   }
  // }

  // async atualizar(servico) {
  //   if (servico instanceof Servico) {
  //     try {
  //       const { data, error } = await Conectar.from("servicos") // Substitua 'servicos' pelo nome da sua tabela
  //         .upsert([servico]); // Utilize upsert para atualizar dados

  //       if (error) {
  //         console.error("Erro ao atualizar dados:", error);
  //       } else {
  //         console.log("Dados atualizados com sucesso:", data);
  //       }
  //     } catch (error) {
  //       console.error("Erro interno do servidor:", error);
  //     }
  //   }
  // }

  // async excluir(servico) {
  //   if (servico instanceof Servico) {
  //     try {
  //       const { data, error } = await Conectar.from("servicos") // Substitua 'servicos' pelo nome da sua tabela
  //         .delete()
  //         .eq("id", servico.id);

  //       if (error) {
  //         console.error("Erro ao excluir dados:", error);
  //       } else {
  //         console.log("Dados excluídos com sucesso:", data);
  //       }
  //     } catch (error) {
  //       console.error("Erro interno do servidor:", error);
  //     }
  //   }
  // }

  // async consultar(term) {
  //   try {
  //     const { data, error } = await Conectar.from("servicos") // Substitua 'servicos' pelo nome da sua tabela
  //       .select("*")
  //       .ilike("servico", `%${term}%`); // Realiza a consulta com o termo

  //     if (error) {
  //       console.error("Erro ao consultar dados:", error);
  //       return [];
  //     }

  //     return data;
  //   } catch (error) {
  //     console.error("Erro interno do servidor:", error);
  //     return [];
  //   }
  // }

  async gravar(servico) {
    const conect = await Conectar();
    const sql =
      "INSERT INTO servicos (servico, jornada, descricao, custo, modelo) VALUES (?,?,?,?,?) ";
    const values = [
      servico.servico,
      servico.jornada,
      servico.descricao,
      servico.custo,
      servico.modelo,
    ];
    const resultado = await conect.query(sql, values);
    return await resultado[0].insertId;
  }


  async atualizar(servico) {
    if (servico instanceof Servico) {
      const conect = await Conectar();
      const sql =
        "UPDATE servicos SET servico=?, jornada=?, descricao=?, custo=?, modelo=? WHERE id=?";
      const values = [
        servico.servico,
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
      const conect = await Conectar();
      const sql = "DELETE FROM servicos WHERE id=?";
      const values = [servico.id];
      await conect.query(sql, values);
    }
  }

  async consultar(term) {
    const conect = await Conectar();
    // const sql = "SELECT s.id, s.servico, c.nome AS cpfPessoa, s.jornada, s.descricao, s.custo, s.modelo FROM Servicos s INNER JOIN Pessoas c ON s.cpfPessoa = c.cpf";
    const sql = "select * from servicos";

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
