import { useState } from "react";
import "./style.css";

const DD = () => {
  const [data, setData] = useState([
    {
      id: 1,
      name: "A",
      email: "akash2090@gmail.com",
      phone: 100,
    },
    {
      id: 2,
      name: "B",
      email: "kumar@gmail.com",
      phone: 400,
    },
    {
      id: 3,
      name: "C",
      email: "gupta.akash2090@gmail.com",
      phone: 700,
    },
    {
      id: 4,
      name: "D",
      email: "gupta.akash2090@gmail.com",
      phone: 800,
    },
    {
      id: 5,
      name: "E",
      email: "gupta.akash2090@gmail.com",
      phone: 10000,
    },
    {
      id: 6,
      name: "G",
      email: "gupta.akash2090@gmail.com",
      phone: 20000,
    },
    {
      id: 7,
      name: "F",
      email: "gupta.akash2090@gmail.com",
      phone: 1,
    },
  ]);

  const [search, setSearch] = useState("");

  const onChange = (e) => {
    const { value } = e.target;
    setSearch(value);
  };

  const sortTableData = (value) => {
    const sortByName = [...data];
    const sortedData = sortByName.slice().sort((a, b) => {
      console.log(a[value]);
      if (a[value] > b[value]) {
        return -1;
      } else if (a[value] < b[value]) {
        return 1;
      } else {
        return 0;
      }
      //   return a[value] - b[value];
    });

    console.log(sortedData);
    // setData([]);
    setData(sortedData);
  };

  return (
    <div className="mainHeader">
      <input type="search" value={search} onChange={onChange} />
      <table>
        <tr>
          <th>Id</th>
          <th>
            Name <span onClick={() => sortTableData("name")}>^</span>
          </th>
          <th>
            Email
            <span onClick={() => sortTableData("email")}>^</span>
          </th>
          <th>
            Phone <span onClick={() => sortTableData("phone")}>^</span>
          </th>
        </tr>
        {data.map((item, index) => {
          return (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default DD;
