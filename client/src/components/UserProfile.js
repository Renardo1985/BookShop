import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import AddressCard from "./AddressCard.js";
import UpdateAddress from "./UpdateAddress.js";
import { userData } from "./App";

function UserProfile({ setUser }) {
  const user = useContext(userData);

  const [edit, setEdit] = useState(false);
  const [item, setItem] = useState(null);

  useEffect(() => { 
    fetch("/check_session")
      .then((res) => {  
        if (res.ok) {
          res.json().then((user) => setUser(user));
        }
        else{
          res.json().then((err) => console.log(err));          
        }      
    });
  }, [setUser]);

  const address = user.address

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
            setUser={setUser}
            setEdit={setEdit}
          />
        ) : (
          <>
            <Row>
            <p>Purchase History : </p> 
            <Row>
                {user.books? user.books.map((item) => { return (<Col><Card> Title: {item.title} </Card></Col>)} ):null}

            </Row>
            </Row>

            <Row>
            <Col>              
              <strong>Address(s) on file:</strong>
              </Col>            
              <Row>
                <Col>
                  {address.map((item) => (
                    <AddressCard
                      key={item.id}
                      address={item}
                      setUser={setUser}
                      setEdit={setEdit}
                      setItem={setItem}
                    />
                  ))}
                </Col>
              </Row>
            </Row>
          </>
        )}
        <Row><p></p></Row>
        <Row><Col><Button href="/addaddress">Add Address</Button></Col></Row>
      </Container>
   
    </div>
  );
}

export default UserProfile;
