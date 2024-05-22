import { useState } from "react";
import "./style.css";

let dummyData = [
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
];

const DD = () => {
  const [data, setData] = useState(dummyData);

  const [search, setSearch] = useState("");

  const onChange = (e) => {
    const { value } = e.target;
    setSearch(value);

    if (!value.length) {
      setData(dummyData);
      return;
    }

    const filteredData = data.filter((item) => {
      if (
        item.name.toLowerCase().includes(value.toLowerCase()) ||
        item.email.toLowerCase().includes(value.toLowerCase()) ||
        item.phone.toString().includes(value)
      ) {
        return true;
      }
    });

    console.log("filteredData", filteredData);

    setData(filteredData);
  };

  const sortTableDataDes = (value) => {
    const copy = [...data];
    if (value === "phone") {
      const sortForPhone = copy.sort((a, b) => b.phone - a.phone);
      setData(sortForPhone);
      return;
    }
    const sortedData = copy.sort((a, b) => {
      console.log(a[value]);
      if (a[value] > b[value]) {
        return 1;
      } else if (a[value] < b[value]) {
        return -1;
      } else {
        return 0;
      }
    });
    setData(sortedData);
  };

  const sortTableDataAsc = (value) => {
    const sortByName = [...data];
    if (value === "phone") {
      const sortForPhone = sortByName.sort((a, b) => a.phone - b.phone);
      setData(sortForPhone);
      return;
    }
    const sortedData = sortByName.slice().sort((a, b) => {
      console.log(a[value]);
      if (a[value] > b[value]) {
        return -1;
      } else if (a[value] < b[value]) {
        return 1;
      } else {
        return 0;
      }
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
            Name <span onClick={() => sortTableDataAsc("name")}>U</span>
            <span onClick={() => sortTableDataDes("name")}>D</span>
          </th>
          <th>
            Email
            <span onClick={() => sortTableDataAsc("email")}>U</span>
            <span onClick={() => sortTableDataDes("email")}>D</span>
          </th>
          <th>
            Phone <span onClick={() => sortTableDataAsc("phone")}>U</span>
            <span onClick={() => sortTableDataDes("phone")}>D</span>
          </th>
        </tr>
        {data.map((item, index) => {
          return (
            <tr key={item.id}>
              <td>{index}</td>
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
