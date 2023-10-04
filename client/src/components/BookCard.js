import { Container, Row, Col, Card, Button } from 'react-bootstrap';


const BookCard = ({ book }) => {
  const { author, title, isbn_13, genre, price, id, publisher , description, category,image} = book;


const handle = () =>{ console.log("click")}

return ( 

    <Row>
        <Col key={id}>
          <Card>
            <Card.Img variant="top" src={""} />
            <Card.Body>
              <Card.Title>{title}</Card.Title>
              <Card.Text>{author}</Card.Text>
              <Button onClick={handle}>Add to Cart</Button>                
            </Card.Body>
          </Card>
        </Col>
    </Row>
    

 
  );
};
export default BookCard;