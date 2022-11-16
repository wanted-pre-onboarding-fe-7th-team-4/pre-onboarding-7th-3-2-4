import axios from "axios";
import React, { useEffect } from "react";

const Home = () => {
  const request = async () => {
    const response = await axios.post("/api/login", {
      email: "test@gmail.com",
      password: "123qwe!@"
    });

    console.log(response.data);
    return response;
  };

  useEffect(() => {
    request();
  }, []);
  return <div>HELLO WORLD</div>;
};

export default Home;
