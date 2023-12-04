import React, { useState, useEffect } from 'react';
import Cookies from "universal-cookie";
import { Form, Button, FormControl, InputGroup, Stack } from 'react-bootstrap';
import { urlBackend } from '../../assets/funcoes';
import { DropdownList } from 'react-widgets';
import { useNavigate } from "react-router-dom";

const FormDoacao = (props) => {
    const cookies = new Cookies();
    const jwtAuth = cookies.get("authorization");

    const [doadorOptions, setDoadorOptions] = useState([]);
    const [produtoOptions, setProdutoOptions] = useState([]);
    const [pessoasData, setPessoasData] = useState([]);
    const [produtosData, setProdutosData] = useState([]);
    const [doacao, setDoacao] = useState({
        doador: null,
        dataDoacao: '',
        listaItens: [],
    });

    useEffect(() => {
        if (props.modoEdicao && props.doacao) {
            setDoacao((prevDoacao) => ({
                ...prevDoacao,
                doador: props.doacao.cpfDoador,
                dataDoacao: formatarDataParaInput(props.doacao.dataDoacao),
                listaItens: props.doacao.listaItens,
            }));

            setDoadorOptions([...doadorOptions, props.doacao.doador]);

            const produtosDaDoacao = props.doacao.listaItens.map((item) => item.produto.nome);
            setProdutoOptions([...produtoOptions, ...produtosDaDoacao]);
        }
    }, [props.modoEdicao, props.doacao]);

    const formatarDataParaInput = (data) => {
        const dataObj = new Date(data);
        return dataObj.toISOString().split('T')[0];
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const pessoasResponse = await fetch(urlBackend + '/pessoas', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': `${jwtAuth}`
                    }
                });

                if (pessoasResponse.ok) {
                    const pessoasData = await pessoasResponse.json();
                    setPessoasData(pessoasData);

                    const nomes = pessoasData.map((pessoa) => pessoa.nome);

                    setDoadorOptions(nomes);
                } else {
                    console.error('Erro ao buscar pessoas:', pessoasResponse.statusText);
                }

                const produtosResponse = await fetch(urlBackend + '/produto', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': `${jwtAuth}`
                    }
                });

                if (produtosResponse.ok) {
                    const produtosData = await produtosResponse.json();
                    setProdutosData(produtosData);

                    const nomesProdutos = produtosData.map((produto) => produto.nome);

                    setProdutoOptions(nomesProdutos);
                } else {
                    console.error('Erro ao buscar produtos:', produtosResponse.statusText);
                }

            } catch (error) {
                console.error('Erro inesperado:', error);
            }
        };

        fetchData();
    }, []);


    const handleDoadorChange = (selectedValue) => {
        const doadorSelecionado = pessoasData.find((pessoa) => pessoa.nome === selectedValue);
        setDoacao({ ...doacao, doador: doadorSelecionado });
    };

    const handleProdutoChange = (index, e) => {
        const produtoSelecionado = produtosData.find((produto) => produto.nome === e.target.value);
        const updatedItens = [...doacao.listaItens];
        updatedItens[index].produto = produtoSelecionado;
        setDoacao({ ...doacao, listaItens: updatedItens });
    };

    const handleDataDoacaoChange = (e) => {
        setDoacao({ ...doacao, dataDoacao: e.target.value });
    };

    const handleQuantidadeChange = (index, e) => {
        const updatedItens = [...doacao.listaItens];
        updatedItens[index].quantidade = e.target.value;
        setDoacao({ ...doacao, listaItens: updatedItens });
    };

    const handleAddItem = () => {
        setDoacao({
            ...doacao,
            listaItens: [...doacao.listaItens, { produto: '', quantidade: 1 }],
        });
    };

    const handleRemoveItem = (index) => {
        const updatedItens = [...doacao.listaItens];
        updatedItens.splice(index, 1);
        setDoacao({ ...doacao, listaItens: updatedItens });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const cpfDoadorSelecionado = doacao.doador ? doacao.doador.cpf.replace(/[.-]/g, '') : '';
            const listaItensFormatada = doacao.listaItens.map((item) => ({
                codigoProduto: item.produto.codigo,
                quantidade: item.quantidade,
            }));

            const requestBody = {
                codigo: props.doacao ? props.doacao.codigo : null,
                dataDoacao: doacao.dataDoacao,
                cpfDoador: cpfDoadorSelecionado,
                listaItens: listaItensFormatada,
            };
            const method = props.modoEdicao ? 'PUT' : 'POST';
            const requestUrl = props.modoEdicao ? `${urlBackend}/doacao` : `${urlBackend}/doacao`;

            const response = await fetch(requestUrl, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `${jwtAuth}`
                },
                body: JSON.stringify(requestBody),
            });

            if (response.ok) {
                setDoacao({
                    doador: null,
                    dataDoacao: '',
                    listaItens: [],
                });
                props.dadosAtualizados();
            } else {
                console.error('Erro ao cadastrar/atualizar doação:', response.statusText);
            }
        } catch (error) {
            console.error('Erro inesperado:', error);
            window.alert('Erro inesperado:', error);
        }
    };

    return (
        <Form
            onSubmit={handleSubmit}
            noValidate
        >
            <Form.Group className="mb-3 mt-4">
                <h3>Registro de prestação de doação</h3>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label className="mb-2">Doador</Form.Label>
                <InputGroup className="mb-3">
                    <DropdownList
                        data={doadorOptions}
                        value={doacao.doador ? doacao.doador.nome : null}
                        onChange={(value) => handleDoadorChange(value)}
                        textField="nome"
                        placeholder="Selecione um doador"
                        caseSensitive={false}
                        filter="contains"
                    />
                </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label className="mb-2">Data da Doação</Form.Label>
                <FormControl
                    type="date"
                    onChange={handleDataDoacaoChange}
                    value={doacao.dataDoacao}
                />
            </Form.Group>

            <Form.Group className="mb-4" >
                <Form.Label className="mb-3">Itens da Doação</Form.Label>
                {doacao.listaItens.map((item, index) => (
                    <div key={index} className="mb-3">
                        <InputGroup className="mb-3">
                            <div className="d-flex">
                                <DropdownList
                                    data={produtoOptions}
                                    value={item.produto ? item.produto.nome : null}
                                    onChange={(value) => handleProdutoChange(index, { target: { value } })}
                                    textField="nome"
                                    placeholder="Selecione um produto"
                                    caseSensitive={false}
                                    filter="contains"
                                />
                                <FormControl
                                    type="number"
                                    min="1"
                                    onChange={(e) => handleQuantidadeChange(index, e)}
                                    value={item.quantidade}
                                    className="ml-3"
                                />
                            </div>
                            <Button variant="danger" onClick={() => handleRemoveItem(index)}>
                                Remover
                            </Button>
                        </InputGroup>
                    </div>
                ))}
                <Button variant="secondary" onClick={handleAddItem} style={{ marginLeft: '10px' }}>
                    Adicionar Item
                </Button>
            </Form.Group>

            <div className="d-flex justify-content-end mt-3 mb-3">
                <Stack className="mt-3 mb-3" direction="horizontal" gap={3} >
                    <Button variant="primary" type="submit">
                        {props.modoEdicao ? "Atualizar" : "Cadastrar"}
                    </Button>
                    <Button
                        variant="danger"
                        type="button"
                        onClick={() => {
                            props.exibirTabela(true);

                        }}
                    >
                        Voltar
                    </Button>
                </Stack>
            </div>
        </Form>
    );
};

export default FormDoacao;
