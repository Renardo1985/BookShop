import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";


const AddressCard = ({ address, setAddress }) => {

    const handle = () =>{ 
    let id = address.id
    
    fetch("/address", {
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

return ( 
    
        <Card>
        <Card.Img variant="top" src={""} />
            <Card.Body>
            <Card.Title>{address.street}</Card.Title>
            <Card.Text>City: {address.city}</Card.Text>
            <Button href="/updateaddress">Update</Button>{" "}
            <Button onClick={handle}>Delete</Button>               
        </Card.Body>
        </Card>  

    );
};
export default AddressCard;