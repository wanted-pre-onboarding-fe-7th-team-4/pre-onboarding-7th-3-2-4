import React from "react";
import Image from "next/image";
import {
  AiOutlineDashboard,
  AiOutlineUser,
  AiOutlineLogout
} from "react-icons/ai";
import Logo from "lib/assets/logo.png";
import ActiveLink from "components/ActiveLink";
import { VscGraphLine } from "react-icons/vsc";
import { authApi } from "lib/api/instance";
import Router from "next/router";

const Sidebar = () => {
  const logout = () => {
    authApi.logout().then(() => Router.replace("/"));
  };
  return (
    <div className="min-h-screen bg-primary1 text-white ">
      <h1 className="w-full flex justify-evenly items-center text-4xl my-5 mx-auto font-bold">
        <Image
          src={Logo}
          alt="PREFACE Logo"
          width={45}
          height={45}
          className="rounded-md"
        />
        PREFACE
      </h1>
      <nav className="flex flex-wrap justify-center text-xl text-neutral-500">
        <ActiveLink
          href="#"
          activeClassName="bg-primary3 text-white"
          className="flex items-center w-full h-16 pl-8 gap-5 hover:text-white hover:bg-blue-900"
        >
          <AiOutlineDashboard /> 대시 보드
        </ActiveLink>
        <ActiveLink
          href="/account"
          activeClassName="bg-primary3 text-white"
          className="flex items-center w-full h-16 pl-8 gap-5 hover:text-white  hover:bg-blue-900"
        >
          <VscGraphLine /> 투자 계좌
        </ActiveLink>
        <ActiveLink
          href="#"
          activeClassName="bg-primary3 text-white"
          className="flex items-center w-full h-16 pl-8 gap-5 hover:text-white hover:bg-blue-900"
        >
          <AiOutlineUser /> 사용자
        </ActiveLink>
        <button
          onClick={logout}
          className="flex items-center w-full h-16 pl-8 gap-5 hover:text-white hover:bg-blue-900"
        >
          <AiOutlineLogout /> 로그아웃
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
