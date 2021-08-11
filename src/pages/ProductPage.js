import React from "react";

import { Table, Image, Badge, Spinner } from "react-bootstrap";
import axios from "axios";
import { format } from "date-fns";
import { th } from "date-fns/locale";
import { BsEyeFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'

//redux
import { addToCart } from "../redux/actions/cartAction";
import { useSelector, useDispatch } from "react-redux";

const ProductPage = () => {
  const [product, setProduct] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const cancelToken = React.useRef(null)

  //redux
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cartReducer.cart)
  const total = useSelector((state) => state.cartReducer.total)


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

  const addCart = (p) => {
    // console.log(p)
    const product = {
      id: p.id,
      name: p.title,
      price: p.view, //Example use view is price
      qty: 1,
    }

    //call action
    dispatch(addToCart(product,cart))
  }

  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-md-12">
          <h2>Product</h2>
          {
            total > 0 && ( <h4>Cart {total} item</h4> )
          }
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
                        <button onClick={() => addCart(p)} className="btn btn-outline-primary ml-2">
                          Add Cart
                        </button>
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
