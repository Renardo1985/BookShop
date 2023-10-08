import { Container, Row, Col, Card, Button, Form, Spinner} from 'react-bootstrap';
import React, { useState } from 'react';
import moment from 'moment';


const CartCard = ({ item, setUser}) => {

  console.log(item)

const [qvalue, setQ] = useState(item.quantity)
const [loading, setLoading] = useState(false)

const fdate = moment(item.added_date).format('h:mma M.D.YY');


const handle = () =>{ 

  setLoading(true)
  fetch(`/cart/${item.book_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",    },    
    }).then((res) => {if (res.ok) {  fetch("/check_session")
    .then((res) => {  
      if (res.ok) {
        res.json().then((user) => setUser(user), setLoading(false));
      }
  });} })
}

const QuantityChange = (id, quantity) => { 

  setQ(quantity)
  setLoading(true)

  fetch(`/cart/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },body: JSON.stringify({quantity})})
    .then((res) => {    
    if (res.ok) 
    {fetch("/check_session")
    .then((res) => {  
      if (res.ok) {
        res.json().then((user) => setUser(user), setLoading(false));
      }
  });} })}

return ( 
        
          <Card key={item.id}>
            {loading? <><Spinner animation="border" variant="primary" /></>:<><Card.Img variant="top" src={""} />
            <Card.Body>
              <Row md='7'>
              <Col ><Card.Title>{item.book['title']}</Card.Title></Col>
              <Col ><Card.Text>Added: {fdate}</Card.Text></Col>
              </Row>
              <Row>
              <Col><Form.Control type = 'number' value ={qvalue} onChange={(e) => QuantityChange(item.id, parseInt(e.target.value))} min ='1'/>
              <Card.Title>Item: ${item.book['price']}</Card.Title></Col></Row>
              <Button variant='secondary'onClick={handle}>Delete</Button>                
            </Card.Body></>}
            
          </Card>
        
  );
};
export default CartCard;