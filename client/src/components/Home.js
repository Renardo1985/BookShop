import React from "react";
import { Container, Row, Col} from "react-bootstrap";
import BookCarousel from "./BookCarousel";

function Home({books}) {


  const getRandomBooks = (arr) => {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 5);

  };

  const bks = getRandomBooks(books)

  


  return (
    <div>
      <Container fluid="md">
        <Row>
        <Col><h2>The Bookshop</h2></Col>
        </Row>
        <Row>
        <Col><p>Login and explore a world of knowledge with our vast collection of books.</p></Col>
        </Row>        
        </Container>   
        <BookCarousel books={bks}/>   
    </div>
  );
}

export default Home;