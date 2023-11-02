import Doacao from "../Modelo/Doacao.js";

export default class DoacaoCTRL {

    consultar(requisicao, resposta) {
        resposta.type('application/json');

        if (requisicao.method === 'GET') {

            const doacao = new Doacao();

            doacao.consultar('').then((doacoes) => {
                resposta.status(200).json(doacoes);

            }).catch((erro) => {
                resposta.status(500).json({
                    status: false,
                    mensagem: erro.message
                });
            });
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: 'Método não permitido! Consulte a documentação da API'
            });
        }
    }

    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            
            const dados = requisicao.body;
            const dataDoacao = dados.dataDoacao;
            const cpfDoador = dados.cpfDoador;
            const listaItens = dados.listaItens;

            if (cpfDoador && dataDoacao  && listaItens) {
           
                const doacao = new Doacao(0, cpfDoador, dataDoacao, listaItens);

                doacao.gravar().then(() => {
                    resposta.status(200).json({
                        status: true,
                        codigo: doacao.codigo,
                        mensagem: 'Doação gravada com sucesso!'
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
                    mensagem: 'Registro inválido! Informe adequadamente todos os dados da doação conforme a documentação da API'
                });
            }
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: 'Método não permitido ou doação no formato JSON não fornecido! Consulte a documentação da API'
            });
        }
        
    }


    atualizar(requisicao, resposta) {
        resposta.type('application/json');

        if (requisicao.method === 'PUT' && requisicao.is('application/json')) {
            
            const dados = requisicao.body;
            const codigo = dados.codigo;
            const cpfDoador = dados.cpfDoador;
            const dataDoacao = dados.dataDoacao;
            const listaItens = dados.listaItens;

            if (codigo && cpfDoador && dataDoacao && listaItens) {

                const doacao = new Doacao(codigo, cpfDoador, dataDoacao, listaItens);

                doacao.atualizar().then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: 'Doação atualizada com sucesso!'
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
                    mensagem: 'Atualização inválida! Informe adequadamente todos os dados da doação conforme a documentação da API'
                });
            }
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: 'Método não permitido ou doação no formato JSON não fornecido! Consulte a documentação da API'
            });
        }
    }

    excluir(requisicao, resposta) {

        resposta.type('application/json');

        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {

            const dados = requisicao.body;
            const codigo = dados.codigo;

            if (codigo) {

                const doacao = new Doacao(codigo);

                doacao.remover().then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: 'Doação excluída com sucesso!'
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
                    mensagem: 'Exclusão inválida! Informe adequadamente o ID da doação conforme a documentação da API.'
                });
            }
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: 'Método não permitido ou doação no formato JSON não fornecido! Consulte a documentação da API'
            });
        }
    }
}
