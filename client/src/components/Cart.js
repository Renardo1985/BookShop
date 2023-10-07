import React, { useEffect, useState, useContext } from "react";

import CartCard from "./CartCard";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { userData } from "./App";


function Cart({setUser}) {

  const user = useContext(userData);
  
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



return (
      <Container >
        <Row className="justify-content-md-center">

        {user.cart_items.length === 0 ? <Row><h3>Your Cart is Empty</h3> <p>Add Books to your cart!</p> </Row>
        : <Row> {user.cart_items.map((item) => (<CartCard key={item.id} item ={item} setUser= {setUser}/>)) } 
        
        <Row><p></p></Row>
        
        <Row><Col><Button> Checkout </Button></Col></Row>
        
        </Row>}
          

       </Row>
      </Container>
    );
  };
  

export default Cart;