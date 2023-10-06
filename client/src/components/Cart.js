import React, { useEffect, useState } from "react";
import { Container} from 'react-bootstrap';
import CartCard from "./CartCard";


function Cart({cart,setCart}) {
  
  useEffect(() => {
    fetch('/cart').then(res => {
      if (res.ok) {
        res.json().then(items =>
          setCart(items),
        )
      };
    });
  }, [setCart]);

return (
      <Container>
       {cart.map((item) => (<CartCard key={item.id} item ={item} setCart = {setCart}/>))}
      </Container>
    );
  };
  

export default Cart;