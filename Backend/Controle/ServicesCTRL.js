import Services from "../Modelo/ServicesPid.js";


export default class ServicesCtrl {
  // Método para cadastrar um evento
  record(request, response) {
    response.type("application/json");

    if (request.method === "POST" && request.is("application/json")) {
      const data = request.body;
      const serviceType = data.serviceType;
      const workSchedule = data.workSchedule;
      const estimatedCost = data.estimatedCost;
      const workModel = data.workModel;
      const serviceDescription = data.serviceDescription;

      if (serviceType && workSchedule && estimatedCost && workModel && serviceDescription) {
        // Grava um evento no Banco de Dados
        const services = new Services(
          0,
          serviceType,
          workSchedule,
          estimatedCost,
          workModel,
          serviceDescription
        );
        services
          .record()
          .then(() => {
            response.status(200).json({
              status: true,
              serviceType: services.id,
              message: "Evento cadastrado com sucesso.",
            });
          })
          .catch((error) => {
            response.status(500).json({
              status: false,
              message: error.message,
            });
          });
      } else {
        response.status(400).json({
          status: false,
          message:
            "Por favor, informe corretamente todos os dados do evento conforme a API.",
        });
      }
    } else {
      response.status(400).json({
        status: false,
        message:
          "Método não permitido ou evento em JSON não informado. Consulte a API.",
      });
    }
  }

  // Método para atualizar um evento
  update(request, response) {
    response.type("application/json");

    if (request.method === "PUT" && request.is("application/json")) {
      const data = request.body;
      const id = data.id;
      const serviceType = data.serviceType;
      const workSchedule = data.workSchedule;
      const estimatedCost = data.estimatedCost;
      const workModel = data.workModel;
      const serviceDescription = data.serviceDescription;

      if (id && serviceType && workSchedule && estimatedCost && workModel && serviceDescription) {
        // Atualizar um evento no Banco de Dados
        const services = new Services(
          id,
          serviceType,
          workSchedule,
          estimatedCost,
          workModel,
          serviceDescription
        );
        services
          .update()
          .then(() => {
            response.status(200).json({
              status: true,
              message: "Evento atualizado com sucesso.",
            });
          })
          .catch((error) => {
            response.status(500).json({
              status: false,
              message: error.message,
            });
          });
      } else {
        response.status(400).json({
          status: false,
          message:
            "Por favor, informe corretamente todos os dados do evento conforme a API.",
        });
      }
    } else {
      response.status(400).json({
        status: false,
        message:
          "Método não permitido ou evento em JSON não informado. Consulte a API.",
      });
    }
  }

  // Método para excluir um evento
  delete(request, response) {
    response.type("application/json");

    if (request.method === "DELETE" && request.is("application/json")) {
      const data = request.body;
      const id = data.id;

      if (id) {
        // Deletar um evento no Banco de Dados
        const services = new Services(id);
        services
          .delete()
          .then(() => {
            response.status(200).json({
              status: true,
              message: "Evento excluído com sucesso.",
            });
          })
          .catch((error) => {
            response.status(500).json({
              status: false,
              message: error.message,
            });
          });
      } else {
        response.status(400).json({
          status: false,
          message: "Por favor, informe o ID do evento conforme a API.",
        });
      }
    } else {
      response.status(400).json({
        status: false,
        message:
          "Método não permitido ou evento em JSON não informado. Consulte a API.",
      });
    }
  }

  // Método para consultar todos os eventos
  consult(request, response) {
    response.type("application/json");

    if (request.method === "GET") {
      // Consulta eventos no Banco de Dados
      const services = new Services();
      services
        .consult("")
        .then((services) => {
          response.status(200).json(services);
        })
        .catch((error) => {
          response.status(500).json({
            status: false,
            message: error.message,
          });
        });
    } else {
      response.status(400).json({
        status: false,
        message:
          "Método não permitido. Consulte a API para obter a lista de eventos.",
      });
    }
  }

  // Método para consultar um evento pelo título
  consultId(request, response) {
    response.type("application/json");
    const id = request.params["id"];

    if (request.method === "GET") {
      // Consulta um evento no Banco de Dados
      const services = new Services();
      services
        .consultTitle(id)
        .then((services) => {
          response.status(200).json(services);
        })
        .catch((error) => {
          response.status(500).json({
            status: false,
            message: error.message,
          });
        });
    } else {
      response.status(400).json({
        status: false,
        message:
          "Método não permitido. Consulte a API para obter detalhes de um evento específico.",
      });
    }
  }
}