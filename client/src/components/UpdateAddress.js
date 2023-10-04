import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { Container, Row, Col } from "react-bootstrap";

function UpdateAddress({address, setAddress}) {
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [postal_code, setPostal] = useState("");
    const [country, setCountry] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
  
    const nav = useNavigate();
 
if (address){   
  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);

    fetch("/address", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ street, city, state, postal_code, country }),
    }).then((res) => {
      setIsLoading(false);
      if (res.ok) {
        res.json().then((address) => setAddress(address));
        nav("/user");
      } else {
        res.json().then((err) => console.log(err));
      }
    });
  }

  return (
    <div className="signup-page">
      <Container>
        <Row className="justify-content-md-center">
          <Col xs lg="7">
            <Form
              style={{ padding: 30 }}
              className="signup-form"
              onSubmit={handleSubmit}
            >
              <Form.Label>Address</Form.Label>

              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Street</InputGroup.Text>
                <Form.Control
                  type="text"
                  id="street"        
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">City</InputGroup.Text>
                <Form.Control
                  type="text"
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">State</InputGroup.Text>
                <Form.Control
                  type="text"
                  id="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Country</InputGroup.Text>
                <Form.Control
                  type="text"
                  id="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Postal Code</InputGroup.Text>
                <Form.Control
                  type="text"
                  id="postal_code"
                  value={postal_code}
                  onChange={(e) => setPostal(e.target.value)}
                />
              </InputGroup>

              <InputGroup className="mb-3">
                <Button id="signup-button" type="submit">
                  {" "}
                  {isLoading ? "Loading..." : "Submit"}
                </Button>
              </InputGroup>
              {errors ? (
                <Form.Label>
                  {" "}
                  {errors.map((err) => (
                    <p key={err}>{err}</p>
                  ))}
                </Form.Label>
              ) : null}
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}}

export default UpdateAddress;
