import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import CadProdutos from "./Pages/CadProdutos/TelaCadProdutos";
import CadPessoa from "./Pages/CadPessoas/CadPessoa"
import Header from "./Components/Header/index"
import CadEventos from "./Pages/CadEventos";


function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/CadastroProduto" element={<CadProdutos />}/>
          <Route path="/CadastroPessoas" element={<CadPessoa />}/>
          <Route path="/Eventos" element={<CadEventos />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
