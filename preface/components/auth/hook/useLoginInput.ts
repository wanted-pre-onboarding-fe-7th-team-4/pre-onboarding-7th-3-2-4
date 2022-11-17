import React, { useState } from "react";

const useLoginInput = () => {
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

export default useLoginInput;
