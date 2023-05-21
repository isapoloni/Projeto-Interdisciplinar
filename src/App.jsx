import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import CadProdutos from "./Pages/CadProdutos";
import Header from "./Components/Header/Header/index"

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/CadastroProduto" element={<CadProdutos />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
