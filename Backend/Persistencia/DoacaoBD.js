import Doacao from "../Modelo/Doacao.js";
import Conect from "./Conexao.js";
import Produto from "../Modelo/Produto.js";
import CategoriaProd from "../Modelo/CategoriaProd.js";
import Pessoas from "../Modelo/Pessoas.js";

export default class DoacaoBD {

    async gravar(doacao) {
        if (doacao instanceof Doacao) {
            const conexao = await Conect();
            try {
                // console.log('doacao', doacao)
                await conexao.beginTransaction();
                const sql = "INSERT INTO doacao(data_doacao, cpf_doador) VALUES (?,?)";
                const valores = [doacao.dataDoacao, doacao.cpfDoador];
                console.log('valores', valores)
                const resultado = await conexao.query(sql, valores);
                doacao.codigo = resultado[0].insertId;

                for (const item of doacao.listaItens) {
                    const sql2 = "INSERT INTO doacao_produto(codigo_produto, codigo_doacao, quantidade) VALUES (?,?,?)";
                    const parametros = [item.codigoProduto, doacao.codigo, item.quantidade];
                    // console.log('parametros', parametros)
                    await conexao.query(sql2, parametros);
                }

                await conexao.commit();
            } catch (e) {
                await conexao.rollback();
                throw e;
            } finally {
                // conexao.release();
            }
        }
    }


    async consultar() {
        const listaDoacoes = [];
        const conexao = await Conect();

        try {
            const sql = "SELECT * FROM doacao as d \
                  INNER JOIN pessoas as p ON p.cpf = d.cpf_doador \
                  ORDER BY d.data_doacao";

            const [doacoes] = await conexao.query(sql);

            for (const rows of doacoes) {
                const pessoa = new Pessoas(rows["cpf"], rows["nome"], rows["endereco"], rows["telefone"]);
                const doacao = new Doacao(rows["codigo"], pessoa, rows["data_doacao"], []);

                const sqlitens = "SELECT pr.*, dp.*, cp.codigo AS codigoCategoria, cp.categoria FROM doacao_produto as dp \
                          INNER JOIN produto as pr ON dp.codigo_produto = pr.codigo \
                          INNER JOIN categoriaProduto as cp ON pr.categoria = cp.codigo \
                          WHERE dp.codigo_doacao = ?";

                const parametros = [doacao.codigo];
                const [itensDoacao] = await conexao.query(sqlitens, parametros);
                const listaItens = [];

                for (const item of itensDoacao) {
                    const categoria = new CategoriaProd(item["codigoCategoria"], item["categoria"]);
                    const produto = new Produto(item["codigo_produto"], item["nome"], item["metrica"], item["descricao"], categoria.codigo, categoria.categoria);

                    listaItens.push({ produto, quantidade: item["quantidade"] });
                }

                doacao.listaItens = listaItens;
                listaDoacoes.push(doacao);
            }

            return listaDoacoes;
        } finally {
            // conexao.release();
        }
    }

    async consultarCodigo(codigo) {
        const listaDoacoes = [];
        const conexao = await Conect();

        try {
            const sql = "SELECT * FROM doacao as d \
                  INNER JOIN pessoas as p ON p.cpf = d.cpf_doador \
                  WHERE d.codigo = ? \
                  ORDER BY d.data_doacao";

            const parametros = [codigo];
            const [doacoes] = await conexao.query(sql, parametros);

            for (const rows of doacoes) {
                const pessoa = new Pessoas(rows["cpf"], rows["nome"], rows["endereco"], rows["telefone"]);
                const doacao = new Doacao(rows["codigo"], rows["data_doacao"], pessoa, []);

                const sqlitens = "SELECT * FROM doacao_produto as dp \
                          INNER JOIN produto as pr ON dp.codigo_produto = pr.codigo \
                          INNER JOIN categoriaProduto as cp ON pr.categoria = cp.codigo \
                          WHERE dp.codigo_doacao = ?";

                const parametros = [doacao.codigo];
                const [itensDoacao] = await conexao.query(sqlitens, parametros);
                const listaItens = [];

                for (const item of itensDoacao) {
                    const categoria = new CategoriaProd(item["codigo_categoria"], item["categoria"]);
                    const produto = new Produto(item["codigo_produto"], item["nome"], item["metrica"], item["descricao"], categoria);
                    listaItens.push({ produto, quantidade: item["quantidade"] });
                }

                doacao.listaItens = listaItens;
                listaDoacoes.push(doacao);
            }

            return listaDoacoes;
        } finally {
            // conexao.release();
        }
    }

    async excluir(codigo) {
        const conexao = await Conect();
    
        try {
            await conexao.beginTransaction();
    
            // Exclui os itens relacionados à doação
            const sqlExcluirItens = "DELETE FROM doacao_produto WHERE codigo_doacao = ?";
            const parametrosExcluirItens = [codigo];
            await conexao.query(sqlExcluirItens, parametrosExcluirItens);
    
            // Exclui a doação
            const sqlExcluirDoacao = "DELETE FROM doacao WHERE codigo = ?";
            const parametrosExcluirDoacao = [codigo];
            await conexao.query(sqlExcluirDoacao, parametrosExcluirDoacao);
    
            await conexao.commit();
        } catch (e) {
            await conexao.rollback();
            throw e;
        } finally {
            // conexao.end();
        }
    }
    

    
}
