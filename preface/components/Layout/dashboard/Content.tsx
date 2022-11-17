import React from "react";

interface Props {
  children: React.ReactNode;
}

const Content = ({ children }: Props) => {
  return (
    <main className="w-full h-4/5 bg-myGray min-h-[calc(100vh-112px)]">
      {children}
    </main>
  );
};

export default Content;
