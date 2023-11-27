
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { urlBackend } from "../../assets/funcoes";
import Header from "../../Components/Header";
import ServicoForm from "../../Components/FormServicos/FormServicos";
import TableServico from "../../Components/TableServicos/TabelaServicos";
import Cookies from "universal-cookie";
export default function CadServicos(props) {
  const [exibirTabela, setExibirTabela] = useState(true);
  const [servicos, setServicos] = useState([]);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [cpfPessoas, setCpfPessoas] = useState();
  const [categoria, setCategoria] = useState()
  const cookies = new Cookies();
  const jwtAuth = cookies.get("authorization");
  const [servicoEdicao, setServicoEdicao] = useState({
    id: "",
    servico: "",
    descricao: "",
    categoria: "",
  });

  function prepararTela(servico) {
    setModoEdicao(true);
    setServicoEdicao(servico);
    setExibirTabela(false);
  }

  function deletarServico(servico) {
    fetch(urlBackend + "/servicos", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `${jwtAuth}`,
      },
      body: JSON.stringify(servico),
    }).then((resposta) => {
      window.alert("Serviço excluído com sucesso!!!");
      // window.location.reload();
      return resposta.json();
    });
  }
  function buscarCategoria() {
    fetch(urlBackend + '/catservico', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authorization": `${jwtAuth}`
      }
    }).then((resposta) => {
      return resposta.json()
    }).then((dados) => {
      if (Array.isArray(dados)) {
        setCategoria(dados)
      }
      else {

      }
    });
  }
  // function buscarCpfPessoas() {
  //   fetch(urlBackend + '/pessoas', {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "authorization": `${jwtAuth}`
  //     }
  //   }).then((resposta) => {
  //     return resposta.json()
  //   }).then((dados) => {
  //     if (Array.isArray(dados)) {
  //       setCpfPessoas(dados)
  //     }
  //   });
  // }

  useEffect(() => {
    // buscarCpfPessoas();
    buscar();
    buscarCategoria()

  }, []);
  function buscar() {
    fetch(urlBackend + "/servicos", {
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
          setServicos(dados);
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
          <TableServico
            listaServicos={servicos}
            setServicos={setServicos}
            exibirTabela={setExibirTabela}
            setModoEdicao={setModoEdicao}
            editar={prepararTela}
            deletar={deletarServico}
          />
        ) : (
          <ServicoForm
         
            listaServicos={servicos}
            setServicos={setServicos}
            exibirTabela={setExibirTabela}
            modoEdicao={modoEdicao}
            editar={prepararTela}
            setModoEdicao={setModoEdicao}
            servico={servicoEdicao}
            cpfPessoas={cpfPessoas}
            buscar={buscar}
            categorias={categoria}
          />
        )}
      </Container>
    </>
  );
}
