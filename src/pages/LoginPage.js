import React from "react";

import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
// import { UserStoreContext } from "../context/UserContext";
import { useDispatch } from "react-redux";
import { updateProfile } from "../redux/actions/authAction";

const schema = yup.object().shape({
  email: yup
    .string()
    .required(`Email don't missing`)
    .email("Format email is not true"),
  password: yup
    .string()
    .required(`Password don't missing`)
    .min(3, "password more than 3 character"),
});

const LoginPage = () => {
  const history = useHistory();
  const { addToast } = useToasts();
  // const userStore = React.useContext(UserStoreContext)

  //call action redux
  const dispatch = useDispatch()

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    try {
      // console.log(data)
      const apiUrl = "https://api.codingthailand.com/api/login";
      const resp = await axios.post(apiUrl, {
        email: data.email,
        password: data.password,
      });
    //   console.log(resp.data)
      // alert(resp.data.message) //show message
      localStorage.setItem('token', JSON.stringify(resp.data))

      //get profile
      const urlProfile = 'https://api.codingthailand.com/api/profile'
      const respProfile = await axios.get(urlProfile, {
        headers: {
            Authorization: 'Bearer ' + resp.data.access_token
        }
      })
    //   console.log(respProfile.data.data.user)
      localStorage.setItem('profile', JSON.stringify(respProfile.data.data.user))

      addToast('Login Complete', { appearance: "success" });
      // history.replace('/')
      // history.go(0)
      //update profile by context
      const profileValue = JSON.parse(localStorage.getItem('profile'))
      // userStore.updateProfile(profileValue)
      dispatch(updateProfile(profileValue))
      history.replace('/')

    } catch (error) {
      addToast(error.response.data.message, { appearance: "error" });
    }
  };

  return (
    <Container className="mt-4">
      <h1>Login</h1>
      <Row>
        <Col xs={12} md={8}>
          <Form onSubmit={handleSubmit(onSubmit)}>
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
              Login
            </Button>
          </Form>
          <hr />
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
