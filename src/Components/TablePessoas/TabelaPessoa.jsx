import { useState } from "react";
import { Button, Container, FormControl, InputGroup, Table } from "react-bootstrap";
import { RiSearchLine } from "react-icons/ri"

export default function TabelaPessoas(props){
    const [pessoas, setPessoas] = useState(props.listaPessoas);

    function excluirPessoa(nome){
    const listaAtualizada = props.listaPessoas.filter((pessoa)=> pessoa.nome !== nome );
    props.setPessoas(listaAtualizada);
    setPessoas(listaAtualizada);
  }
    function filtrarPessoas(e){
      const termoBusca = e.currentTarget.value;
      const resultadoBusca = props.listaPessoas.filter((pessoa)=> pessoa.nome.toLowerCase().includes(termoBusca.toLowerCase()))
      setPessoas(resultadoBusca);
    }

  return(
    <Container>
    <Button onClick={()=>{
      props.exibirTabela(false);
    }}>
      Novo Cadastro
    </Button>
    <InputGroup className="mt-2">
      <FormControl
        type="text"
        id="termobusca"
        placeholder="Buscar"
        onChange={filtrarPessoas}
      />    
      <InputGroup.Text>
        <RiSearchLine/>
      </InputGroup.Text>
    </InputGroup>



  <Table striped bordered hover>
    <thead>
      <tr>
        <th>Nome</th>
        <th>CPF</th>
        <th>Data de Nascimento</th>
        <th>Endereço</th>
        <th>Cidade</th>
        <th>Telefone</th>
        <th>Tipo</th>
        <th>Disponibilidade</th>
        <th>Profissão Primária</th>
        <th>Profissão Secundária</th>    
        

      </tr>
    </thead>
    <tbody>
      {
        pessoas?.map((pessoa)=>{
          return <tr key={pessoa.nome}>
                    <td>{pessoa.nome}</td>              
                    <td>{pessoa.cpf}</td>
                    <td>{pessoa.nascimento}</td>
                    <td>{pessoa.endereco}</td>
                    <td>{pessoa.cidade}</td>
                    <td>{pessoa.telefone}</td>
                    <td>{pessoa.tipo}</td>
                    <td>{pessoa.disponibilidade}</td>
                    <td>{pessoa.profissao1}</td>
                    <td>{pessoa.profissao2}</td>
                    <td>
                      <Button></Button>{''}
                      <Button onClick={()=>{
                        if (window.confirm("Confirma a exclusão da Pessoa?")){
                        excluirPessoa(pessoa.nome);}
                      }}></Button>{''}
                    </td>
                  </tr>
        })
      }
    </tbody>
  </Table>
  </Container>
  );
}