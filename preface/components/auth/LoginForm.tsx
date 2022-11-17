import React from "react";
import Button from "./Button";
// import { useRouter } from "next/router";
import Input from "./Input";
import useLoginInput from "./hook/useLoginInput";
import Router from "next/router";
import { authApi } from "lib/api/instance";

const LoginForm = () => {
  const { userInput, handleInputChange, isValidated } = useLoginInput();
  const { email, password } = userInput;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    authApi.login({ email, password }).then(() => Router.replace("/account"));
  };
  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="email"
        type="text"
        name="email"
        placeholder="아이디를 입력하세요"
        value={email}
        onChange={handleInputChange}
      />
      <Input
        label="password"
        type="password"
        name="password"
        placeholder="비밀번호를 입력하세요"
        value={password}
        onChange={handleInputChange}
      />
      <Button type="submit" disabled={!isValidated()}>
        로그인
      </Button>
    </form>
  );
};

export default LoginForm;
