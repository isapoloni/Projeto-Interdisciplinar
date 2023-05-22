import { Container } from "react-bootstrap";
import { FormEventos } from "../../Components/FormEventos";
import eventosBD from "../../Data/eventosBD";
import "./styled.css";
import { useState } from "react";
import { TableEvent } from "../../Components/TableEvent";

function CadEventos() {
  const [listEvents, setListEvents] = useState(eventosBD);
  const [actionPage, setActionPage] = useState(true);

  const action = () => {
    setActionPage(!actionPage);
  };

  return (
    <>
      <Container>
        {actionPage ? (
          <TableEvent
            eventosBD={listEvents}
            setListEvents={setListEvents}
            alterPage={action}
          />
        ) : (
          <FormEventos
            eventosBD={listEvents}
            setListEvents={setListEvents}
            alterPage={action}
          />
        )}
      </Container>
    </>
  );
}

export default CadEventos;
