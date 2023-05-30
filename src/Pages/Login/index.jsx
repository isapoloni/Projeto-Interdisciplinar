import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const initialState = () => {
  return { user: "", password: "" };
};
function Login() {
  const [values, setValues] = useState(initialState);
  const onChange = (e) => {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
  };

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  // const handleEmailChange = (event) => {
  //   setEmail(event.target.value);
  // };

  // const handlePasswordChange = (event) => {
  //   setPassword(event.target.value);
  // };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   // Lógica de autenticação aqui
  // };

  return (
    <div className="container">
      <div className="row justify-content-center ">
        <div className="col-md-6 text-center">
          <h2>Sign In</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail">
              <Form.Label>Login</Form.Label>
              <Form.Control
                type="email"
                placeholder="Digite seu email"
                value={values.login}
                onChange={onChange}
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                type="password"
                placeholder="Digite sua senha"
                value={values.password}
                onChange={onChange}
              />
            </Form.Group>
            <br />
            <Button variant="primary" type="submit">
              Entrar
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
