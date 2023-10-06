import { Container, Row, Col, Card, Button } from 'react-bootstrap';


const CartCard = ({ item, setCart}) => {
  const { book, quantity,id, added_date, book_id} = item;


const handle = () =>{ 
  fetch(`/cart/${book_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",    },    
  }).then((r) => {
    if (r.ok) { r.json().then((cart) => setCart(cart));   } 
  })
}

return ( 
        <Col key={id}>
          <Card>
            <Card.Img variant="top" src={""} />
            <Card.Body>
              <Card.Title>{book['title']}</Card.Title>
              <Card.Text>Qty: {quantity}</Card.Text>
        
              <Button onClick={handle}>Delete</Button>                
            </Card.Body>
          </Card>
        </Col>
  );
};
export default CartCard;