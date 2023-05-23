import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import CadProdutos from "./Pages/CadProdutos/TelaCadProdutos";
import CadPessoa from "./Pages/CadPessoas/CadPessoa"
import Header from "./Components/Header/index"


function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/CadastroProduto" element={<CadProdutos />}/>
          <Route path="/CadastroPessoas" element={<CadPessoa />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
