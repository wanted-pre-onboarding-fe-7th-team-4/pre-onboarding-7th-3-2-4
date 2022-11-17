import React from "react";
import Image from "next/image";
import {
  AiOutlineDashboard,
  AiOutlineUser,
  AiOutlineLogout
} from "react-icons/ai";
import Logo from "lib/assets/logo.png";
import ActiveLink from "components/ActiveLink";
// import { useRouter } from "next/router";
import { VscGraphLine } from "react-icons/vsc";

const Sidebar = () => {
  // const router = useRouter();
  return (
    <div className="w-1/4 h-screen bg-primary1 text-white ">
      <h1 className="w-full flex justify-evenly items-center text-5xl my-5 mx-auto font-bold">
        <Image
          src={Logo}
          alt="PREFACE Logo"
          width={50}
          height={50}
          className="rounded-md"
        />
        PREFACE
      </h1>
      <nav className="flex flex-wrap justify-center text-xl text-neutral-500">
        <a className="flex items-center w-full h-16 pl-8 hover:text-white hover:bg-blue-900">
          <AiOutlineDashboard /> 대시 보드
        </a>
        <ActiveLink
          href="/account"
          activeClassName="bg-primary3 text-white"
          className="flex items-center w-full h-16 pl-8 hover:text-white  hover:bg-blue-900"
        >
          <VscGraphLine /> 투자 계좌
        </ActiveLink>
        <ActiveLink
          href="#"
          activeClassName="bg-primary3 text-white"
          className="flex items-center w-full h-16 pl-8 hover:text-white hover:bg-blue-900"
        >
          <AiOutlineUser /> 사용자
        </ActiveLink>
        <button className="flex items-center w-full h-16 pl-8 hover:text-white hover:bg-blue-900">
          <AiOutlineLogout /> 로그아웃
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
