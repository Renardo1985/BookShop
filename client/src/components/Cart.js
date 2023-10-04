import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from 'react-bootstrap';


function Cart() {
  const [cart_Items, setCart_Items] = useState([])


  useEffect(() => {
    fetch('/cart').then(res => {
      if (res.ok) {
        res.json().then(items =>
          setCart_Items(items),
        )
      };
    });
  }, [cart_Items.values]);

return (
      <Container>
        <Row>
          {cart_Items.map((item) => (
            <Col key={item.id} md={4}>
              <Card>
                <Card.Img variant="top" src={item.book['image']} />
                <Card.Body>
                  <Card.Title>{item.book['title']}</Card.Title>
                  <Card.Text>{item.book['author']}</Card.Text>
                  <Card.Text>{item.book['description']}</Card.Text>                
                  <Card.Text>Quantity: {item.quantity}</Card.Text>
                  <Card.Text>Price: ${item.book['price']}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    );
  };
  

export default Cart;