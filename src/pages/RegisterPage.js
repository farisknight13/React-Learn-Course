import React from "react";

import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

const schema = yup.object().shape({
  name: yup.string().required(`Name don't missing`),
  email: yup
    .string()
    .required(`Email don't missing`)
    .email("Format email is not true"),
  password: yup
    .string()
    .required(`Password don't missing`)
    .min(3, "password more than 3 character"),
});

const RegisterPage = () => {
  const history = useHistory();
  const { addToast } = useToasts();

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    try {
      // console.log(data)
      const apiUrl = "https://api.codingthailand.com/api/register";
      const resp = await axios.post(apiUrl, {
        name: data.name,
        email: data.email,
        password: data.password,
      });
      // alert(resp.data.message) //show message
      addToast(resp.data.message, { appearance: "success" });
      history.replace("/login");
    } catch (error) {
      addToast(error.response.data.errors.email[0], { appearance: "error" });
    }
  };

  return (
    <Container className="mt-4">
      <h1>Register</h1>
      <Row>
        <Col xs={12} md={8}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name - Lastname</Form.Label>
              <Form.Control
                type="text"
                name="name"
                ref={register}
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
              />
              {errors.name && (
                <Form.Control.Feedback type="invalid">
                  {errors.name.message}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                ref={register}
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
              />
              {errors.email && (
                <Form.Control.Feedback type="invalid">
                  {errors.email.message}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                ref={register}
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
              />
              {errors.password && (
                <Form.Control.Feedback type="invalid">
                  {errors.password.message}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Button variant="dark" type="submit">
              Register
            </Button>
          </Form>
          <hr />
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage;
