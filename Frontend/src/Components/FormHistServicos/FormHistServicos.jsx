import { useEffect, useState } from "react";
import { Form, Button, Col, Row, Stack, InputGroup } from "react-bootstrap";
import { urlBackend } from "../../assets/funcoes";
import { IMaskInput } from "react-imask";
import Cookies from "universal-cookie";
import { DropdownList } from "react-widgets/cjs";
export default function HistServicoForm(props) {
  // console.log(props)
  const [validated, setValidated] = useState(false);
  const [servico, setServico] = useState(props.servico);
  const [servicoSelecionado,setServicoSelecionado] = useState({
    prestador:'',
    servico:'',
    serviceData:"",
    valor:""
  })
  const [validation, setValidation] = useState({
    prestador: false,
    servico: false,
    serviceData: false,
    valor: false,
  })
  const [submissao,setSubmissao] = useState(false)
  const cookies = new Cookies();
  const jwtAuth = cookies.get("authorization");
  const haErro = !validation.prestador || !validation.servico || !validation.serviceData || !validation.valor
  // const [cpfSelecionado, setCpfSelecionado] = useState('');
  // console.log('cpf' , cpfSelecionado)
  // console.log("props", props);
  // console.log("modoEdicao", props.modoEdicao);
  // //new Date(servico.serviceData).toISOString().split("T")[0]
  // console.log("serv", servico);
  function mascaraMoeda(event) {
    const onlyDigits = event.target.value
      .split("")
      .filter((s) => /\d/.test(s))
      .join("")
      .padStart(3, "0");
    const digitsFloat = onlyDigits.slice(0, -2) + "." + onlyDigits.slice(-2);
    event.target.value = maskCurrency(digitsFloat);
  }
  function maskCurrency(valor, locale = "pt-BR", currency = "BRL") {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
    }).format(valor);
  }

  function manipularOnChange(e) {
    const elementForm = e.currentTarget;
    const id = elementForm.id;
    const valor = elementForm.value;
    setServico({ ...servico, [id]: valor });
  }
  useEffect(() => {
    if(props.modoEdicao){
      setValidation({
        prestador: true,
        servico: true,
        serviceData: true,
        valor: true
      })
    }
  },[props.modoEdicao])
  function manipulaSubmissao(evento) {
    const form = evento.currentTarget;
    setSubmissao(true)
    if (form.checkValidity() && !haErro ) {
      if (!props.modoEdicao) {
        fetch(urlBackend + "/histServ", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `${jwtAuth}`,
          },
          body: JSON.stringify({
            id: servico.id,
            prestador: servico.prestador.cpf,
            servico: servico.servico.id,
            serviceData: servico.serviceData,
            valor: servico.valor
          }),
        })
          .then((resposta) => {
            return resposta.json();
          })
          .then((dados) => {
            if (dados.status) {
              let novaLista = props.listaServicos;
              novaLista.push(servico);
              props.setServicos(novaLista);
              props.buscar();
              props.setModoEdicao(false);
              props.exibirTabela(true);
            }
            window.alert(dados.mensagem);
          })
          .catch((erro) => {
            window.alert("Erro ao executar a requisição: " + erro.message);
          });
      } else {
        if(window.confirm('Deseja confirmar a ação')){
          fetch(urlBackend + "/histServ", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              authorization: `${jwtAuth}`,
            },
            body: JSON.stringify({
              id: servico.id,
              prestador: servico.prestador.cpf ? servico.prestador.cpf: props.cpfPessoas.filter(pessoaSelecionada => pessoaSelecionada.nome === servico.prestador)[0].cpf,
              servico: servico.servico.id ? servico.servico.id : props.servicos.filter(servicoSelecionado => servicoSelecionado.servico === servico.servico)[0].id,
              // prestador: servico.prestador.cpf,
              // servico: servico.servico.id,
              serviceData: servico.serviceData,
              valor: servico.valor
  
            }),
          }).then((resposta) => {
            // window.location.reload();
            
            return resposta.json();
          }).then((dados) => {
            window.alert(dados.mensagem);
            props.setModoEdicao(false);
            props.exibirTabela(true);
          })
        }
      }
      setValidated(false);
    } else {
      window.alert("Preencha todos os campos corretamente");
      setValidated(true);
    }
    evento.preventDefault();
    evento.stopPropagation();
  }
//   const handlePrestadorChange = (selectedValue) => {
//     const prestadorSelecionado = prestadorData.find((prestador) => prestador.nome === selectedValue);
//     setServico({ ...servico, prestador: prestadorSelecionado });
// };

// const handleServicoChange = (index, e) => {
//   console.log(servico)
//   console.log(index.id)
//     const servicoSelecionado = servico.find((servico) => servico.id === index.id);
//     console.log(servicoSelecionado)
//     const updatedItens = [...servico.servico];
//     updatedItens[index].servico = servicoSelecionado;
//     setServicoSelecionado({ ...servico, servico: updatedItens });
// };

  return (
    <>
      <Form
        noValidate
        validated={validated}
        onSubmit={manipulaSubmissao}
        variant="light"
      >
        <Form.Group className="mb-5 mt-4">
          <h3>Registro de prestação de serviço</h3>
        </Form.Group>

        <Row>
          <Col>
             <Form.Group className="mb-3">
                <Form.Label className="mb-2">Prestador</Form.Label>
                <InputGroup className="mb-3">
                    <DropdownList
                        data={props.cpfPessoas}
                        value={servico.prestador ? servico.prestador : null}
                        onChange={(value) => {
                          setServico({ ...servico, 
                            prestador: value })
                            if(servico.prestador !== null){
                              setValidation({ ...validation, prestador: true })
                            }
                        }}
                        className={!validation.prestador && submissao ? 'pintarDeVermelho' : 'pintarDeCinza'}
                        textField="nome"
                        id="prestador"
                        placeholder="Selecione um prestador"
                        caseSensitive={false}
                        filter="contains"
                        required
                    />
                      {!validation.prestador && submissao && (
                  <div >Por favor, informe o nome do prestador!</div>
                )}
                </InputGroup>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group className="mb-3">
                <Form.Label className="mb-2">Serviço</Form.Label>
                <InputGroup className="mb-3">
                    <DropdownList
                        data={props.servicos}
                        value={servico.servico ? servico.servico : null}
                        onChange={(value) => {
                          setServico({ ...servico, 
                            servico: value })
                            if(servico.servico !== null ){
                              setValidation({ ...validation, servico: true })
                            }
                        }}
                        className={!validation.servico && submissao ? 'pintarDeVermelho' : 'pintarDeCinza'}
                        id="servico"
                        textField="servico"
                        placeholder="Selecione um serviço"
                        caseSensitive={false}
                        filter="contains"
                        required
                    />
                
                {!validation.servico && submissao && (
                  <div >Por favor, informe o nome do serviço!</div>
                )}
                </InputGroup>
            
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Data</Form.Label>
              <Form.Control
                value={!props.modoEdicao ? servico.serviceData : new Date(servico.serviceData).toISOString().split("T")[0]}
                id="serviceData"
                type="date"
                placeholder="Insira a data"
                onChange={(e)=>{
                  manipularOnChange(e)
                  if(servico.serviceData !== null){
                    setValidation({ ...validation, serviceData: true })
                  }
                }}
                style={!validation.serviceData && submissao ? {borderColor: 'red'} : {borderColor: '#ccc'}}
                // className={!validation.serviceData && submissao ? 'pintarDeVermelho2' : 'pintarDeCinza2'}
                required
              />
              {!validation.serviceData && submissao && (
                  <div >Por favor, informe a data do serviço!</div>
                )}
              {/* <Form.Control.Feedback type="invalid">
                Por favor, informe a data!
              </Form.Control.Feedback> */}
            </Form.Group>
          </Col>
          <Col className="mb-3">
            <Form.Group>
              <Form.Label>Valor </Form.Label>
              <Form.Control
                value={servico.valor}
                type="text"
                placeholder="Insira o valor"
                id="valor"
                onInput={mascaraMoeda}
                onChange={(e)=>{
                  manipularOnChange(e)
                  if(servico.valor !== null){
                    setValidation({ ...validation, valor: true })
                  }
                }}
                style={!validation.valor && submissao ? {borderColor: 'red'} : {borderColor: '#ccc'}}
                // className={!validation.valor && submissao ? 'pintarDeVermelho2' : 'pintarDeCinza2'}
                required
              />
              {!validation.valor && submissao && (
                  <div >Por favor, informe o valor do serviço!</div>
                )}
              {/* <Form.Control.Feedback type="invalid">
                Por favor, informe o valor!
              </Form.Control.Feedback> */}
            </Form.Group>
          </Col>


        </Row>

        <Stack className="mt-3 mb-3" direction="horizontal" gap={3}>
          <Button variant="primary" type="submit">
            {props.modoEdicao ? "Atualizar" : "Cadastrar"}
          </Button>
          <Button
            variant="danger"
            type="button"
            onClick={() => {
              props.exibirTabela(true);
              props.setModoEdicao(false);
            }}
          >
            Voltar
          </Button>
        </Stack>
      </Form>
    </>
  );
}
