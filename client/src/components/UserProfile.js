
import React, { useEffect, useContext } from 'react';
import { Container, Row, Col, Button} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import AddressCard from "./AddressCard.js";
import {userData} from './App';

function UserProfile({ address, setAddress, setUser}) {
  const user = useContext(userData);
  const nav = useNavigate();

  useEffect(() => {
    fetch('/address').then(res => {
      if (res.ok) {
        res.json().then(addy =>
          setAddress(addy),
        )
      };
    });
  }, [setAddress]);

 
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
        <Row>
          <p>Purchase History : work in progress...</p>
        </Row>
        <p>Address(s) on file:</p>
        <Row>
          <Col>
          {address.map((item) => ( <AddressCard key = {item.id} address = {item} setAddress={setAddress}/> ))} 
          </Col>
          <Row>
            <Col>
          <Button href="/addaddress">Add Other Address</Button>
          </Col>
          </Row>
        </Row>
      </Container>
    </div>
  );
}

export default UserProfile;
