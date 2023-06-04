import React, { useState } from "react";
import { Form, Button, Col, Row, Stack } from "react-bootstrap";
import { urlBackend } from "../../assets/funcoes";

function FormPessoa(props) {
  const [validated, setValidated] = useState(false);
  const [pessoa, setPessoa] =useState(props.pessoa);
  
  function manipularMudanca(e){
    const elemForm = e.currentTarget;
    const id = elemForm.id;
    const valor = elemForm.value;
    setPessoa({...pessoa, [id]:valor});
  }

  function handleSubmit(event) {
    const form = event.currentTarget;
    console.log('entrei aqui')
    if (form.checkValidity()) {
      if(!props.modoEdicao){
        fetch(urlBackend+"/pessoas",{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify(pessoa)
        }).then((resposta)=>{
            return resposta.json();
        }).then((dados)=>{    
            if(dados.status){
              props.setModoEdicao(false);
              let novaLista =props.listaPessoas;
              novaLista.push(pessoa);              
              props.setPessoas(novaLista);
              props.exibirTabela(true);
            }      
            window.alert(dados.mensagem);          
        }).catch((erro)=>{
          window.alert("Erro ao executar a requisição :"+ erro.message);
        })
      }
      else{
        fetch(urlBackend + "/pessoas",{
          method: "PUT",
          headers: {"Content-Type":"application/json"},
          body: JSON.stringify(pessoa)
        }).then((resposta) =>{
                    
          window.location.reload();
          return resposta.json()
          
      })
        
      }
      
      
      setValidated(false);


    } else {
      setValidated(true);
    }
    event.preventDefault();
  }
  
  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <h3>Cadastro de Pessoas</h3>
        </Form.Group>
        <Row>
          <Form.Group>
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite o nome da pessoa"
              required
              value={pessoa.nome}
              id="nome"
              onChange={manipularMudanca}
            />
          </Form.Group>
          <Form.Control.Feedback type="invalid">
            Por favor, informe o nome da pessoa!
          </Form.Control.Feedback>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>CPF</Form.Label>
              <Form.Control
                type="text"
                placeholder="111.111.111-11"
                required
                value={pessoa.cpf}
                id="cpf"
                onChange={manipularMudanca}
              />
            </Form.Group>
            <Form.Control.Feedback type="invalid">
              Por favor, informe um cpf válido!
            </Form.Control.Feedback>
          </Col>

          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Data de Nascimento</Form.Label>
              <Form.Control
                type="date"
                placeholder="ex: 11/11/1111"
                required
                value={pessoa.nascimento}
                id="nascimento"
                onChange={manipularMudanca}
              />
            </Form.Group>
            <Form.Control.Feedback type="invalid">
              Por favor informe uma data de nasciemento
            </Form.Control.Feedback>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Endereço</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o endereço completo (Rua/av , número , complemento)"
                required
                value={pessoa.endereco}
                id="endereco"
                onChange={manipularMudanca}
              />
            </Form.Group>
            <Form.Control.Feedback type="invalid">
              Por favor, informe um endereço!
            </Form.Control.Feedback>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Cidade</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite a cidade"
                required
                value={pessoa.cidade}
                id="cidade"
                onChange={manipularMudanca}
              />
            </Form.Group>
            <Form.Control.Feedback type="invalid">
              Por favor, informe uma cidade!
            </Form.Control.Feedback>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Telefone</Form.Label>
              <Form.Control
                type="text"
                placeholder="ex:(11)11111-1111"
                required
                value={pessoa.telefone}
                id="telefone"
                onChange={manipularMudanca}
              />
            </Form.Group>
            <Form.Control.Feedback type="invalid">
              Por favor, informe um telefone
            </Form.Control.Feedback>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>E-Mail</Form.Label>
              <Form.Control
                type="email"
                placeholder="Insira seu e-mail"
                value={pessoa.email}
                id="email"
                onChange={manipularMudanca}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
        <Col>
          <Form.Group  className="mb-5">
            <Form.Label>Tipo de Pessoa</Form.Label>
            <Form.Select aria-label="Tipo de pessoa" value={pessoa.tipo} 
            id="tipo"
            onChange={manipularMudanca}>
              <option>Escolha uma das opções </option>
              <option value="Doador">Doador</option>
              <option value="Prestador">Prestador</option>
              <option value="Recebedor">Recebedor</option>
              <option value="Contratante">Contratante</option>
            </Form.Select>
            
          </Form.Group>
          <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
        </Col>
          {/* <Col>
            <Form.Group className="mb-3" id="tipo">
              <Form.Label>Tipo de Pessoa</Form.Label>   
              
                <Form.Check
                  inline
                  required
                  type="checkbox"
                  label="Doador"
                  name="doador"
                  value={pessoa.tipo}
                id="tipo"
                  
                  onChange={
                    manipularMudanca
                  }
                />
                <Form.Check
                  inline
                  type="checkbox"
                  label="Prestador"
                  name="prestador"
                  
                  onChange={
                    manipularMudanca
                  }
                />
                <Form.Check
                  inline
                  type="checkbox"
                  label="Recebedor"
                  name="recebedor"
                  
                  onChange={
                    manipularMudanca
                  }
                />
                <Form.Check
                  inline
                  type="checkbox"
                  label="Contratante"
                  name="contratante"
                  
                  onChange={
                    manipularMudanca
                 }
                />
                
            </Form.Group>
            {* <Form.Control.Feedback type="invalid"></Form.Control.Feedback> *}
          </Col> */}
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Disponibilidade</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite a disponibilidade de horário caso a pessoa seja um prestador"
                value={pessoa.disponibilidade}
                id="disponibilidade"
                onChange={manipularMudanca}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Profissão Primária</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite a profissão/área de atuação principal"
                value={pessoa.profissao1}
                id="profissao1"
                onChange={manipularMudanca}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Profissão Secundária</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite a profissão/área de interesse ou atuação secundária"
                value={pessoa.profissao2}
                id="profissao2"
                onChange={manipularMudanca}
              />
            </Form.Group>
          </Col>
        </Row>

        <Stack className="mt-3 mb-3" direction="horizontal" gap={3}>
          <Button variant="primary" type="submit" className="mb-3">
          {props.modoEdicao? "Atualizar" :"Cadastrar"}
          </Button>

          <Button
            variant="danger"
            type="button"
            className="mb-3"
            onClick={() => {
              props.exibirTabela(true);
            }}
          >
            Voltar
          </Button>
        </Stack>
      </Form>
    </>
  );
}

export default FormPessoa;
