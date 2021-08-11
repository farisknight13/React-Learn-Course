import React from "react";

import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useHistory } from 'react-router-dom'

const schema = yup.object().shape({
  name: yup.string().required(`Category don't missing`),
});

const CreatePage = () => {
  const history = useHistory()

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    // console.log(data)
    const apiUrl = "https://api.codingthailand.com/api/category";
    const resp = await axios.post(apiUrl, {
      name: data.name,
    });
    alert(resp.data.message) //show message
    history.replace('/category')
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col xs={12} md={8}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Category News</Form.Label>
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
            <Button variant="dark" type="submit">
              Save
            </Button>
          </Form>
          <hr />
        </Col>
      </Row>
    </Container>
  );
};

export default CreatePage;
