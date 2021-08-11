import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { Table } from "react-bootstrap";

import { clearAllCart } from "../redux/actions/cartAction";
import { useHistory } from "react-router-dom";

const CartPage = () => {
  const cart = useSelector((state) => state.cartReducer.cart);
  const total = useSelector((state) => state.cartReducer.total);
  const dispatch = useDispatch();
  const history = useHistory()

  return (
    <>
      <div className="container">
        <div className="row mt-4">
          <div className="col-md-12">
            <h1>Cart</h1>
            <h3>
              Product {total} item
              <button
                onClick={() => {
                  dispatch(clearAllCart());
                }}
                className="btn btn-danger btn-sm ml-4"
              >
                Delete All Item
              </button>
              <button
                onClick={() => {
                  history.push('/pdf')
                }}
                className="btn btn-info btn-sm ml-4 float-right"
              >
                Print Report
              </button>
            </h3>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Item Code</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Totle Price</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((c, index) => {
                  return (
                    <tr key={c.id}>
                      <td>{index + 1}</td>
                      <td>{c.id}</td>
                      <td>{c.name}</td>
                      <td>{c.price}</td>
                      <td>{c.qty}</td>
                      <td>{c.price * c.qty}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
