import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import BookCard from "./BookCard";


function BookList({books, setUser}) { 
  
  useEffect(() => { 
    fetch("/check_session")
      .then((res) => {  
        if (res.ok) {
          res.json().then((user) => setUser(user));
        }
        else{
          res.json().then((err) => console.log(err));          
        }      
    });
  },[]);

  return (
    <Container className="card-container">     
        {books.map((book) => ( <BookCard key = {book.id} book = {book} setUser={setUser}/> ))}     
    </Container>
  );
};

export default BookList;