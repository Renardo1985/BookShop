import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import BookCard from "./BookCard";


function BookList({books, user}) {  

  return (
    <Container>     
        {books.map((book) => ( <BookCard book = {book}/> ))}     
    </Container>
  );
};

export default BookList;