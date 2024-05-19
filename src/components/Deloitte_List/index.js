import { useState } from "react";
import "./styles.css";

const ChidComp = (props) => {
  const { toogleItem, items } = props;

  const toogle = (id) => {
    toogleItem(id);
  };

  return (
    <div>
      <ul>
        {items.map((item) => {
          const { checked, id, value } = item;
          return (
            <li key={id}>
              <input
                type="checkbox"
                checked={checked}
                onClick={() => toogle(id)}
              />
              <span>{value}</span>
            </li>
          );
        })}
      </ul>
      <label>
        Sum or checked:
        {items
          .filter((item) => Boolean(item.checked))
          .reduce((acc, curr) => {
            return acc + curr.value;
          }, 0)}
      </label>
    </div>
  );
};

const ListInterview = () => {
  const [items, setItems] = useState([
    { id: 1, value: 1, checked: false },
    { id: 2, value: 2, checked: false },
    { id: 3, value: 3, checked: false },
    { id: 4, value: 10, checked: true },
  ]);

  const toogleItem = (id) => {
    setItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            checked: !item.checked,
          };
        }
        return item;
      });
    });
  };

  return (
    <div className="header1">
      <h1>List</h1>
      <ChidComp toogleItem={toogleItem} items={items} />
    </div>
  );
};

export default ListInterview;
