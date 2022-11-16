import React, { useState } from "react";

const useInput = () => {
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = event;
    setUserInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isValidated = () =>
    userInput.email.trim() !== "" && userInput.password.trim() !== "";

  return { userInput, handleInputChange, isValidated };
};

export default useInput;
