import React, { useState, useEffect } from 'react';
import Cookies from "universal-cookie";
import { Form, Button, FormControl, InputGroup, Stack } from 'react-bootstrap';
import { urlBackend } from '../../assets/funcoes';
import { DropdownList } from 'react-widgets';
import { useNavigate } from "react-router-dom";
import ConfirmationModal from '../ModalConfirmacao/index';
import ExclusaoSucessoModal from '../ModalSucesso/index'
import ErroModal from '../ModalErro/index';

const FormDoacao = (props) => {
    const cookies = new Cookies();
    const jwtAuth = cookies.get("authorization");

    const [doadorOptions, setDoadorOptions] = useState([]);
    const [produtoOptions, setProdutoOptions] = useState([]);
    const [pessoasData, setPessoasData] = useState([]);
    const [produtosData, setProdutosData] = useState([]);
    const [doacao, setDoacao] = useState(props.modoEdicao ? props.doacao : {
        doador: null,
        dataDoacao: '',
        listaItens: [],
    });
    console.log(doacao)
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [showSucessoModal, setShowSucessoModal] = useState(false);
    const [showErroModal, setShowErroModal] = useState(false);
    const [mensagemErro, setMensagemErro] = useState('');
    const [formValido, setFormValido] = useState(true);
    const [validated, setValidated] = useState(false);
    const [erroDoador, setErroDoador] = useState('');
    const [erroDataDoacao, setErroDataDoacao] = useState('');
    const [erroItens, setErroItens] = useState('');


    const handleOpenErroModal = (mensagem) => {
        setMensagemErro(mensagem);

        // Adicione lógica para identificar qual campo está faltando
        if (!doacao.doador) {
            setErroDoador('Por favor, selecione um doador.');
        } else {
            setErroDoador('');
        }

        if (!doacao.dataDoacao) {
            setErroDataDoacao('Por favor, selecione uma data de doação.');
        } else {
            setErroDataDoacao('');
        }

        if (doacao.listaItens.length === 0 || doacao.listaItens.some(item => !item.produto || !item.quantidade)) {
            setErroItens('Por favor, preencha todos os campos obrigatórios na lista de itens.');
        } else {
            setErroItens('');
        }

        setShowErroModal(true);
    };


    const handleAbrirSucessoModal = () => {
        setShowSucessoModal(true);
    };

    const handleFecharSucessoModal = () => {
        setShowSucessoModal(false);
        props.exibirTabela(true);
    };

    // const handleConfirm = async () => {
    //     setShowConfirmationModal(false);

    //     try {
    //         const cpfDoadorSelecionado = doacao.doador ? doacao.doador.cpf.replace(/[.-]/g, '') : '';
    //         const listaItensFormatada = doacao.listaItens.map((item) => ({
    //             codigoProduto: item.produto.codigo,
    //             quantidade: item.quantidade,
    //         }));

    //         const requestBody = {
    //             codigo: props.doacao ? props.doacao.codigo : null,
    //             dataDoacao: doacao.dataDoacao,
    //             cpfDoador: cpfDoadorSelecionado,
    //             listaItens: listaItensFormatada,
    //         };

    //         const method = props.modoEdicao ? 'PUT' : 'POST';
    //         const requestUrl = props.modoEdicao ? `${urlBackend}/doacao` : `${urlBackend}/doacao`;

    //         const response = await fetch(requestUrl, {
    //             method: method,
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "authorization": `${jwtAuth}`
    //             },
    //             body: JSON.stringify(requestBody),
    //         });

    //         if (response.ok) {
    //             await handleSubmit();
    //             handleAbrirSucessoModal();
    //         } else {
    //             console.error('Erro ao cadastrar/atualizar doação:', response.statusText);
    //         }
    //     } catch (error) {
    //         // console.error('Erro inesperado:', error);
    //     }
    // };

    const handleConfirm = async () => {
        setShowConfirmationModal(false);

        // Limpar mensagens de erro
        setErroDoador('');
        setErroDataDoacao('');
        setErroItens('');

        // Validar campo doador
        if (!doacao.doador || !doacao.doador.nome) {
            setErroDoador('Por favor, selecione um doador.');
        }

        // Validar campo data de doação
        if (!doacao.dataDoacao) {
            setErroDataDoacao('Por favor, selecione uma data de doação.');
        }

        // Verificar se há itens na lista e se todos estão preenchidos corretamente
        if (doacao.listaItens.length === 0 || doacao.listaItens.some(item => !item.produto || !item.quantidade)) {
            setErroItens('Por favor, preencha todos os campos obrigatórios na lista de itens.');
        }

        // Verificar se há algum erro
        const haErro = !!erroDoador || !!erroDataDoacao || !!erroItens;

        if (!haErro) {
            // Restante do código para a confirmação
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
                    await handleSubmit();
                    const mensagemSucesso = props.modoEdicao ? 'Doação atualizada com sucesso!' : 'Doação registrada com sucesso!';
                    window.alert(mensagemSucesso);
                    props.exibirTabela(true);
                    props.setModoEdicao(false)
                } else {
                    console.error('Erro ao cadastrar/atualizar doação:', response.statusText);
                }
            } catch (error) {
                // Tratar erros, se necessário
                console.error('Erro inesperado:', error);
            }
        } else {
            console.log('Input vazio ou com erro');
            handleOpenErroModal('Por favor, preencha todos os campos obrigatórios corretamente.');
        }
    };




    const handleOpenConfirmationModal = () => {
        const confirmacao = window.confirm("Deseja confirmar a ação?");
        if (confirmacao) {
            handleConfirm();
        } else {
            setShowConfirmationModal(false);
        }
    };


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
                // console.error('Erro inesperado:', error);
            }
        };

        fetchData();
    }, []);


    // const handleDoadorChange = (selectedValue) => {
    //     const doadorSelecionado = pessoasData.find((pessoa) => pessoa.nome === selectedValue);
    //     setDoacao({ ...doacao, doador: doadorSelecionado });
    // };

    const handleDoadorChange = (selectedValue) => {
        const doadorSelecionado = pessoasData.find((pessoa) => pessoa.nome === selectedValue);
        setDoacao({ ...doacao, doador: doadorSelecionado });
        setErroDoador(''); // Limpar mensagem de erro
    };


    const handleProdutoChange = (index, e) => {
        const produtoSelecionado = produtosData.find((produto) => produto.nome === e.target.value);
        const updatedItens = [...doacao.listaItens];
        updatedItens[index].produto = produtoSelecionado;
        setDoacao({ ...doacao, listaItens: updatedItens });
    };

    // const handleDataDoacaoChange = (e) => {
    //     setDoacao({ ...doacao, dataDoacao: e.target.value });
    // };

    const handleDataDoacaoChange = (e) => {
        setDoacao({ ...doacao, dataDoacao: e.target.value });
        setErroDataDoacao(''); // Limpar mensagem de erro
    };


    const handleQuantidadeChange = (index, e) => {
        const updatedItens = [...doacao.listaItens];
        updatedItens[index].quantidade = e.target.value;
        setDoacao({ ...doacao, listaItens: updatedItens });
    };

    // const handleAddItem = () => {
    //     setDoacao({
    //         ...doacao,
    //         listaItens: [...doacao.listaItens, { produto: '', quantidade: 1 }],
    //     });
    // };

    const handleAddItem = () => {
        setDoacao({
            ...doacao,
            listaItens: [...doacao.listaItens, { produto: '', quantidade: 1 }],
        });
        setErroItens('');
    };


    const handleRemoveItem = (index) => {
        const updatedItens = [...doacao.listaItens];
        updatedItens.splice(index, 1);
        setDoacao({ ...doacao, listaItens: updatedItens });
    };

    const handleSubmit = async (e) => {
        try {
            if (!doacao.doador || !doacao.dataDoacao || doacao.listaItens.length === 0) {
                handleOpenErroModal('Por favor, preencha todos os campos obrigatórios.');
                setFormValido(false);
                return;
            }

            if (doacao.listaItens.some(item => !item.produto || !item.quantidade)) {
                handleOpenErroModal('Por favor, preencha todos os campos obrigatórios na lista de itens.');
                setFormValido(false);
                return;
            }

            const response = await fetch(/* ... */);

            if (response.ok) {
                setDoacao({
                    doador: null,
                    dataDoacao: '',
                    listaItens: [],
                });
                props.dadosAtualizados();
                props.exibirTabela(true);
                props.setModoEdicao(false)
            } else {
                handleOpenErroModal(`Erro ao cadastrar/atualizar doação: ${response.statusText}`);
            }
        } catch (error) {
        }
    };



    return (
        <Form
            onSubmit={handleSubmit}
            noValidate
        >
            <Form.Group className="mb-3 mt-4">
                <h3>Registro de Doação</h3>
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
                        isInvalid={!!erroDoador}
                    />
                    {erroDoador && (
                        <div className="text-danger">
                            {erroDoador}
                        </div>
                    )}
                </InputGroup>
            </Form.Group>


            <Form.Group className="mb-3">
                <Form.Label className="mb-2">Data da Doação</Form.Label>
                <FormControl
                    type="date"
                    onChange={handleDataDoacaoChange}
                    value={doacao.dataDoacao}
                    isInvalid={!!erroDataDoacao}
                />
                {erroDataDoacao && (
                    <div className="text-danger">
                        {erroDataDoacao}
                    </div>
                )}
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
                                    isInvalid={!formValido && !doacao.dataDoacao}
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
                <Form.Text className="text-danger">
                    {erroItens}
                </Form.Text>
            </Form.Group>

            <div className="d-flex justify-content-end mt-3 mb-3">
                <Stack className="mt-3 mb-3" direction="horizontal" gap={3}>
                    <Button variant="primary" type="button" onClick={handleOpenConfirmationModal} disabled={!formValido}>
                        {props.modoEdicao ? "Atualizar" : "Cadastrar"}
                    </Button>
                    <Button
                        variant="danger"
                        type="button"
                        onClick={() => {
                            props.exibirTabela(true);
                            props.setModoEdicao(false)
                        }}
                    >
                        Voltar
                    </Button>
                </Stack>
            </div>
            <ConfirmationModal
                open={showConfirmationModal}
                onClose={() => setShowConfirmationModal(false)}
                onConfirm={handleConfirm}
                contentText="Deseja confirmar a ação?"
                title="Confirmação"
            />
            <ExclusaoSucessoModal show={showSucessoModal} onClose={handleFecharSucessoModal} tipoSucesso={props.modoEdicao ? 'edicao' : 'cadastro'} />
            <ErroModal show={showErroModal} onClose={() => setShowErroModal(false)} mensagemErro={mensagemErro} />
        </Form>
    );
};

export default FormDoacao;
