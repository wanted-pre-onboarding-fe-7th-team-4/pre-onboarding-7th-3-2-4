import LoginLayout from "components/Layout/auth/LoginLayout";
import React from "react";
import { NextPageWithLayout } from "./_app";
import LoginForm from "components/auth/LoginForm";

const Home: NextPageWithLayout = () => {
  return <LoginForm />;
};

Home.getLayout = (page) => <LoginLayout>{page}</LoginLayout>;

export default Home;
