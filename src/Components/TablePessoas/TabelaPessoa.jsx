import { useState } from "react";
import { Button, Container, FormControl, InputGroup, Table } from "react-bootstrap";
import { RiSearchLine } from "react-icons/ri"
import { HiTrash } from "react-icons/hi"

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
    <Button variant="primary" size="lg" className='mb-4' onClick={()=>{
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



  <Table striped bordered hover size="sm" className="mt-5">
    <thead>
      <tr class="text-center">
        <th class="text-center">Nome</th>
        <th class="text-center">CPF</th>
        <th class="text-center">Data de Nascimento</th>
        <th class="text-center">Endereço</th>
        <th class="text-center">Cidade</th>
        <th class="text-center">Telefone</th>
        <th class="text-center">Tipo</th>
        <th class="text-center">Disponibilidade</th>
        <th class="text-center">Profissão Primária</th>
        <th class="text-center">Profissão Secundária</th>    
        <th class="text-center">Ações</th>    
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
                      {/* <Button></Button>{''} */}
                      <Button onClick={()=>{
                        if (window.confirm("Confirma a exclusão da Pessoa?")){
                        excluirPessoa(pessoa.nome);}
                      }}><HiTrash /></Button>
                    </td>
                  </tr>
        })
      }
    </tbody>
  </Table>
  </Container>
  );
}