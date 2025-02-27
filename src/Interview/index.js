/* // Create a React application that consumes the following 
API: 
https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=false. 
The program should display a list of the top 5 cryptocurrencies on a dashboard, 
showing their name, symbol, and current price. When a user clicks on a cryptocurrency's name, 
a details page should open, providing additional information such as market cap, 24-hour volume, 
and price change percentage. The data should be managed using component state, ensuring
 that the API is only called once to fetch the data when the component is first mounted, 
and the fetched data is used across the application without re-fetching. */

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Currency = () => {
  const [currency, setCurrency] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    const getThedata = () => {
      fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=false"
      )
        .then((response) => response.json())
        .then((data) => setCurrency(data));
    };
    if (!currency.length) {
      getThedata();
    }
  }, []);

  const showDetails = (cr) => {
    navigate("/details", { state: { details: cr } });
  };

  return (
    <div
      className="main_container"
      style={{
        padding: "10px",
        margin: "10px",
      }}
    >
      {currency.map((cr) => {
        const { name, symbol, current_price, id } = cr;
        return (
          <div
            key={id}
            className="currency_card"
            style={{
              border: "2px solid",
              padding: "10px",
            }}
          >
            <p onClick={() => showDetails(cr)}>Name: {name}</p>
            <p>Symbol: {symbol}</p>
            <p>Price: {current_price}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Currency;
