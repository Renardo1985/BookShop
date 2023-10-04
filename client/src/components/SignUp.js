import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { Container, Row, Col} from "react-bootstrap";



function SignUp({setUser}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigate();
  
  
  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email , password ,name}),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => setUser(user));
        nav("/")
      } 
      else {
        r.json().then((err) => setError(err)); 
      }

    })
  }
  
  return (
    <div className="signup-page">
      <Container >
      <Row className="justify-content-md-center">
      <Col xs lg ='7'>
      <Form style={{ padding: 30 }} className="signup-form" onSubmit={handleSubmit}>
      <Form.Label>Sign Up</Form.Label>

        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">First and Last Name</InputGroup.Text>
            <Form.Control
              type="text"
              id="name"
              required={true}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Email Address</InputGroup.Text>
          <Form.Control
            type="text"
            id="genre"
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
          <Button id='signup-button' type='submit'> {isLoading ? "Loading..." : "Sign Up"}</Button>        
        </InputGroup>
        <InputGroup className="mb-3">
        <Form.Label> Already have an account? <a href="/">Login</a> </Form.Label> 
        </InputGroup>
        {error ? <Form.Label> {error.error}</Form.Label>:null}
      </Form>
      </Col>
      </Row>
      </Container>
        
        
    </div>
    
  );

}

export default SignUp;