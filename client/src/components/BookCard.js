import { Container, Row, Col, Card, Button } from 'react-bootstrap';


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
        <Col key={id}>
          <Card>
            <Card.Img variant="top" src={""} />
            <Card.Body>
              <Card.Title>{title}</Card.Title>
              <Card.Text>{description}</Card.Text>
              <Card.Text>Author: {author}</Card.Text>
              <Card.Text>Publisher: {publisher}</Card.Text>
              <Card.Text>ISBN: {isbn_13}</Card.Text>
              <Card.Text>Price: ${price}</Card.Text>
              <Button onClick={handle}>Add to Cart</Button>                
            </Card.Body>
          </Card>
        </Col>
  );
};
export default BookCard;