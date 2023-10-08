import React, { useEffect, useState, useContext } from "react";

import CartCard from "./CartCard";
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { userData } from "./App";


function Cart({setUser}) {
  const [showModal, setShowModal] = useState(false);

  let sum = 0
  let cost = 0

  const user = useContext(userData);
  const closeModal = () => setShowModal(false);
  
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

  const checkOut = () =>{

    setShowModal(true)

    // fetch("/check_out")
    //   .then((res) => {  
    //     if (res.ok) {
    //       res.json().then((user) => setUser(user), setShowModal(true));
    //     }
    //     else{
    //       res.json().then((err) => console.log(err));          
    //     }      
    // });
  }

  if (user.cart_items && user.cart_items.length >0)
  {
    for (const object of user.cart_items){sum+= object.quantity}
    for (const object of user.cart_items){cost+= (object.quantity*object.book['price'])}  
  } 
return (
      <Container >
        <Row className="justify-content-md-center">
        {user.cart_items.length === 0 ? <Row><h3>Your Cart is Empty</h3> <p>Add Books to your cart!</p> </Row>
        :<Row> 
          <strong>You have {sum} books in your Cart! </strong>
         
        {user.cart_items.map((item) => (<CartCard key={item.id} item ={item} setUser= {setUser}/>)) } 
        <Row><p></p></Row>        
        <Row><Col><Button variant="danger" onClick={checkOut}> Checkout </Button></Col> <Col><strong>Total Cost: ${cost.toFixed(2)}</strong></Col>  </Row>        
        </Row>}   
       </Row>
    
       <Modal show={showModal} onHide={closeModal} >
        <Modal.Header closeButton>
          <Modal.Title className="my-modal">Transaction successful</Modal.Title>
          </Modal.Header>
            <Modal.Body className="my-modal">
             Check Profile page to view transaction history!
            </Modal.Body>
          </Modal>
    
      </Container>
    );
  };
  

export default Cart;