import React, { useEffect, useState } from "react";
import Login from "./Login";




function Logout(){
    
    useEffect(() => {
        // auto-login
        fetch("/logout").then((r) => {
          if (r.ok) {'/home'}
        });
      }, []);
}



export default Login;