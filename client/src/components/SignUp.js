import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { Container, Row, Col} from "react-bootstrap";
import * as formik from 'formik';
import * as yup from 'yup';



function SignUp({setUser}) {

  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigate();
  const [error, setError] = useState("");
  const { Formik } = formik;

const schema = yup.object().shape({
  name: yup.string().required('Name is Required'),
  email: yup.string().email('invalid email format').required('E-mail is Required'),
  password: yup.string().required("Must enter a password"),
});

const submit = e => {
  console.log(e)
  setIsLoading(true);
  fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(e),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => setUser(user));
        nav("/")} 
      else {
        r.json().then((err) => setError(err)); 
      }

    })
}

return (  
  <Formik
    validationSchema={schema}
    onSubmit={submit}
    initialValues={{name: '',email: '',password: '',}}>
      
    {({ handleSubmit, handleChange, values, touched, errors }) => (
      <Container>
      <Row className="justify-content-md-center">
      <Col xs lg ='7'>
      
      <Form style={{ padding: 30 }} className="signup-form" noValidate onSubmit={handleSubmit}>
      <Form.Label>Sign Up</Form.Label>

          <Form.Group controlId="validationFormik01" >
          <InputGroup className="mb-3" hasValidation>
          <InputGroup.Text id="basic-addon1">First and Last Name</InputGroup.Text>          
            <Form.Control
              type="text"
              aria-describedby="name"
              name="name"               
              onChange={handleChange}
              isValid={touched.name && !errors.name}
              isInvalid={!!errors.name}/>
            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
            </InputGroup>
          </Form.Group>


          <Form.Group controlId="validationFormik02" >
          <InputGroup className="mb-3" hasValidation>
          <InputGroup.Text id="basic-addon1">Email</InputGroup.Text>
            
            <Form.Control
              type="email"
              aria-describedby="email"
              name="email"              
              onChange={handleChange}
              isValid={touched.email && !errors.email}
              isInvalid={!!errors.email}/>
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          
          <Form.Group controlId="validationFormik03">
            <InputGroup className="mb-3" hasValidation>
              <InputGroup.Text id="basic-addon1">Password</InputGroup.Text>
              <Form.Control
                type="password"                
                aria-describedby="password"
                name="password"                 
                onChange={handleChange}
                isValid={touched.password && !errors.password}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <InputGroup className="mb-3">
          <Button id='signup-button' type='submit'> {isLoading ? "Loading..." : "Sign Up"}</Button>        
        </InputGroup>
        <InputGroup className="mb-3">
        <Form.Label> Already have an account? <a href="/login">Login</a> </Form.Label> 
        </InputGroup>
        {error ? <Form.Label> {error.error}</Form.Label>:null}
          
        
      </Form>
      </Col>
      </Row>
      </Container>
    )}
  </Formik>
);
}

export default SignUp;