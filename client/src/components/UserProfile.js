import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function UserProfile({ user, address, setAddress}) {
  
  const nav = useNavigate();

  function deleteAddress() {
    fetch("/address", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((r) => {
      if (r.ok) {
        nav("/user");
        setAddress(null)
      } else {
        r.json().then((err) => console.log(err));
      }
    });
  }

  if (!address)
    return (
      <div className="profile">
        <Container fluid="md">
          <Row>
            <Col>
              <h2>Profile</h2>
            </Col>
          </Row>
          <Row>
            <p>Welcome {user.full_name}.</p>
            <p>Seems you do not have an address registered!.</p>
            <Row>
              <Col>
                <Button href="/addaddress">Add Address</Button>
              </Col>
            </Row>
          </Row>
        </Container>
      </div>
    );
    
  return (
    <div className="profile">
      <Container fluid="md">
        <Row>
          <Col>
            <h2>Profile</h2>
          </Col>
        </Row>
        <Row>
          <p>Welcome {user.full_name}.</p>
        </Row>
        <p>We have your address as:</p>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Street: {address.street}</Card.Title>
                <Card.Text>City: {address.city}</Card.Text>
                <Button href="/updateaddress">Update</Button>{" "}
                <Button onClick={deleteAddress}>Delete</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default UserProfile;
