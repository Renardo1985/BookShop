import React, { useEffect, useState, createContext } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import Login from "./Login";
import NavBar from "./NavBar";
import Foot from "./Foot";
import SignUp from "./SignUp";
import Home from "./Home";
import Cart from "./Cart";
import AddAddress from "./AddAddress";
import BookList from "./BooksList";
import UserProfile from "./UserProfile";
// import UpdateAddress from "./UpdateAddress";


const userData = createContext();

export default function App() {
  const [user, setUser] = useState();   
  const [books, setBooks] = useState([])   

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
  }, []);

  useEffect(() => {
    fetch('/books').then(res => {
      if (res.ok) {
        res.json().then(books =>
          setBooks(books),
        )
      };
    });
  }, []); 


  if(user)
  {
  return (    
    <userData.Provider value={user}>  
    <NavBar setUser ={setUser} />
    <Routes> 
    <Route path="/" element ={<Home books={books}/>}/>    
    <Route path="/books" element ={<BookList books = {books} setUser={setUser}/>} /> 
    <Route path="/login" element ={<Login setUser ={setUser}/>} />  
    <Route path="/signup" element ={<SignUp setUser ={setUser}/>} />  
    <Route path="/cart" element ={<Cart setUser={setUser}/>} /> 
    <Route path="/user" element ={<UserProfile setUser={setUser}/>}/>
    <Route path="/addaddress" element ={<AddAddress/>}/> 
    <Route path="*" element ={<><h1>404 not Found</h1> <h3> Sorry Nothing here!! </h3></> }/> 
    </Routes>   
    <Foot/>
    </userData.Provider>
    
  );
}
else
{
  return (
    <main>
    <NavBar setUser ={setUser} user={user} />
    <Routes> 
    <Route path="/" element ={<Home books={books}/>}/>    
    <Route path="/login" element ={<Login setUser ={setUser}/>} />  
    <Route path="/signup" element ={<SignUp setUser ={setUser}/>} />  
    <Route path="*" element ={<><h1>404 not Found</h1> <h3> Sorry Nothing here!! </h3></> }/> 
    </Routes>
    <Foot />
  </main>
  );

}
}
export {userData};