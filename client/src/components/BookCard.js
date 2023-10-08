import { Row, Col, Card, Button } from 'react-bootstrap';


const BookCard = ({ book, setUser }) => {
  const { author, title, isbn_13, price, id, publisher , description, category,image} = book;

const handle = () =>{ 
  
  fetch(`/cart/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",    },    
  }).then((res) => {if (res.ok) {  fetch("/check_session")
  .then((res) => {  
    if (res.ok) {
      res.json().then((user) => setUser(user));
    }
});} }) 
}

return ( 
        
          <Card key={id} bg='dark' text='light' border='light' >
            
            <Card.Body>
            <Row>
            <Col md='3'><Card.Img  src={image} /></Col> 
            <Col><Card.Title>{title} </Card.Title>
            <Card.Text>Author: {author}</Card.Text>
            <Card.Text>Publisher: {publisher}</Card.Text>
            <Card.Text>{description}</Card.Text>            
            </Col>            
            </Row>
              <Card.Text>ISBN: {isbn_13}</Card.Text>
              <Card.Text>Price: ${price}</Card.Text>
              <Button variant='outline-success'onClick={handle}>Add to Cart</Button>                
            </Card.Body>
          </Card>
        
  );
};
export default BookCard;