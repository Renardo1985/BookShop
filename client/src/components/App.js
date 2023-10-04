import React, { useEffect, useState } from "react";
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
import UpdateAddress from "./UpdateAddress";

function App() {
  const [user, setUser] = useState(null);   
  const [books, setBooks] = useState([])   
  const [address, setAddress] = useState(null)

  console.log(user)

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

  useEffect(() => {
    fetch("/address").then((res) => {
      if (res.ok) {
        res.json().then((address) => setAddress(address));
      }
    });
  }, []);

  

  return (
    <main>
    <NavBar setUser ={setUser} user={user}/>
    <Routes> 
    <Route path="/" element ={<Home/>}/>    
    <Route path="/books" element ={<BookList books = {books} user = {user}/>} /> 
    <Route path="/login" element ={<Login onLogin ={setUser}/>} />  
    <Route path="/signup" element ={<SignUp setUser ={setUser}/>} />  
    <Route path="/cart" element ={<Cart/>} /> 
    <Route path="/user" element ={<UserProfile user = {user} address ={address} setAddress={setAddress}/>}/>
    <Route path="/addaddress" element ={<AddAddress setAddress={setAddress}/>}/>
    <Route path="/updateaddress" element ={<UpdateAddress address = {address} setAddress={setAddress}/>}/>
    <Route path="*" element ={<><h1>404 not Found</h1> <h3> Sorry Nothing here!! </h3></> }/> 
    </Routes>
    <Foot />
  </main>
  );
}

export default App;