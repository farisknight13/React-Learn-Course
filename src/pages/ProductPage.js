import React from "react";

import { Table, Image, Badge, Spinner } from "react-bootstrap";
import axios from "axios";
import { format } from "date-fns";
import { th } from "date-fns/locale";
import { BsEyeFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'

const ProductPage = () => {
  const [product, setProduct] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const cancelToken = React.useRef(null)

  const getData = async () => {
    try {
      setLoading(true);
      const resp = await axios.get(
        "https://api.codingthailand.com/api/course",
        {cancelToken: cancelToken.current.token}
      );
      // console.log(resp.data.data)
      setProduct(resp.data.data);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    cancelToken.current = axios.CancelToken.source()
    getData();

    return () => {
        // console.log('exit product page')
        cancelToken.current.cancel()
    }
  }, []);

  if (loading === true) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="secondary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-5 text-danger">
        <p>System error</p>
        <p>{error.response.data.message}</p>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-md-12">
          <h2>Product</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>id</th>
                <th>Course Name</th>
                <th>Detail</th>
                <th>Create Date</th>
                <th>Views</th>
                <th>Picture</th>
                <th>More</th>
              </tr>
            </thead>
            <tbody>
              {product.map((p, index) => {
                return (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.title}</td>
                    <td>{p.detail}</td>
                    <td>
                      {format(new Date(p.date), "dd/MMM/yyyy", { locale: th })}
                    </td>
                    <td>
                      <Badge variant="success">{p.view}</Badge>
                    </td>
                    <td>
                      <Image
                        src={p.picture}
                        thumbnail
                        alt={p.title}
                        width={100}
                      />
                    </td>
                    <td>
                        <Link to={`/detail/${p.id}/title/${p.title}`}>
                            <BsEyeFill />
                        </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
