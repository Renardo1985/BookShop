import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";


const AddressCard = ({ address, setAddress , setEdit, setItem }) => {

    const handle = () =>{ 
    let id = address.id
    
    fetch(`/address/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({id}),
    }).then((r) => {
    if (r.ok) {r.json().then((addy) => setAddress(addy));} 
    else {
      r.json().then((err) => console.log(err));
    }
  });}

  const handleupdate = () =>{setEdit(true); setItem(address)}

return ( 
    
        <Card>
        <Card.Img variant="top" src={""} />
            <Card.Body>
            <Card.Title>{address.street}</Card.Title>
            <Card.Text>City: {address.city}</Card.Text>
            <Card.Text>State: {address.state}</Card.Text>
            <Card.Text>Code: {address.postal_code}</Card.Text>
            <Card.Text>Country: {address.country}</Card.Text>
            <Button onClick={handleupdate}>Update</Button>{" "}
            <Button onClick={handle}>Delete</Button>               
        </Card.Body>
        </Card>  

    );
};
export default AddressCard;