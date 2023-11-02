// Desenvolvido por Isabela Poloni

import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { urlBackend } from "../../assets/funcoes";
import Header from "../../Components/Header";
import FormDoacao from "../../Components/FormDoacao";
import TableDoacao from "../../Components/TableDoacao";

export default function TelaDoacao(props) {

    const [exibirTabela, setExibirTabela] = useState(true)
    const [produtos, setProdutos] = useState([])
    const [modoEdicao, setModoEdicao] = useState(false)
    const [produtoEdicao, setProdutoEdicao] = useState({
        codigo: "",
        nome: "",
        metrica: "",
        descricao: "",
        codigoCategoria: ""
    })
    const [categoria, setCategoria] = useState()

    const [doacoes, setDoacoes] = useState([])


    function prepararTela(produto) {
        setModoEdicao(true);
        setProdutoEdicao(produto);
        setExibirTabela(false)
    }

    useEffect(() => {
        buscarDoacao()
    }, []);

    function buscarDoacao() {
        fetch(urlBackend + '/doacao', {
            method: "GET"
        }).then((resposta) => {
            return resposta.json();
        }).then((dados) => {
            if (Array.isArray(dados)) {
                setDoacoes(dados);
            } else {
            }
        });
    }

    function exibirTabelaEAtualizarDados() {
        setExibirTabela(true);
        buscarDoacao();
    }
    

    return (
        <>
            <Header />
            <Container>
                {
                    exibirTabela ?
                        <TableDoacao
                            listaProdutos={produtos}
                            listaDoacoes={doacoes}
                            setDoacoes={setDoacoes}
                            exibirTabela={setExibirTabela}
                            editar={prepararTela}
                            // deletar={deletarProduto}
                        />
                        :
                        <FormDoacao
                            // listaProdutos={produtos}
                            // setProdutos={setProdutos}
                            exibirTabela={setExibirTabela}
                            dadosAtualizados={exibirTabelaEAtualizarDados}
                            // modoEdicao={modoEdicao}
                            // editar={prepararTela}
                            // setModoEdicao={setModoEdicao}
                            // produto={produtoEdicao}
                            // buscarProduto={buscarProduto}
                            // categorias={categoria}
                        />

                }
            </Container>
        </>
    );

}
