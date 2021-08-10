import React from "react";

import axios from "axios";

const AboutPage = () => {
  const [version, setVersion] = React.useState("");

  const getData = async () => {
    const resp = await axios.get("https://api.codingthailand.com/api/version");
    // console.log(resp.data.data.version)
    setVersion(resp.data.data.version);
  };

  React.useEffect(() => {
    // async function getData() {
    //     const resp = await axios.get('https://api.codingthailand.com/api/version')
    //     // console.log(resp.data.data.version)
    //     setVersion(resp.data.data.version)
    // }

    getData();
  }, []);

  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-md-12">
          <h2>About Me</h2>
          {version && <p>Backend API Version: {version}</p>}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
