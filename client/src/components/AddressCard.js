import { Card, Button } from 'react-bootstrap';
import React from "react";
import { useNavigate } from "react-router-dom";



function AddressCard ({ address, setEdit, setItem ,setUser}) {  

  const nav = useNavigate()

    const handle = () =>{ 
    let id = address.id
    
    fetch(`/address/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({id}),
    }).then((r) => {
    if (r.ok) {} 
    else {
      r.json().then((err) => console.log(err));
    }
  });

  fetch("/check_session")
      .then((res) => {  
        if (res.ok) {
          res.json().then((user) => setUser(user));
        }
        else{nav('/');          
        }      
    });


}

  const handleupdate = () =>{setEdit(true); setItem(address)}

return ( 
    
        <Card style={{ width: '18rem' }} bg='dark' text='light' >
            <Card.Body  >
            <Card.Title>{address.street}</Card.Title>
            <Card.Text>City: {address.city}</Card.Text>
            <Card.Text>State: {address.state}</Card.Text>
            <Card.Text>Code: {address.postal_code}</Card.Text>
            <Card.Text>Country: {address.country}</Card.Text>
            <Button variant={'secondary'} onClick={handleupdate}>Edit</Button>{" "}
            <Button variant={'danger'} onClick={handle}>Delete</Button>               
        </Card.Body>
        </Card>  

    );
};
export default AddressCard;