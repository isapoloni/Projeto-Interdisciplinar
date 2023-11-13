import CategoriasServico from "../Modelo/CategoriasServico.js";

export default class CategoriaServicoCtrl {
  consultar(requisicao, resposta) {
    resposta.type("application/json");

    if (requisicao.method === "GET") {
      const catServico = new CategoriasServico();
      catServico
        .consultar("")
        .then((categorias) => {
          resposta.status(200).json(categorias);
        })
        .catch((erro) => {
          resposta.status(500).json({
            status: false,
            mensagem: erro.message,
          });
        });
    } else {
      resposta.status(400).json({
        status: false,
        mensagem: "Método não permitido! Consulte a documentação da API.",
      });
    }
  }

  gravar(requisicao, resposta) {
    resposta.type("application/json");
    if (requisicao.method === "POST" && requisicao.is("application/json")) {
      const dados = requisicao.body;
      const categoria = dados.categoria;
      if (categoria) {
        const catServico = new CategoriasServico(0, categoria);
        catServico
          .gravar()
          .then(() => {
            resposta.status(200).json({
              status: true,
              id: catServico.codigo,
              mensagem: "Categoria gravada com sucesso!",
            });
          })
          .catch((erro) => {
            resposta.status(500).json({
              status: false,
              mensagem: erro.message,
            });
          });
      } else {
        resposta.status(400).json({
          status: false,
          mensagem:
            "Registro inválido! Informe adequadamente todos os dados da categoria conforme a documentação da API.",
        });
      }
    } else {
      resposta.status(400).json({
        status: false,
        mensagem:
          "Método não permitido ou categoria no formato JSON não fornecida! Consulte a documentação da API.",
      });
    }
  }

  atualizar(requisicao, resposta) {
    resposta.type("application/json");

    if (requisicao.method === "PUT" && requisicao.is("application/json")) {
      const dados = requisicao.body;
      const codigo = dados.codigo;
      const categoria = dados.categoria;

      if (codigo && categoria) {
        const catServico = new CategoriasServico(codigo, categoria);
        catServico
          .atualizar()
          .then(() => {
            resposta.status(200).json({
              status: true,
              mensagem: "Categoria atualizada com sucesso!",
            });
          })
          .catch((erro) => {
            resposta.status(500).json({
              status: false,
              mensagem: erro.message,
            });
          });
      } else {
        resposta.status(400).json({
          status: false,
          mensagem:
            "Atualização inválida! Informe adequadamente todos os dados da categoria conforme a documentação da API.",
        });
      }
    } else {
      resposta.status(400).json({
        status: false,
        mensagem:
          "Método não permitido ou categoria no formato JSON não fornecida! Consulte a documentação da API.",
      });
    }
  }

  excluir(requisicao, resposta) {
    resposta.type("application/json");

    if (requisicao.method === "DELETE" && requisicao.is("application/json")) {
      const dados = requisicao.body;
      const codigo = dados.codigo;

      if (codigo) {
        const catServico = new CategoriasServico(codigo);
        catServico
          .remover()
          .then(() => {
            resposta.status(200).json({
              status: true,
              mensagem: "Categoria excluída com sucesso!",
            });
          })
          .catch((erro) => {
            resposta.status(500).json({
              status: false,
              mensagem: erro.message,
            });
          });
      } else {
        resposta.status(400).json({
          status: false,
          mensagem:
            "Exclusão inválida! Informe adequadamente o código da categoria conforme a documentação da API.",
        });
      }
    } else {
      resposta.status(400).json({
        status: false,
        mensagem:
          "Método não permitido ou categoria no formato JSON não fornecida! Consulte a documentação da API.",
      });
    }
  }

  consultarPeloCodigo(requisicao, resposta) {
    resposta.type("application/json");
    const codigo = requisicao.params["codigo"];

    if (requisicao.method === "GET") {
      const catServico = new CategoriasServico();
      catServico
        .consultarCodigo(codigo)
        .then((categorias) => {
          resposta.status(200).json(categorias);
        })
        .catch((erro) => {
          resposta.status(500).json({
            status: false,
            mensagem: erro.message,
          });
        });
    } else {
      resposta.status(400).json({
        status: false,
        mensagem: "Método não permitido! Consulte a documentação da API.",
      });
    }
  }
}
