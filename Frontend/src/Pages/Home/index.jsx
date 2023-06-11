// Desenvolvido pelo grupo

import { Container, Stack } from "react-bootstrap";
import "./styled.css";
import Header from "../../Components/Header";
import CarouselComponent from "../../Components/Carousel";

const Home = () => {
  return (
    <>
      <Header />
      <Container id="conteudo">
        <Stack className="text-center">
          <h1 className="h1Conteudo">
            Assembleia de Deus - Ministério Belem / Quatá
          </h1>
          <CarouselComponent />
        </Stack>
      </Container>
    </>
  );
};

export default Home;
