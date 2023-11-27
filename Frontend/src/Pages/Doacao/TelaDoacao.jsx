// Desenvolvido por Isabela Poloni

import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { urlBackend } from "../../assets/funcoes";
import Header from "../../Components/Header";
import FormDoacao from "../../Components/FormDoacao";
import TableDoacao from "../../Components/TableDoacao";
import Cookies from "universal-cookie";

export default function TelaDoacao(props) {

    const cookies = new Cookies();
    const jwtAuth = cookies.get("authorization");
    const [exibirTabela, setExibirTabela] = useState(true)
    const [doacoes, setDoacoes] = useState([])
    const [modoEdicao, setModoEdicao] = useState(false)
    const [doacaoEdicao, setDoacaoEdicao] = useState({
        doador: '',
        dataDoacao: '',
        listaItens: [],
    })


    function prepararTela(doacao) {
        setModoEdicao(true);
        setDoacaoEdicao(doacao);
        setExibirTabela(false)
    }

    useEffect(() => {
        buscarDoacao()
    }, []);

    function buscarDoacao() {
        fetch(urlBackend + '/doacao', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": `${jwtAuth}`
            }
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
                            modoEdicao={modoEdicao}
                            editar={prepararTela}
                            setModoEdicao={setModoEdicao}
                            doacao={doacaoEdicao}
                        // buscarProduto={buscarProduto}
                        // categorias={categoria}
                        />

                }
            </Container>
        </>
    );

}
