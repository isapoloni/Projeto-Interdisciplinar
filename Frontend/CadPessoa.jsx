import Pagina from "../templates/Pagina";
import FormPessoa from "../formularios/Pessoas";
import TabelaPessoas from "../tabelas/TabelaPessoa"
import listaPessoas from "../dados/mockPessoa";
import { useState } from "react";
import { Container, Alert } from "react-bootstrap";


export default function TelaCadPessoa(props){
  const [exibirTabela, setExibirTabela] = useState(true);
  return(
    <Pagina>
      <Container className="border">
        <Alert variant={"secondary"}>Cadastro de Pessoas</Alert>
      {exibirTabela? <TabelaPessoas listaPessoas={listaPessoas} exibirTabela={setExibirTabela}/>
        :
         <FormPessoa exibirTabela={setExibirTabela}/>
      }
      </Container>
    </Pagina>
  );
}