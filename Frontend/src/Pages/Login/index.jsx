import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Logo from "../../assets/logo-igreja.png";
import { useNavigate } from "react-router-dom";
import Cookie from 'universal-cookie'
import "./style.css";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const cookies = new Cookie()
  async function handleSubmit (event){
    event.preventDefault()
    const data = await fetch('http://localhost:3308/access', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user:username,
        password
      })
    }).then(data => data.json())
    
    if(data.auth === true){
      cookies.set('authorization', data.token,{
        path:'/'
      })
      navigate("/Home");
    }else{
      navigate('/')
      window.alert('Credencial inválida')
    }
  };

  return (
    <div className="containerLogin">
      <div className="areaLogin col-md-6 text-center">
        <div className="logo">
          <img src={Logo} alt="" width={95} height={115} />
        </div>
        <Form id='form'>
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
          <Button onClick={handleSubmit} variant="primary" type="submit" form="form">
            Entrar
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Login;
