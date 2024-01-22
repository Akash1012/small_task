import { useState } from "react";
import "./styles.css'

function Cell({ filled, onClick, isDisabled }) {
  return (
    <button
      className={filled ? "cell cell-activated" : "cell"}
      type="button"
      onClick={!isDisabled ? onClick : () => {}}
    />
  );
}
function GridLight() {
  const [order, setOrder] = useState([]);
  const [isDeactivating, setIsDeactivating] = useState(false);

  const config = [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ];

  const deactivateCells = () => {
    setIsDeactivating(true);
    const timer = setInterval(() => {
      setOrder((orginalOrder) => {
        const newOrder = orginalOrder.slice();
        newOrder.pop();

        if (newOrder.length === 0) {
          clearInterval(timer);
          setIsDeactivating(false);
        }

        return newOrder;
      });
    }, 300);
  };
  const activateCell = (index) => {
    const newOrder = [...order, index];

    console.log(newOrder);
    setOrder(newOrder);

    if (newOrder.length === config.flat(1).filter(Boolean).length) {
      deactivateCells();
    }
  };
  return (
    <div className="wrapper">
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${config[0].length}, 1fr)`,
        }}
      >
        {config.flat(1).map((value, index) => {
          return value ? (
            <Cell
              key={index}
              isDisabled={order.includes(index) || isDeactivating}
              filled={order.includes(index)}
              onClick={() => activateCell(index)}
            />
          ) : (
            <span key={index}></span>
          );
        })}
      </div>
    </div>
  );
}

export default GridLight;
