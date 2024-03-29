import HistServModel from "../Modelo/HistServModel.js";

export default class HistServControl {
  consultar(request, response) {
    response.type("application/json");

    if (request.method === "GET") {
      const histServModels = new HistServModel();
      histServModels
        .consultar("")
        .then((histServModels) => {
          response.status(200).json(histServModels);
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

  gravarC(request, response) {
    console.log("Requisição recebida"); // Mensagem de depuração
    response.type("application/json");
    if (request.method === "POST" && request.is("application/json")) {
      console.log("Requisição é um POST e é JSON"); // Mensagem de depuração
      const data = request.body;
      const prestador = data.prestador;
      const servico = data.servico;
      const serviceData = data.serviceData;
      const valor = data.valor;

      if (prestador && servico && serviceData && valor) {
        console.log("Todos os campos estão preenchidos"); // Mensagem de depuração
        const histServModels = new HistServModel(
          0,
          prestador,
          servico,
          serviceData,
          valor
        );
        histServModels
          .gravarM()
          .then(() => {
            console.log("Registro salvo com sucesso"); // Mensagem de depuração
            response.status(200).json({
              status: true,
              mensagem: "Serviço salvo com sucesso!",
            });
          })
          .catch((erro) => {
            console.log("Erro ao salvar o registro:", erro); // Mensagem de depuração
            response.status(500).json({
              status: false,
              mensagem: erro.message,
            });
          });
      } else {
        console.log("Campos obrigatórios não preenchidos"); // Mensagem de depuração
        response.status(400).json({
          status: false,
          mensagem: "Insira todos os dados",
        });
      }
    } else {
      console.log("Método não permitido, consulte a API"); // Mensagem de depuração
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
      const prestador = data.prestador;
      const servico = data.servico;
      const serviceData = data.serviceData;
      const valor = data.valor;

      if (id && prestador && servico && serviceData && valor) {
        const histServModels = new HistServModel(
          id,
          prestador,
          servico,
          serviceData,
          valor
        );
        histServModels
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
        const histServModels = new HistServModel(id);
        histServModels
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
