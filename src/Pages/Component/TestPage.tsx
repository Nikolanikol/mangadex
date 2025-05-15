import axios from "axios";
import React, { useEffect } from "react";

const TestPage = () => {
  useEffect(() => {
    axios
      .get(`http://localhost:3000/getmanga`)
      .then((res) => console.log(res.data));
  }, []);
  return <div>my page</div>;
};

export default TestPage;
