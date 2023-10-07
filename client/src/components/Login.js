import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { Container, Row, Col} from "react-bootstrap";

function Login({ onLogin }) {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');
  const nav = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email , password }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => onLogin(user));
        nav('/')
      } else {
        r.json().then((err) => setError(err));
      }
    })
  }
  
  return (
    <>
    <div className='login-page'>
      <Container >
      <Row className="justify-content-md-center">
      <Col xs lg ='7'>
      <Form style={{ padding: 30 }} className="login-form" onSubmit={handleSubmit}>
      <Form.Label>Login</Form.Label>

      <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Email Address</InputGroup.Text>
          <Form.Control
            type="email"
            id="email"
            required={true}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputGroup>

       <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Password</InputGroup.Text>
          <Form.Control
            type="password"
            id="password"
            required={true}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputGroup>
    

      <InputGroup className="mb-3">
        <Button id='signup-button' type='submit'>Login</Button>
        </InputGroup>
      <InputGroup className="mb-3">
        <Form.Label> Don't have an account? <a href="/signup">Sign up!</a> </Form.Label> 
        </InputGroup>
        {error ? <Form.Label> {error.error}</Form.Label>:null}
      </Form>
      </Col>
      </Row>
      </Container>
    </div>
  </>
);
}

export default Login;