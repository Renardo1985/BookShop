import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import BookCard from "./BookCard";


function BookList({books, setCart}) {  

  return (
    <Container className="card-container">     
        {books.map((book) => ( <BookCard key = {book.id} book = {book} setCart={setCart}/> ))}     
    </Container>
  );
};

export default BookList;