//Desenvolvido pelo Grupo

import Container from "react-bootstrap/Container";
import { Nav, Navbar } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link, NavLink } from "react-router-dom";
import "./styled.css";
import Logo from "../../assets/logo-igreja.png";
import { useState } from "react";

export default function Header() {
  const [expanded, setExpanded] = useState(false);	
  function handleExpandClick() {
    setExpanded(!expanded);
  }
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
                      Cadastro Serviços
                    </NavLink>
                    <hr />
                    <NavLink onClick={handleExpandClick} style={{ cursor: "pointer" }} id="navlink">
                      Cadastro Categoria
                    </NavLink>
                    <hr />
                    {
                      expanded ? (
                       <ul>
                        <li>
                        <NavLink  id="navlink" to="/CadastroCatProduto">
                      Categoria de Produto
                    </NavLink></li> 
                    <hr />
                        <li>
                        <NavLink id="navlink" to="/CadastroCatServico">
                      Categoria de Serviço
                    </NavLink>
                        </li>
                        <hr />
                       </ul>
                      )
                      :
                      (
                       <div></div>
  
                      )
                    }
                    <NavLink id="navlink" to="/Doacoes">
                      Doações
                    </NavLink>
                    <hr />
                    <NavLink id="navlink" to="/HistoricoServicos">
                      Histórico de Servicos
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
