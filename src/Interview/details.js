import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Details = () => {
  let location = useLocation();
  const { details } = location.state;
  let navigate = useNavigate();
  //   const [detailsData] = useState(details);

  const { market_cap, market_cap_change_24h, price_change_percentage_24h } =
    details;

  const backToHome = () => {
    navigate("/");
  };
  return (
    <div>
      <button onClick={backToHome}>Back To Home</button>
      <h1>Details</h1>
      <p>market cap {market_cap}</p>
      <p>24-hour volum {market_cap_change_24h}</p>
      <p>price change percentag {price_change_percentage_24h}</p>
    </div>
  );
};

export default Details;
