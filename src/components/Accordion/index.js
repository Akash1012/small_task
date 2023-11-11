import { useState, useEffect } from "react";
import AccordianList from "./accordianList_1";
import AccordianList_2 from "./accordianList_2";

const Accordion = () => {
  const [data, setData] = useState([]);
  const [saveId, setSaveId] = useState(-1);

  useEffect(() => {
    const getTheData = () => {
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => response.json())
        .then((items) => setData(items.slice(0, 4)));
    };
    getTheData();
  }, []);

  return (
    <>
      <h3 className="header">Accordion Version 1</h3>
      {data.map((item, index) => {
        return <AccordianList key={index} item={item} />;
      })}

      <h3 className="header">Accordion Version 2</h3>

      {data.map((item, index) => {
        return (
          <AccordianList_2
            key={index}
            item={item}
            saveId={saveId}
            setSaveId={setSaveId}
          />
        );
      })}
    </>
  );
};

export default Accordion;
