// Desenvolvido por Francisco Carlos de Souza Junior

import FormPessoa from "../../Components/FormPessoas/Pessoas";
import TabelaPessoas from "../../Components/TablePessoas/TabelaPessoa";
import listaPessoas from "../../data/mockPessoa";
import { useState } from "react";
import { Alert, Container } from "react-bootstrap";

export default function TelaCadPessoa() {
  const [exibirTabela, setExibirTabela] = useState(true);
  const [pessoas, setPessoas] = useState(listaPessoas);
  return (
    <>
      <Container>
        {exibirTabela ? (
          <TabelaPessoas
            listaPessoas={pessoas}
            setPessoas={setPessoas}
            exibirTabela={setExibirTabela}
          />
        ) : (
          <FormPessoa
            listaPessoas={pessoas}
            setPessoas={setPessoas}
            exibirTabela={setExibirTabela}
          />
        )}
      </Container>
    </>
  );
}
