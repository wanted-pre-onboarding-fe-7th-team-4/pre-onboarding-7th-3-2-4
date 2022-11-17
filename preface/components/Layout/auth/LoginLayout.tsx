import React from "react";
import Image from "next/image";
import Logo from "lib/assets/logo.png";
import Footer from "../dashboard/Footer";

interface Props {
  children: React.ReactNode;
}
const LoginLayout = ({ children }: Props) => {
  return (
    <div className={"bg-gray1"}>
      <div className=" h-[calc(100vh-56px)] flex flex-col justify-center items-center">
        <div className={"flex flex-row items-center"}>
          <Image
            src={Logo}
            alt="logo"
            width={60}
            height={60}
            className={"rounded-lg"}
          />
          <h1 className={"text-5xl text-navy font-bold ml-3"}>PREFACE</h1>
        </div>
        <section
          className={"w-96 p-7 mt-10 mb-4 rounded-md drop-shadow-md bg-white "}
        >
          <h2 className={"font-bold text-black text-xl mb-3"}>로그인</h2>
          {children}
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default LoginLayout;
