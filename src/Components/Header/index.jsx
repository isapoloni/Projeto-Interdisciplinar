import Container from "react-bootstrap/Container";
import { Nav, Navbar } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link, NavLink } from "react-router-dom";
import "./styled.css";

function Header() {
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
                }}
              >
                <h3>Titulo</h3>
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
                    <NavLink id="navlink" to="/">
                      Home
                    </NavLink>
                    <hr />
                    <NavLink id="navlink" to="#">
                      Nav 1
                    </NavLink>
                    <hr />
                    <NavLink id="navlink" to="/CadastroProduto">
                      Cadastro Produto 
                    </NavLink>
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

export default Header;
