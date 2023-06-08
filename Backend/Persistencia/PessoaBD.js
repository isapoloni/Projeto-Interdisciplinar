import Pessoas from "../Modelo/Pessoas.js";
import Conect from "./Conexao.js";

export default class PessoaBD {
  async gravar(pessoas) {
    if (pessoas instanceof Pessoas) {
      const conect = await Conect();
      const sql =
        "INSERT INTO pessoas(cpf,nome,nascimento,endereco,cidade,telefone,email,tipo,disponibilidade,profissao1,profissao2) VALUES (?,?,?,?,?,?,?,?,?,?,?) ";
      const values = [
        pessoas.cpf,
        pessoas.nome,
        pessoas.nascimento,
        pessoas.endereco,
        pessoas.cidade,
        pessoas.telefone,
        pessoas.email,
        pessoas.tipo,
        pessoas.disponibilidade,
        pessoas.profissao1,
        pessoas.profissao2      
      ];
      await conect.query(sql, values);
    }
  }

  async atualizar(pessoas) {
    if (pessoas instanceof Pessoas) {
      const conect = await Conect();
      const sql =
        "UPDATE pessoas SET nome=?,nascimento=?,endereco=?,cidade=?,telefone=?,email=?,tipo=?,disponibilidade=?,profissao1=?,profissao2=? WHERE cpf=?";
      const values = [
        pessoas.nome,
        pessoas.nascimento,
        pessoas.endereco,
        pessoas.cidade,
        pessoas.telefone,
        pessoas.email,
        pessoas.tipo,
        pessoas.disponibilidade,
        pessoas.profissao1,
        pessoas.profissao2, 
        pessoas.cpf
      ];
      await conect.query(sql, values);
    }
  }
  async excluir(pessoas) {
    if (pessoas instanceof Pessoas) {
      const conect = await Conect();
      const sql = "DELETE FROM pessoas WHERE cpf=? ";
      const values = [pessoas.cpf];
      await conect.query(sql, values);
    }
  }
  async consultar(term) {
    const conect = await Conect();
    const sql = "SELECT * FROM pessoas";
    const values = ["%" + term + "%"];
    const [rows] = await conect.query(sql, values);
    const listPessoas = [];
    for (const row of rows) {
      const pessoas = new Pessoas(
        row["cpf"],
        row["nome"],
        row["nascimento"],
        row["endereco"],
        row["cidade"],
        row["telefone"],
        row["email"],
        row["tipo"],
        row["disponibilidade"],
        row["profissao1"],
        row["profissao2"]     
        
        
        
      );
      listPessoas.push(pessoas);
    }
    return listPessoas;
  }
}