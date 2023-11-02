// Desenvolvido por Isabela Poloni

import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { urlBackend } from "../../assets/funcoes";
import Header from "../../Components/Header";
import Cookies from "universal-cookie";
import TableHistServico from "../../Components/TableHistServicos/TabelaHistServicos";
import HistServicoForm from "../../Components/FormHistServicos/FormHistServicos";
export default function CadHistServicos(props) {
  const [exibirTabela, setExibirTabela] = useState(true);
  const [histServ, setHistServ] = useState([]);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [cpfPessoas, setCpfPessoas] = useState();
  const [servico, setServico] = useState();
  const cookies = new Cookies();
  const jwtAuth = cookies.get("authorization");
  const [servicoEdicao, setServicoEdicao] = useState({
    id: "",
    prestador: "",
    servico: "",
    serviceData: "",
    valor: "",
  });

  function prepararTela(histServ) {
    setModoEdicao(true);
    setServicoEdicao(histServ);
    setExibirTabela(false);
  }

  function deletarServico(histServ) {
    fetch(urlBackend + "/histServ", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `${jwtAuth}`,
      },
      body: JSON.stringify(histServ),
    }).then((resposta) => {
      window.alert("Serviço excluído com sucesso!!!");
      window.location.reload();
      return resposta.json();
    });
  }
  function buscarServicos() {
    fetch(urlBackend + '/servicos', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authorization": `${jwtAuth}`
      }
    }).then((resposta) => {
      return resposta.json()
    }).then((dados) => {
      if (Array.isArray(dados)) {
        setServico(dados)
      }
    });
  }
  function buscarCpfPessoas() {
    fetch(urlBackend + '/pessoas', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authorization": `${jwtAuth}`
      }
    }).then((resposta) => {
      return resposta.json()
    }).then((dados) => {
      if (Array.isArray(dados)) {
        setCpfPessoas(dados)
      }
    });
  }

  useEffect(() => {
    buscarCpfPessoas();
    buscarServicos();
    buscar();
  }, []);
  function buscar() {
    fetch(urlBackend + "/histServ", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `${jwtAuth}`,
      },
    })
      .then((resposta) => {
        return resposta.json();
      })
      .then((dados) => {
        if (Array.isArray(dados)) {
          setHistServ(dados);
        } else {
          // Tratar erro caso necessário
        }
      });
  }

  return (
    <>
      <Header />
      <Container>
        {exibirTabela ? (
           <TableHistServico
           listaHistoricoDeServicos={histServ}
           setHistServicos={setHistServ}
           exibirTabela={setExibirTabela}
           editar={prepararTela}
           deletar={deletarServico}
         />
        ) : (
          <HistServicoForm
            listaServicos={histServ}
            setServicos={setHistServ}
            exibirTabela={setExibirTabela}
            modoEdicao={modoEdicao}
            editar={prepararTela}
            setModoEdicao={setModoEdicao}
            servico={servicoEdicao}
            cpfPessoas={cpfPessoas}
            servicos={servico}
            buscar={buscar}
          />
        )}
      </Container>
    </>
  );
}
