import Servico from "../Modelo/Servicos.js";

export default class ServicosCTRL {
  consultar(request, response) {
    response.type("application/json");

    if (request.method === "GET") {
      const servicos = new Servico();
      servicos
        .consultar("")
        .then((servicos) => {
          response.status(200).json(servicos);
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

  gravar(request, response) {
    response.type("application/json");
    if (request.method === "POST" && request.is("application/json")) {
      const data = request.body;

      const servico = data.servico;
      const categoria = data.categoria;
      const descricao = data.descricao;

      if (servico && categoria && descricao) {
        const servicos = new Servico(0, servico, categoria, descricao);
        servicos
          .gravar()
          .then(() => {
            response.status(200).json({
              status: true,
              mensagem: "Serviço salvo com sucesso!",
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

  atualizar(request, response) {
    response.type("application/json");
    if (request.method === "PUT" && request.is("application/json")) {
      const data = request.body;
      const id = data.id;
      const servico = data.servico;
      const categoria = data.categoria;
      const descricao = data.descricao;

      if (id && servico && categoria && descricao) {
        const servicos = new Servico(id, servico, categoria, descricao);
        servicos
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

  excluir(request, response) {
    response.type("application/json");
    if (request.method === "DELETE" && request.is("application/json")) {
      const data = request.body;
      const id = data.id;
      if (id) {
        const servicos = new Servico(id);
        servicos
          .excluir()
          .then(() => {
            response.status(200).json({
              status: true,
              mensagem: "Serviço excluído com sucesso",
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
          mensagem: "Falha ao excluir o serviço",
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
