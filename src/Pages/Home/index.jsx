import { Container } from "react-bootstrap";
import Header from "../../Components/Header";
import "./styled.css";

const Home = () => {
  return (
    <>
      <Header />
      <Container id="conteudo">
        <h1>Bora Codar</h1>
      </Container>
    </>
  );
};

export default Home;
