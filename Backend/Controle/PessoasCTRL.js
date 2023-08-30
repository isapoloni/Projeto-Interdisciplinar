import Pessoas from "../Modelo/Pessoas.js";

export default class PessoasCTRL {

  consultar(request, response) {
    response.type("application/json");

    if (request.method === "GET") {
      const pessoas = new Pessoas();
      pessoas
        .consultar("")
        .then((pessoas) => {
          response.status(200).json(pessoas);
        })
        .catch((erro) => {
          response.status(500).json({
            status: false,
            message: erro.message,
          });
        });
    } else {
      response.status(400).json({
        status: false,
        mensagem: "Método não permitido, consulte a API",
      });
    }
  }
  // Função para gravar uma nova pessoa
  gravar(request, response) {
    response.type("application/json");
    if (request.method === "POST" && request.is("application/json")) {
      const data = request.body;
      const cpf = data.cpf;      
      const nome = data.nome;
      const nascimento = data.nascimento;
      const endereco = data.endereco;
      const cidade = data.cidade;
      const telefone = data.telefone;
      const email = data.email;
      const tipo = data.tipo;
      const profissao1 = data.profissao1;       
      if (
        cpf &&
        nome &&
        nascimento &&
        endereco &&
        cidade &&
        telefone &&
        email &&
        tipo &&
        profissao1     
            
      ) {
        const pessoa = new Pessoas(
        cpf,
        nome,
        nascimento,
        endereco,
        cidade,
        telefone,
        email,
        tipo,
        profissao1    
        );
        pessoa
          .gravar()
          .then(() => {
            response.status(200).json({
              status: true,
              mensagem: "Pessoa salva com sucesso!",
            });
          })
          .catch((erro) => {
            response.status(500).json({
              status: false,
              mensagem: erro.message,
            });
          });
      } else {
        response.status(400).json({
          status: false,
          mensagem: "Insira todos os dados",
        });
      }
    } else {
      response.status(400).json({
        status: false,
        mensagem: "Método não permitido, consulte a API",
      });
    }
  }

  // Método PUT
  atualizar(request, response) {
    response.type("application/json");
    if (request.method === "PUT" && request.is("application/json")) {
      const data = request.body;
      const cpf = data.cpf;      
      const nome = data.nome;
      const nascimento = data.nascimento;
      const endereco = data.endereco;
      const cidade = data.cidade;
      const telefone = data.telefone;
      const email = data.email;
      const tipo = data.tipo;
      const profissao1 = data.profissao1;  
      if (
        cpf &&
        nome &&
        nascimento &&
        endereco &&
        cidade &&
        telefone &&
        email &&
        tipo &&
        profissao1  
      ) {
        const pessoas = new Pessoas(
        cpf,
        nome,
        nascimento,
        endereco,
        cidade,
        telefone,
        email,
        tipo,
        profissao1  
        );
        pessoas
          .atualizar()
          .then(() => {
            response.status(200).json({
              status: true,
              mensagem: "Atualizado com sucesso!",
            });
          })
          .catch((erro) => {
            response.status(500).json({
              status: false,
              mensagem: erro.message,
            });
          });
      } else {
        response.status(400).json({
          status: false,
          mensagem: "Por favor, preencha com os dados corretos",
        });
      }
    } else {
      response.status(400).json({
        status: false,
        mensagem: "Método não permitido, consulte a API",
      });
    }
  }

  // Método DELETE
  excluir(request, response) {
    response.type("application/json");
    if (request.method === "DELETE" && request.is("application/json")) {
      const data = request.body;
      const cpf = data.cpf;
      if (cpf) {
        const pessoas = new Pessoas(cpf);
        pessoas
          .excluir()
          .then(() => {
            response.status(200).json({
              status: true,
              mensagem: "Pessoa excluída com sucesso",
            });
          })
          .catch((erro) => {
            response.status(500).json({
              status: false,
              message: erro.message,
            });
          });
      } else {
        response.status(400).json({
          status: false,
          mensagem: "Falha ao excluir a pessoa",
        });
      }
    } else {
      response.status(400).json({
        status: false,
        mensagem: "Método não permitido, consulte a API",
      });
    }
  }
}
