import React from "react";

import { Container, Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useToasts } from 'react-toast-notifications';

const SUPPORTED_IMAGE_FORMATS = ["image/jpg", "image/jpeg"];

const UploadPage = () => {
  const history = useHistory();
  const { addToast } = useToasts()

  const { handleSubmit, errors, register } = useForm();

  const onSubmit = (data) => {
    try {
      // console.log(data);
      let fileUpload = data.picture[0];
      const reader = new FileReader();
      reader.readAsDataURL(fileUpload);
      reader.onload = async (e) => {
        let base64Image = e.target.result;
        const urlAPI = "https://api.codingthailand.com/api/upload";
        const resp = await axios.post(urlAPI, {
          picture: base64Image,
        });
        // alert(resp.data.data.message);
        // console.log(resp.data.data.url)
        addToast(resp.data.data.message, { appearance: 'success'});
        history.replace("/");
      };
    } catch (error) {
        // console.log(error)
        addToast(JSON.stringify(error), { appearance: 'error'});
    }
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h2>Upload Picture</h2>

          <form className="mb-3 mt-4" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="exampleFormControlFile1">Select Picture</label>
            <input
              type="file"
              name="picture"
              ref={register({
                required: "Please select file",
                validate: {
                  checkFileType: (value) => {
                    return (
                      value && SUPPORTED_IMAGE_FORMATS.includes(value[0].type)
                    );
                  },
                },
              })}
              className={`form-control-file ${
                errors.picture ? "is-invalid" : ""
              }`}
              id="exampleFormControlFile1"
            />
            {errors.picture && errors.picture.type === "required" && (
              <div className="invalid-feedback">{errors.picture.message}</div>
            )}
            {errors.picture && errors.picture.type === "checkFileType" && (
              <div className="invalid-feedback">
                File type support is .jpg or .jpeg{" "}
              </div>
            )}
            <button className="btn btn-dark mt-4" type="submit">
              Upload
            </button>
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default UploadPage;
