import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import CadProdutos from "./Pages/CadProdutos/TelaCadProdutos";
import CadPessoa from "./Pages/CadPessoas/CadPessoa";
import Header from "./Components/Header/index";
import Login from "./Pages/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/CadastroProduto" element={<CadProdutos />} />
          <Route path="/CadastroPessoas" element={<CadPessoa />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
