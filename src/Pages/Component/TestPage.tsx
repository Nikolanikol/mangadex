import axios from "axios";
import React, { useEffect } from "react";

const TestPage = () => {
  useEffect(() => {
    axios
      .get(`https://server-black-eight.vercel.app/getmanga`)
      .then((res) => console.log(res.data));
  }, []);
  return <div>my page</div>;
};

export default TestPage;
