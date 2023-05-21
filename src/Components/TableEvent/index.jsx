import { Button, Table } from "react-bootstrap";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

export const TableEvent = (props) => {
  return (
    <>
      <div style={{ margin: "30px" }}>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <td>Ações</td>
              <td>Titlulo</td>
              <td>Hora</td>
              <td>Data Inicial</td>
              <td>Data Final</td>
              <td>Descrição</td>
            </tr>
          </thead>
          <tbody>
            {props.eventosBD?.map((evento) => {
              return (
                <tr key={evento.titulo}>
                  <td
                    style={{
                      display: "Flex",
                      justifyContent: "space-around",
                    }}
                  >
                    <a>
                      <FaEdit />
                    </a>
                    <a>
                      <FaTrashAlt />
                    </a>
                  </td>
                  <td>{evento.titulo}</td>
                  <td>{evento.hora}</td>
                  <td>{evento.dataInicial}</td>
                  <td>{evento.dataFinal}</td>
                  <td>{evento.descricao}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <hr />
        <div style={{ margin: "30px" }}>
          <Button onClick={props.alterPage} variant="primary" size="lg">
            Cadastrar
          </Button>
        </div>
      </div>
    </>
  );
};
