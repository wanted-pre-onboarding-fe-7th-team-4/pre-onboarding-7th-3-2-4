import React from "react";
import Image from "next/image";
import Logo from "lib/assets/Logo.png";
import navlinks from "../../../lib/data/navlinks";
import Link from "next/link";

const Sidebar = () => {
  return (
    <aside className={"h-screen w-72 bg-navy text-gray4 "}>
      <div className={"flex items-center m-5"}>
        <Image src={Logo} alt="logo" width={40} height={40} />
        <h1 className={"ml-2 text-white font-bold text-3xl"}>PREFACE</h1>
      </div>
      <ul className={"flex flex-col"}>
        {navlinks.map((nav) => (
          <Link
            href={nav.link}
            key={nav.title}
            className={
              "h-10 p-3 pl-10 mb-2 flex items-center cursor-pointer hover:text-white hover:bg-blue"
            }
          >
            {nav.title}
          </Link>
        ))}
        <li
          className={
            "h-10 p-3 pl-10 mb-2 flex items-center cursor-pointer hover:text-white hover:bg-blue"
          }
        >
          로그아웃
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
