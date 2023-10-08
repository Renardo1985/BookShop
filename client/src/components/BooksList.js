import React, { useEffect} from "react";
import { Container} from 'react-bootstrap';
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
    <Container fluid='md'>     
        {books.map((book) => ( <BookCard key = {book.id} book = {book} setUser={setUser}/> ))}     
    </Container>
  );
};

export default BookList;