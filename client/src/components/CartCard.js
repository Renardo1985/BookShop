import { Container, Row, Col, Card, Button, Form} from 'react-bootstrap';
import React, { useState } from 'react';


const CartCard = ({ item, setUser}) => {
const { book, quantity,id, added_date, book_id} = item;
const [qvalue, setQ] = useState(quantity)


const handle = () =>{ 
  fetch(`/cart/${book_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",    },    
    }).then((res) => {if (res.ok) {  fetch("/check_session")
    .then((res) => {  
      if (res.ok) {
        res.json().then((user) => setUser(user));
      }
  });} })
}

const QuantityChange = (id, quantity) => { 



  fetch(`/cart/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },body: JSON.stringify({quantity}),
  }).then((res) => {
    
    if (res.ok) {}       
    else {
      res.json().then((err) => console.log(err));
    }
  });

  
  



}

return ( 
        
          <Card key={id}>
            <Card.Img variant="top" src={""} />
            <Card.Body>
              <Card.Title>{book['title']}</Card.Title>
              <Form.Control type = 'number' value ={qvalue} onChange={(e) => QuantityChange(id, parseInt(e.target.value))} min ='1'/>
        
              <button onClick={handle}>Delete</button>                
            </Card.Body>
          </Card>
        
  );
};
export default CartCard;