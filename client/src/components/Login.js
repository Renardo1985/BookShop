import { useState } from "react";
import { Link } from 'react-router-dom';

function Login({ onLogin }) {
  const [showLogin, setShowLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email , password }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => onLogin(user));
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <>
    <div className='login-form-page'>
      <form className='login-form' onSubmit={handleSubmit}>
        <h1 className='form-title'>BookStore</h1>
        <label className='form-label' htmlFor='email'>Email:</label>
        <input
          type='text'
          id='email'
          placeholder='Enter email'
          autoComplete='off'
          value={email}
          onChange={(e) => setEmail(e.target.value)}>
        </input>
        <label className='form-label' htmlFor='password'>Password: </label>
        <input 
          type='text'
          id='password'
          placeholder='Enter password'
          autoComplete='current-password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}>
        </input>
        <button id='login-button' type='submit' value='Login'>Login</button>
       
        <span className="signup-link">Don't have an account? <a href="/account_signup">Sign up!</a></span>
      </form>
    </div>
  </>
);
}

export default Login;