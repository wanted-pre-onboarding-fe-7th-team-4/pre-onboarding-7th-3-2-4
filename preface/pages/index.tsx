import axios from "axios";
import React, { useEffect } from "react";

const Home = () => {
  const request = async () => {
    const response = await axios.post("/api/login?email='hi@naver.com'");
    console.log(response.data);
    return response.data;
  };

  useEffect(() => {
    request();
  }, []);
  return <div>HELLO WORLD</div>;
};

export default Home;
