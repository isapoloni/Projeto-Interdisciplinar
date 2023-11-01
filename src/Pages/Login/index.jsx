import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Logo from "../../assets/logo-igreja.png";
import { useNavigate } from "react-router-dom";
import "./style.css";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (username === "admin" && password === "123456") {
      console.log("Autenticação bem-sucedida");

      // Redirecionar para a página inicial
      navigate("/Home");
    } else {
      // Autenticação falhou
      alert("Credenciais inválidas");
    }
  };

  return (
    <div className="containerLogin">
      <div className="areaLogin col-md-6 text-center">
        <div className="logo">
          <img src={Logo} alt="" width={95} height={115} />
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Login</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite seu Login"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Senha</Form.Label>
            <Form.Control
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <br />
          <Button onClick={handleSubmit} variant="primary" type="submit">
            Entrar
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Login;
