import React from "react";

interface Props {
  children: React.ReactNode;
}

const Content = ({ children }: Props) => {
  return (
    <main
      className={
        "w-full min-w-[50%] bg-gray1 flex justify-center items-center p-7 mx-auto h-[calc(100vh-96px)]"
      }
    >
      {children}
    </main>
  );
};

export default Content;
