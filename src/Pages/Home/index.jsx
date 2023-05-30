// Desenvolvido pelo grupo

import { Container } from "react-bootstrap";
import "./styled.css";
import Header from "../../Components/Header";

const Home = () => {
  return (
    <>
      <Header />
      <Container id="conteudo">
        <h1>Assembleia de Deus - Ministério Belem / Quatá</h1>
      </Container>
    </>
  );
};

export default Home;
