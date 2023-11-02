import React, { useState, useEffect } from 'react';
import { Form, Button, FormControl, InputGroup, Stack } from 'react-bootstrap';
import { urlBackend } from '../../assets/funcoes';
import { DropdownList } from 'react-widgets';
import { useNavigate } from "react-router-dom";

const FormDoacao = (props) => {
    const [doadorOptions, setDoadorOptions] = useState([]);
    const [produtoOptions, setProdutoOptions] = useState([]);
    const [pessoasData, setPessoasData] = useState([]);
    const [produtosData, setProdutosData] = useState([]);
    const [doacao, setDoacao] = useState({
        doador: null, // Alterado para armazenar o objeto do doador completo
        dataDoacao: '',
        listaItens: [],
    });

    const navigate = useNavigate();
    const repoName = "Front-EndFullStackII"; 

    // Funções para buscar doadores e produtos 
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Requisição GET para buscar pessoas
                const pessoasResponse = await fetch(urlBackend + '/pessoas', {
                    method: 'GET',
                });

                if (pessoasResponse.ok) {
                    const pessoasData = await pessoasResponse.json();
                    setPessoasData(pessoasData);

                    // Extrai os nomes das pessoas
                    const nomes = pessoasData.map((pessoa) => pessoa.nome);

                    // Atualiza o estado doadorOptions com os nomes
                    setDoadorOptions(nomes);
                } else {
                    console.error('Erro ao buscar pessoas:', pessoasResponse.statusText);
                }

                // Requisição GET para buscar produtos
                const produtosResponse = await fetch(urlBackend + '/produto', {
                    method: 'GET',
                });

                if (produtosResponse.ok) {
                    const produtosData = await produtosResponse.json();
                    setProdutosData(produtosData);

                    // Extrai os nomes dos produtos
                    const nomesProdutos = produtosData.map((produto) => produto.nome);

                    // Atualiza o estado produtoOptions com os nomes dos produtos
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

    // console.log('doadorOptions', doadorOptions)
    console.log('produtoOptions', produtoOptions)

    const handleDoadorChange = (selectedValue) => {
        // Encontra o objeto do doador correspondente ao nome selecionado
        const doadorSelecionado = pessoasData.find((pessoa) => pessoa.nome === selectedValue);

        // Atualiza o estado doacao com o doador selecionado
        setDoacao({ ...doacao, doador: doadorSelecionado });
    };

    const handleProdutoChange = (index, e) => {
        // Encontra o objeto do produto correspondente ao nome selecionado
        const produtoSelecionado = produtosData.find((produto) => produto.nome === e.target.value);

        // Atualiza a lista de itens no estado da doação com o produto selecionado
        const updatedItens = [...doacao.listaItens];
        updatedItens[index].produto = produtoSelecionado;
        setDoacao({ ...doacao, listaItens: updatedItens });
    };

    const handleDataDoacaoChange = (e) => {
        // Atualiza a data de doação no estado da doação
        setDoacao({ ...doacao, dataDoacao: e.target.value });
    };


    const handleQuantidadeChange = (index, e) => {
        // Atualiza a quantidade no estado da doação
        const updatedItens = [...doacao.listaItens];
        updatedItens[index].quantidade = e.target.value;
        setDoacao({ ...doacao, listaItens: updatedItens });
    };

    const handleAddItem = () => {
        // Adiciona um novo item à lista de itens
        setDoacao({
            ...doacao,
            listaItens: [...doacao.listaItens, { produto: '', quantidade: 1 }],
        });
    };

    const handleRemoveItem = (index) => {
        // Remove o item correspondente ao índice da lista
        const updatedItens = [...doacao.listaItens];
        updatedItens.splice(index, 1);
        setDoacao({ ...doacao, listaItens: updatedItens });
    };

    const handleNavigation = () => {
        // Navega para a rota desejada
        navigate(`/${repoName}/Doacao`);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Encontrar o CPF do doador selecionado
            const cpfDoadorSelecionado = doacao.doador ? doacao.doador.cpf.replace(/[.-]/g, '') : '';

            // Formatar a lista de itens conforme o novo formato
            const listaItensFormatada = doacao.listaItens.map((item) => ({
                codigoProduto: item.produto.codigo,
                quantidade: item.quantidade,
            }));

            // Criar o corpo da requisição
            const requestBody = {
                dataDoacao: doacao.dataDoacao,
                cpfDoador: cpfDoadorSelecionado,
                listaItens: listaItensFormatada,
            };

            // Enviar a requisição POST
            const response = await fetch(urlBackend + '/doacao', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (response.ok) {
                window.alert('Doação enviada com sucesso!');
                console.log('Doação enviada com sucesso! body:', JSON.stringify(requestBody));
            
                // Limpa o formulário após o envio bem-sucedido
                setDoacao({
                    doador: null,
                    dataDoacao: '',
                    listaItens: [],
                });
                props.dadosAtualizados()
            } else {
                window.alert('Erro ao enviar a doação.');
                console.error('Erro ao enviar a doação.', JSON.stringify(requestBody));
            }
        } catch (error) {
            console.error('Erro inesperado:', error);
            window.alert('Erro inesperado:', error, JSON.stringify(requestBody));
        }
    };

    return (
        <Form onSubmit={handleSubmit}>

            {/* <Form.Group className="mb-3">
                <Form.Label>Doador</Form.Label>
                <InputGroup className="mb-3">
                    <DropdownList
                        data={doadorOptions}
                        value={doacao.doador ? doacao.doador.nome : ''}
                        onChange={handleDoadorChange}
                        placeholder="Selecione um doador"
                    />
                </InputGroup>
            </Form.Group> */}

            <Form.Group className="mb-3">
                <Form.Label>Doador</Form.Label>
                <InputGroup className="mb-3">
                    <DropdownList
                        data={doadorOptions}
                        value={doacao.doador ? doacao.doador.nome : null}
                        onChange={(value) => handleDoadorChange(value)}
                        textField="nome" // Certifique-se de substituir 'nome' pelo campo correto que contém o nome do doador
                        placeholder="Selecione um doador"
                        caseSensitive={false} // Ignora a sensibilidade de maiúsculas/minúsculas na pesquisa
                        filter="contains" // Usa a pesquisa "contains" em vez de "startsWith"
                    />
                </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Data da Doação</Form.Label>
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
                <Stack className="mt-3 mb-3" direction="horizontal" gap={3}>
                    <Button
                        variant="primary"
                        type="submit"
                        onSubmit={handleSubmit}
                        className="ml-3">
                        Enviar Doação
                    </Button>
                    <Button
                        variant="danger"
                        type="button"
                        onClick={() => props.exibirTabela(true)}>
                        Voltar
                    </Button>
                </Stack>
            </div>

            
        </Form>
    );
};

export default FormDoacao;
