// Desenvolvido por Francisco Carlos de Souza Junior

import FormPessoa from "../../Components/FormPessoas/Pessoas";
import Header from "../../Components/Header";
import TabelaPessoas from "../../Components/TablePessoas";
import listaPessoas from "../../data/mockPessoa";
import { useState } from "react";
import { Alert, Container } from "react-bootstrap";

export default function TelaCadPessoa() {
  const [exibirTabela, setExibirTabela] = useState(true);
  const [pessoas, setPessoas] = useState(listaPessoas);
  return (
    <>
      <Header />
      <div style={{ margin: "70px", marginTop: "10px" }}>
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
      </div>
    </>
  );
}
