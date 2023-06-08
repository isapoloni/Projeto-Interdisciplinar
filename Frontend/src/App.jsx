import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import CadProdutos from "./Pages/CadProdutos/TelaCadProdutos";
import TelaCadPessoa from "./Pages/CadPessoas/CadPessoa";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/CadastroProduto" element={<CadProdutos />} />
          <Route path="/CadastroPessoas" element={<TelaCadPessoa />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
