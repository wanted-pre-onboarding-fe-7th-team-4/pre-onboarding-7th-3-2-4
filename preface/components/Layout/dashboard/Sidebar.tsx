import React from "react";
import Image from "next/image";
import {
  AiOutlineDashboard,
  AiOutlineUser,
  AiOutlineLogout
} from "react-icons/ai";
import Link from "next/link";
import { useRouter } from "next/router";
import { VscGraphLine } from "react-icons/vsc";

const Sidebar = () => {
  const router = useRouter();
  return (
    <div className="w-1/4 h-screen bg-myDarkBlue text-white ">
      <h1 className="w-full flex justify-evenly items-center text-5xl my-5 mx-auto font-bold">
        <Image
          src="/logo.png"
          alt="PREFACE Logo"
          width={50}
          height={50}
          className="rounded-md"
        />
        PREFACE
      </h1>
      <nav className="flex flex-wrap justify-center text-xl text-neutral-500">
        <a className="flex items-center w-full h-16 pl-8 hover:text-white">
          <AiOutlineDashboard /> 대시 보드
        </a>
        <Link href="/accounts">
          <a
            className={`flex items-center w-full h-16 pl-8 hover:text-white ${
              router.pathname === "/accounts" ? "bg-myBlue text-white" : ""
            }`}
          >
            <VscGraphLine /> 투자 계좌
          </a>
        </Link>
        <Link href="/users">
          <a
            className={`flex items-center w-full h-16 pl-8 hover:text-white ${
              router.pathname === "/users" ? "bg-myBlue text-white" : ""
            }`}
          >
            <AiOutlineUser /> 사용자
          </a>
        </Link>
        <Link href="/logout">
          <a className="flex items-center w-full h-16 pl-8 hover:text-white">
            <AiOutlineLogout /> 로그아웃
          </a>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
