import { Fragment } from "react";

const PasswordStrengthGenerator = ({ password = "" }) => {
  const generatedPasswordStrength = () => {
    const passwordStrength = password.length;
    if (passwordStrength < 1) {
      return "";
    } else if (passwordStrength < 4) {
      return "Very Weak";
    } else if (passwordStrength < 8) {
      return "Poor";
    } else if (passwordStrength < 12) {
      return "Medium";
    } else if (passwordStrength < 16) {
      return "Strong";
    } else {
      return "Very Strong";
    }
  };

  const passwordStrength = generatedPasswordStrength();
  if (!passwordStrength) return <Fragment></Fragment>;

  return (
    <div className="password-strength">
      Strength:{" "}
      <span
        style={{
          fontWeight: "bold",
        }}
      >
        {passwordStrength}
      </span>
    </div>
  );
};

export default PasswordStrengthGenerator;
