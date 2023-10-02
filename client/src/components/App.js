import React, { useEffect, useState } from "react";
import { Routes, Route} from "react-router-dom";

import Login from "./Login";
import NavBar from "./NavBar";
import Foot from "./Foot";
import Logout from "./Logout";


function App() {
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([])

  useEffect(() => {
    // auto-login
    fetch("/check_session").then((res) => {
      if (res.ok) {
        res.json().then((user) => setUser(user));
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

  if (!user) return <Login onLogin={setUser} />;

  return (
    <>
    <NavBar />
    <main>
    <Routes>
    <Route path="/home" element ={<Home />}/> 
    <Route path="/books" element ={<BooksList/>} />      
    <Route path="/logout" element ={<Logout/>}/>  
    </Routes>
    </main>
    <Foot />
  </>
  );
}

export default App;