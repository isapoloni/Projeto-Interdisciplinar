import Produto from "../Modelo/ProdutoPid.js";

export default class ProdutoCTRL {

    consultar(requiscao, resposta) {
        resposta.type('application/json')

        if (requiscao.method === 'GET') {

            const produto = new Produto();

            produto.consultar('').then((produtos) => {
                resposta.status(200).json(produtos);

            }).catch((erro) => {
                resposta.status(500).json({
                    status: false,
                    mensagem: erro.message
                })
            });
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: 'Método não permitido! Consulte a documentação da API'
            });
        }
    }

    gravar(requiscao, resposta) {
        resposta.type('application/json')
        if (requiscao.method === 'POST' && requiscao.is('application/json')) {

            const dados = requiscao.body;
            const nome = dados.nome;
            const metrica = dados.metrica;
            const descricao = dados.descricao;
            const categoria = dados.codigoCategoria;


            if (nome && metrica && descricao && categoria) {

                const produto = new Produto(0, nome, metrica, descricao, categoria);

                produto.gravar().then(() => {
                    resposta.status(200).json({
                        status: true,
                        id: produto.codigo,
                        mensagem: 'Produto gravado com sucesso!'
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: erro.message
                    })
                });

            } else {
                resposta.status(400).json({
                    status: false,
                    mensagem: 'Registro inválido! informe adequadamente todos os dados do produto conforme a documentação da API'

                });
            }
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: 'Método não permitido ou produto no formato JSON não fornecido! Consulte a documentação da API'

            });
        }
    }


    atualizar(requiscao, resposta) {
        resposta.type('application/json')

        if (requiscao.method === 'PUT' && requiscao.is('application/json')) {
            const dados = requiscao.body;
            console.log(dados)
            const codigo = dados.codigo;
            const nome = dados.nome;
            const metrica = dados.metrica;
            const descricao = dados.descricao;
            const codigoCategoria = dados.codigoCategoria;
            const categoria = dados.categoria;

            if (codigo && nome && metrica && descricao && categoria && codigoCategoria) {

                const produto = new Produto(codigo, nome, metrica, descricao, codigoCategoria, categoria);

                produto.atualizar().then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: 'Produto atualizado com sucesso!'
                    });

                }).catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: erro.message
                    })
                });

            } else {
                resposta.status(400).json({
                    status: false,
                    mensagem: 'Atualização inválida! informe adequadamente todos os dados do produto conforme a documentação da API'

                });
            }
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: 'Método não permitido ou produto no formato JSON não fornecido! Consulte a documentação da API'

            });
        }
    }

    excluir(requiscao, resposta) {

        resposta.type('application/json')

        if (requiscao.method === 'DELETE' && requiscao.is('application/json')) {

            const dados = requiscao.body;
            const codigo = dados.codigo;

            if (codigo) {

                const produto = new Produto(codigo);

                produto.remover().then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: 'Produto excluído com sucesso!'
                    });

                }).catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: erro.message
                    })
                });

            } else {
                resposta.status(400).json({
                    status: false,
                    mensagem: 'Exclusão inválida! informe adequadamente o nome do produto conforme a documentação da API.'

                });
            }
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: 'Método não permitido ou produto no formato JSON não fornecido! Consulte a documentação da API'

            });
        }
    }

    // consultarPeloCodigo(requiscao, resposta) {
    //     resposta.type('application/json')

    //     const codigo = requiscao.params['codigo'];

    //     if (requiscao.method === 'GET') {

    //         const produto = new Produto();

    //         produto.consultarID(codigo).then((produtos) => {
    //             resposta.status(200).json(produtos);

    //         }).catch((erro) => {
    //             resposta.status(500).json({
    //                 status: false,
    //                 mensagem: erro.message
    //             })
    //         });
    //     } else {
    //         resposta.status(400).json({
    //             status: false,
    //             mensagem: 'Método não permitido! Consulte a documentação da API'
    //         });
    //     }
    // }
}