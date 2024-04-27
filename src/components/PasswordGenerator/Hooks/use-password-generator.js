import { useState } from "react";

const usePasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const generatedPassword = (checkboxData, length) => {
    let charset = "";
    let generatedPassword = "";

    const selectedOption = checkboxData.filter((checkbox) => checkbox.state);

    if (selectedOption.length === 0) {
      setErrorMessage("Please select atleast one option");
      setPassword("");
      return;
    }
    selectedOption.forEach((option) => {
      switch (option.title) {
        case "Include Uppercase letters":
          charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
          break;
        case "Include Lowercase letters":
          charset += "abcdefghijklmnopqrstuvwxyz";
          break;
        case "Include Numbers letters":
          charset += "0123456789";
          break;
        case "Include Symbol letters":
          charset += "!@#$%^&*";
          break;
        default:
          break;
      }
    });

    for (let i = 0; i < length; i++) {
      generatedPassword =
        generatedPassword + charset[Math.floor(Math.random() * charset.length)];
    }

    setPassword(generatedPassword);
    setErrorMessage("");
  };

  return {
    password,
    errorMessage,
    generatedPassword,
  };
};

export default usePasswordGenerator;
