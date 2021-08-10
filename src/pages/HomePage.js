import React from "react";

import { BsFillHeartFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";

import { useQuery } from "react-query";

const HomePage = () => {
  // const { isLoading, error, data, isFetching } = useQuery("repoData", () =>
  //   fetch("https://api.codingthailand.com/api/news?page=1&per_page=3").then(
  //     (res) => res.json()
  //   )
  // );

  const query = useQuery("getData", () => {
    const controller = new AbortController()
    const signal = controller.signal

    const promise = fetch(
      "https://api.codingthailand.com/api/news?page=1&per_page=3",{
        method: 'get',
        signal: signal

    }).then((res) => res.json())

    //cancel request
    promise.cancel = () => controller.abort()

    return promise

  })

  const { isLoading, error, data, isFetching } = query

  if (isLoading === true) {
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
        <p>{JSON.stringify(error)}</p>
      </div>
    );
  }

  return (
    <>
      {/* Begin page content */}
      <main class="container">
      <div class="p-4 p-md-5 mb-4 mt-4 text-dark rounded bg-warning">
      <div class="col-md-6 px-0">
            <h1 className="mt-5 text-dark">Welcome</h1>
            <p className="lead">
              <BsFillHeartFill color="black" /> เว็บนี้พัฒนาด้วย React
              เป็นเว็บเรียนออนไลน์
            </p>
            <p>
              <Link to="/product" className="btn btn-dark btn-lg" role="button">
                All product
              </Link>
            </p>
          </div>
        </div>
      </main>
      <div className="container">
        <div className="row">
          <div className="mx-auto">{isFetching ? 'Reloading...' : null}</div>
          {data.data.map((news, index) => {
            return (
              <div className="col-md-4" key={news.id}>
                <h2>{news.topic}</h2>
                <p>{news.detail}</p>
                <p>Category: PHP</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default HomePage;
