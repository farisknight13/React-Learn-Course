import React from "react";
// import Logo from "./Logo";
import Title from '../styles/title/Title'
import { Button } from "../styles/button/Button";

const Header = () => {
  let companyName = "DOBBY";
  const companyAddress = <p>Ubon</p>;
  let num = 10;
  const showMessage = () => {
    return companyName + ".com";
  };
  const isLogin = true;
  const showMe = () => {
      // alert('Hello World')
  }
  const products = [
      {id:1, name:'Coke'},
      {id:2, name:'Pepsi'}
  ]

  return (
    <>
    <Title>Hello React</Title>
      <h1>บริษัท {companyName}</h1>
      {companyAddress}
      {num + 100} <br />
      {showMessage()}
      {isLogin === true && (
        <>
          <p>Welcome</p>
          <p>Welcome 2</p>
        </>
      )}
      {/* { isLogin ? <Logo /> : <p>ไม่มีสิทธิ์ดู Logo</p>} */}
      <br />
      <Button primary onClick={showMe()}>Click Me!</Button>
      {/* <button onClick={showMe()}>Click Me!</button> */}
      <br />
      {
          products.map((product, index) => {
              return (
                  <li key={product.id}>{product.name} {index+1}</li>
              )
          })
      }
      <hr />
    </>
  );
};

export default Header;
