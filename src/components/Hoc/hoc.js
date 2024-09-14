import { useState, useEffect } from "react";

const Hoc = (WrappedComponent, entity) => {
  const NewComponent = () => {
    const [data, setData] = useState([]);
    const [term, setTerm] = useState("");
    useEffect(() => {
      fetch(`https://jsonplaceholder.typicode.com/${entity}`)
        .then((response) => response.json())
        .then((data) => setData(data));
    }, []);

    const filterData = data.filter((item) => {
      if (entity === "users") {
        // debugger;
        return item.name.indexOf(term) >= 0;
      }
      if (entity === "todos") {
        return item.title.indexOf(term) >= 0;
      }
    });

    console.log("filterData", filterData, term);
    return (
      <>
        <h2>{entity}</h2>
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />

        <WrappedComponent data={filterData}></WrappedComponent>
      </>
    );
  };

  return NewComponent;
};

export default Hoc;
