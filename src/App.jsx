import { BrowserRouter, Route, Routes, redirect } from "react-router-dom";
import Home from "./Pages/Home";
import CadPessoa from "./Pages/CadPessoas";
import CadProdutos from "./Pages/CadProdutos";
import Login from "./Pages/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/CadastroProduto" element={<CadProdutos />} />
          <Route path="/CadastroPessoas" element={<CadPessoa />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
