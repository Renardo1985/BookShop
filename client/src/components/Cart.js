import React, { useEffect, useState } from "react";

import CartCard from "./CartCard";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';


function Cart({cart,setCart}) {
  
  useEffect(() => {
    fetch('/cart').then(res => {
      if (res.ok) {
        res.json().then(items =>
          setCart(items),
        )
      };
    });
  }, [setCart]);


return (
      <Container >
        <Row className="justify-content-md-center">

        {cart.length === 0 ? <Row><h3>Your Cart is Empty</h3> <p>Add Books to your cart!</p> </Row>
        : <Row> {cart.map((item) => (<CartCard key={item.id} item ={item} setCart = {setCart}/>)) } 
        
        <Row><p></p></Row>
        
        <Row><Col><Button> Checkout </Button></Col></Row>
        
        </Row>}
          

       </Row>
      </Container>
    );
  };
  

export default Cart;