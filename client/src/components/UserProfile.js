import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col, Button, Card, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import AddressCard from "./AddressCard.js";
import UpdateAddress from "./UpdateAddress.js";
import { userData } from "./App";

function UserProfile({ setUser }) {
  const user = useContext(userData);

  const [edit, setEdit] = useState(false);
  const [item, setItem] = useState(null);

  useEffect(() => {
    fetch("/check_session").then((res) => {
      if (res.ok) {
        res.json().then((user) => setUser(user));
      } else {
        res.json().then((err) => console.log(err));
      }
    });
  }, [setUser]);

  const address = user.address;

  return (
    <>
      <Card bg="dark" text="light">
        <Card.Body>
          <Card.Header>{user.full_name} </Card.Header>
          <Card.Title>Profile</Card.Title>
          {edit ? (
            <UpdateAddress address={item} setUser={setUser} setEdit={setEdit} />
          ) : (
            <div>
              <Card.Text>Purchase History : </Card.Text>
              <ListGroup variant="flush">
                {user.books
                  ? user.books.map((item) => {
                      return (
                        <ListGroup.Item> Book: {item.title} </ListGroup.Item>
                      );
                    })
                  : null}
              </ListGroup>
              <Card.Header>Address(s) on file:</Card.Header>
              {address.map((item) => (
                <AddressCard
                  key={item.id}
                  address={item}
                  setUser={setUser}
                  setEdit={setEdit}
                  setItem={setItem}
                />
              ))}

              <Card.Header>
                <Button variant={"success"} href="/addaddress">
                  Add Address
                </Button>
              </Card.Header>
            </div>
          )}
        </Card.Body>
      </Card>
    </>
  );
}

export default UserProfile;
