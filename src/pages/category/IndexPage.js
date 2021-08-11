import React from "react";

import { Spinner, Table, Button } from "react-bootstrap";
import axios from "axios";
import { BsPencil, BsTrash } from "react-icons/bs";
import { useHistory } from "react-router-dom";

const IndexPage = () => {
  const [category, setCategory] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const cancelToken = React.useRef(null);

  const history = useHistory();

  const getData = async () => {
    try {
      setLoading(true);
      const resp = await axios.get(
        `https://api.codingthailand.com/api/category`,
        { cancelToken: cancelToken.current.token }
      );
      // console.log(resp.data.data)
      setCategory(resp.data);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    cancelToken.current = axios.CancelToken.source();
    getData();

    return () => {
      // console.log('exit product page')
      cancelToken.current.cancel();
    };
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
        <p>{JSON.stringify(error)}</p>
      </div>
    );
  }

  return (
    <>
      <div className="container">
        <div className="row mt-4">
          <div className="col-md-12">
            <Button
              className="mb-3"
              variant="success"
              onClick={() => history.push("/category/create")}
            >
              Insert Data
            </Button>

            <h2>Category</h2>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Category News</th>
                  <th>Tool</th>
                </tr>
              </thead>
              <tbody>
                {category.map((c, index) => {
                  return (
                    <tr key={c.id}>
                      <td>{c.id}</td>
                      <td>{c.name}</td>
                      <td>
                        <Button
                          className="ml-2"
                          variant="outline-info"
                          size="sm"
                          onClick={() => history.push('/category/edit/' + c.id) }
                        >
                          <BsPencil />
                        </Button>
                        <Button
                          className="ml-2"
                          variant="outline-danger"
                          size="sm"
                          onClick={async () => {
                            const isConfirm = window.confirm(
                              "Are you sure to delete " + c.name + "?"
                            );
                            if (isConfirm === true) {
                              const resp = await axios.delete(
                                "https://api.codingthailand.com/api/category/" +
                                  c.id
                              );
                              alert(resp.data.message);
                              history.go(0);
                            }
                          }}
                        >
                          <BsTrash />
                        </Button>
                      </td>
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

export default IndexPage;
