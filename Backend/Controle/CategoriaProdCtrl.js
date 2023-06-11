import CategoriaProd from "../Modelo/CategoriaProd.js";

export default class CategoriaProdCTRL {
  consultar(requisicao, resposta) {
    resposta.type('application/json');

    if (requisicao.method === 'GET') {
      const categoriaProd = new CategoriaProd();
      categoriaProd.consultar('').then((categorias) => {
        resposta.status(200).json(categorias);
      }).catch((erro) => {
        resposta.status(500).json({
          status: false,
          mensagem: erro.message
        });
      });
    } else {
      resposta.status(400).json({
        status: false,
        mensagem: 'Método não permitido! Consulte a documentação da API.'
      });
    }
  }

  gravar(requisicao, resposta) {
    resposta.type('application/json');
    if (requisicao.method === 'POST' && requisicao.is('application/json')) {
      const dados = requisicao.body;
      const categoria = dados.categoria;
      if (categoria) {

        const categoriaProd = new CategoriaProd(0, categoria);
        categoriaProd.gravar().then(() => {
          resposta.status(200).json({
            status: true,
            id: categoriaProd.codigo,
            mensagem: 'Categoria gravada com sucesso!'
          });
        }).catch((erro) => {
          resposta.status(500).json({
            status: false,
            mensagem: erro.message
          });
        });
      } else {
        resposta.status(400).json({
          status: false,
          mensagem: 'Registro inválido! Informe adequadamente todos os dados da categoria conforme a documentação da API.'
        });
      }
    } else {
      resposta.status(400).json({
        status: false,
        mensagem: 'Método não permitido ou categoria no formato JSON não fornecida! Consulte a documentação da API.'
      });
    }
  }

  atualizar(requisicao, resposta) {
    resposta.type('application/json');

    if (requisicao.method === 'PUT' && requisicao.is('application/json')) {
      const dados = requisicao.body;
      const codigo = dados.codigo;
      const categoria = dados.categoria;

      if (codigo && categoria) {
        const categoriaProd = new CategoriaProd(codigo, categoria);
        categoriaProd.atualizar().then(() => {
          resposta.status(200).json({
            status: true,
            mensagem: 'Categoria atualizada com sucesso!'
          });
        }).catch((erro) => {
          resposta.status(500).json({
            status: false,
            mensagem: erro.message
          });
        });
      } else {
        resposta.status(400).json({
          status: false,
          mensagem: 'Atualização inválida! Informe adequadamente todos os dados da categoria conforme a documentação da API.'
        });
      }
    } else {
      resposta.status(400).json({
        status: false,
        mensagem: 'Método não permitido ou categoria no formato JSON não fornecida! Consulte a documentação da API.'
      });
    }
  }

  excluir(requisicao, resposta) {
    resposta.type('application/json');

    if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
      const dados = requisicao.body;
      const codigo = dados.codigo;

      if (codigo) {
        const categoriaProd = new CategoriaProd(codigo);
        categoriaProd.remover().then(() => {
          resposta.status(200).json({
            status: true,
            mensagem: 'Categoria excluída com sucesso!'
          });
        }).catch((erro) => {
          resposta.status(500).json({
            status: false,
            mensagem: erro.message
          });
        });
      } else {
        resposta.status(400).json({
          status: false,
          mensagem: 'Exclusão inválida! Informe adequadamente o código da categoria conforme a documentação da API.'
        });
      }
    } else {
      resposta.status(400).json({
        status: false,
        mensagem: 'Método não permitido ou categoria no formato JSON não fornecida! Consulte a documentação da API.'
      });
    }
  }

  consultarPeloCodigo(requisicao, resposta) {
    resposta.type('application/json');
    const codigo = requisicao.params['codigo'];

    if (requisicao.method === 'GET') {
      const categoriaProd = new CategoriaProd();
      categoriaProd.consultarCodigo(codigo).then((categorias) => {
        resposta.status(200).json(categorias);
      }).catch((erro) => {
        resposta.status(500).json({
          status: false,
          mensagem: erro.message
        });
      });
    } else {
      resposta.status(400).json({
        status: false,
        mensagem: 'Método não permitido! Consulte a documentação da API.'
      });
    }
  }
}
