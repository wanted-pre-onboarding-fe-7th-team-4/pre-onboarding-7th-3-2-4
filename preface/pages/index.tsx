import LoginLayout from "components/Layout/auth/LoginLayout";
import { NextPageWithLayout } from "./_app";
import LoginForm from "components/auth/LoginForm";

import axios from "axios";
import React, { useEffect } from "react";

const Home:NextPageWithLayout = () => {
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
  return <LoginForm />;
};

Home.getLayout = (page) => <LoginLayout>{page}</LoginLayout>;

export default Home;
