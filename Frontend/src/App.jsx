import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import CadCategoriaProduto from "./Pages/CadCategoriaProduto/TelaCadCategoria";
import TelaCadPessoa from "./Pages/CadPessoas/CadPessoa";
import CadServicos from "./Pages/CadServicos/TelaCadServicos";
import CadHistServicos from "./Pages/CadHistServicos/TelaHistServicos";
//Providers
import {PessoaProvider} from "./context/pessoaContexot"
import CadDoacao from './Pages/Doacao/TelaDoacao'
import CadProdutos from './Pages/CadProdutos/TelaCadProdutos'
import CadCategoriaServico from "./Pages/CadCategoriaServico/TelaCadCategoriaServico";

function App() {
  return (
    <PessoaProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Login />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/CadastroProduto" element={<CadProdutos />} />
          <Route path="/CadastroPessoas" element={<TelaCadPessoa />} />
          <Route path="/CadastroServicos" element={<CadServicos />} />
          <Route path="/CadastroCatProduto" element={<CadCategoriaProduto />} />
          <Route path="/CadastroCatServico" element={<CadCategoriaServico />} />
          <Route path="/HistoricoServicos" element={<CadHistServicos />} />
          <Route path="/Doacoes" element={<CadDoacao/>} />
        </Routes>
      </BrowserRouter>
    </PessoaProvider>

  );
}

export default App;