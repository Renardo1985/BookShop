import React from "react";
import { Container, Row, Col} from "react-bootstrap";

function Home({books}) {
  return (
    <div className="home">
      <Container fluid="md">
        <Row>
        <Col><h2>The Bookshop</h2></Col>
        </Row>
        <Row>
        <Col><p>Login and explore a world of knowledge with our vast collection of books.</p></Col>
        </Row>
        </Container>      
    </div>
  );
}

export default Home;