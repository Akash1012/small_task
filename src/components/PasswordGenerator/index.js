import { useState } from "react";

import usePasswordGenerator from "./Hooks/use-password-generator";
import PasswordStrengthGenerator from "./StrengthChecker";
import Checkbox from "./CheckBox";
import Button from "./Button";

import "./style.css";
const PasswordManager = () => {
  const [length, setLength] = useState(4);
  const [checkBoxData, setCheckBoxData] = useState([
    { title: "Include Uppercase letters", state: false },
    { title: "Include Lowercase letters", state: false },
    { title: "Include Numbers letters", state: false },
    { title: "Include Symbol letters", state: false },
  ]);

  const [copied, setCopied] = useState(false);

  const handleCheckBoxChange = (i) => {
    const updateCheckBoxData = [...checkBoxData];
    updateCheckBoxData[i].state = !updateCheckBoxData[i].state;
    setCheckBoxData(updateCheckBoxData);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const { password, errorMessage, generatedPassword } = usePasswordGenerator();

  return (
    <div className="container-password ">
      {password && (
        <div className="header">
          <div className="title">{password}</div>

          <Button
            customClass={"copyBtn"}
            text={copied ? "copied" : "copy"}
            onClick={handleCopy}
          />
        </div>
      )}
      <div className="charlength">
        <span>
          <label>Characters Length</label>
          <label>{length}</label>
        </span>
        <input
          type="range"
          min="4"
          max="20"
          value={length}
          onChange={(e) => setLength(e.target.value)}
        />
      </div>
      <div className="checkboxes">
        {checkBoxData.map((checkbox, index) => {
          return (
            <Checkbox
              key={index}
              title={checkbox.title}
              state={checkbox.state}
              onChange={() => handleCheckBoxChange(index)}
            />
          );
        })}
      </div>

      {errorMessage && <div className="errorMessage">{errorMessage}</div>}
      <PasswordStrengthGenerator password={password} />

      <Button
        customClass="generateBtn"
        text={" Generate Password"}
        onClick={() => {
          generatedPassword(checkBoxData, length);
        }}
      />
    </div>
  );
};

export default PasswordManager;
