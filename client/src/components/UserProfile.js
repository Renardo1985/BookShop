import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import AddressCard from "./AddressCard.js";
import UpdateAddress from "./UpdateAddress.js";
import { userData } from "./App";

function UserProfile({ address, setAddress, setUser }) {
  const user = useContext(userData);
  const [edit, setEdit] = useState(false);
  const [item, setItem] = useState(null);

  useEffect(() => {
    fetch("/address").then((res) => {
      if (res.ok) {
        res.json().then((addy) => setAddress(addy));
      }
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
      <Container>
        <Row>         
          <h2>Profile</h2> 
          <p>Welcome {user.full_name}.</p>
        </Row>
        {edit ? (
          <UpdateAddress
            address={item}
            setAddress={setAddress}
            setEdit={setEdit}
          />
        ) : (
          <>
            <Row>
            <p>Purchase History : work in progress...</p> 
            <Col>
              
              <strong>Address(s) on file:</strong>
              </Col>
            
              <Row>
                <Col>
                  {address.map((item) => (
                    <AddressCard
                      key={item.id}
                      address={item}
                      setAddress={setAddress}
                      setEdit={setEdit}
                      setItem={setItem}
                    />
                  ))}
                </Col>
              </Row>
            </Row>
          </>
        )}
        <Button href="/addaddress">Add Other Address</Button>
      </Container>
   
    </div>
  );
}

export default UserProfile;
