//Desenvolvido pelo Grupo

import Container from "react-bootstrap/Container";
import { Nav, Navbar } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link, NavLink } from "react-router-dom";
import "./styled.css";
import Logo from "../../assets/logo-igreja.png";

export default function Header() {
  return (
    <>
      {[false].map((expand) => (
        <Navbar
          key={expand}
          bg="dark"
          variant="dark"
          expand={expand}
          className="mb-3 p-3"
        >
          <Container fluid>
            <Navbar.Brand>
              <Link
                style={{
                  textDecoration: "none",
                  color: "white",
                  cursor: "default",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "10px",
                  }}
                >
                  <img src={Logo} alt="" width={65} height={75} />
                  <h1
                    style={{
                      marginLeft: "15px",
                      fontSize: "45px",
                    }}
                  >
                    GIFSyS
                  </h1>
                </div>
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  <h2>Menu</h2>
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav
                    className="justify-content-end flex-grow-1 pe-3"
                    id="sidebar"
                  >
                    <NavLink id="navlink" to="/Home">
                      Home
                    </NavLink>
                    <hr />
                    <NavLink id="navlink" to="/CadastroProduto">
                      Cadastro Produto
                    </NavLink>
                    <hr />
                    <NavLink id="navlink" to="/CadastroPessoas">
                      Cadastro Pessoas
                    </NavLink>
                    <hr />
                    <NavLink id="navlink" to="/CadastroServicos">
                      Cadastro Servicos
                    </NavLink>
                    <hr />
                    <NavLink id="navlink" to="/CadastroCategoria">
                      Cadastro Categoria
                    </NavLink>
                    <hr />
                  </Nav>
                </Navbar.Collapse>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}
