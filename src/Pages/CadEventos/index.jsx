import { Container } from "react-bootstrap";
import { FormEventos } from "../../Components/FormEventos";
import eventosBD from "../../Data/eventosBD";
import "./styled.css";
import { useState } from "react";
import { TableEvent } from "../../Components/TableEvent";

function CadEventos() {
  const [actionPage, setActionPage] = useState(true);

  const action = () => {
    setActionPage(!actionPage);
  };

  return (
    <>
      <Container>
        {actionPage ? (
          <TableEvent eventosBD={eventosBD} alterPage={action} />
        ) : (
          <FormEventos eventosBD={eventosBD} alterPage={action} />
        )}
      </Container>
    </>
  );
}

export default CadEventos;
