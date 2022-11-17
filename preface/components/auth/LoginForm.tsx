import React from "react";
import Button from "./Button";
// import { useRouter } from "next/router";
import Input from "./Input";
import useLoginInput from "./hook/useLoginInput";
import { AuthServiceImpl } from "service/AuthService";

import { CLIENT_BASE_URL } from "../../lib/constants/constants";

const authService = new AuthServiceImpl(CLIENT_BASE_URL);

const LoginForm = () => {
  const { userInput, handleInputChange, isValidated } = useLoginInput();
  const { email, password } = userInput;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    authService.login({ email, password });
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
