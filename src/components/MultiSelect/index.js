import { useCallback, useEffect, useRef, useState } from "react";
import "./styles.css";
import Pill from "./Pill";

const MultiSelect = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setsuggestions] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [selectedUserSet, setSelectedUserSet] = useState(new Set());

  const inputRef = useRef(null);

  const fetchUsers = (value = "") => {
    // searchTerm?.trim() === "";

    if (value?.trim() === "") {
      setsuggestions([]);
      return;
    }
    // fetch(`https://dummyjson.com/users/search?q=${searchTerm}`)
    fetch(`https://dummyjson.com/users/search?q=${value}`)
      .then((res) => res.json())
      .then((data) => setsuggestions(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    // const fetchUsers = () => {
    //   if (searchTerm.trim() === "") {
    //     setsuggestions([]);
    //     return;
    //   }
    //   fetch(`https://dummyjson.com/users/search?q=${searchTerm}`)
    //     .then((res) => res.json())
    //     .then((data) => setsuggestions(data))
    //     .catch((err) => console.log(err));
    // };
    // [searchTerm]
    fetchUsers();
  }, []);

  const handleSelectUser = (user) => {
    setSelectedUser([...selectedUser, user]);
    setSelectedUserSet(new Set([...selectedUserSet, user.email]));
    setSearchTerm("");
    setsuggestions([]);
    inputRef.current.focus();
  };

  const handleRemoveUser = (user) => {
    const updatedUsers = selectedUser.filter((ur) => ur.id !== user.id);
    setSelectedUser(updatedUsers);
    const updateEmails = new Set([...selectedUserSet]);
    updateEmails.delete(user.email);
    setSelectedUserSet(updateEmails);
  };
  const handleKeyDown = (e) => {
    if (
      e.key === "Backspace" &&
      e.target.value === "" &&
      selectedUser.length > 0
    ) {
      handleRemoveUser(selectedUser[selectedUser.length - 1]);
    }
  };

  function debounce(fn) {
    let timer;
    return function (...args) {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        fn(...args);
      }, 1000);
    };
  }

  function handleInputChange(v) {
    fetchUsers(v);
  }

  const optimizeSearchCall = useCallback(debounce(handleInputChange), []);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    optimizeSearchCall(e.target.value);
  };

  return (
    <div className="user-search-container">
      <div className="user-search-input">
        {selectedUser.map((user) => {
          return (
            <Pill
              key={user.email}
              image={user.image}
              text={`${user.firstName} ${user.lastName}`}
              onClick={() => handleRemoveUser(user)}
            />
            //   <span className="user-pill" onClick={onClick}>
            //   <img src={image} alt={text} />
            //   <span>{text} &times;</span>
            // </span>
          );
        })}
        <div>
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => handleChange(e)}
            placeholder="search for users..."
            onKeyDown={handleKeyDown}
          />
          <ul className="suggestion-list">
            {suggestions?.users?.map((user) => {
              return (
                !selectedUserSet.has(user.email) && (
                  <li key={user.email} onClick={() => handleSelectUser(user)}>
                    <img src={user.image} alt={`${user.firstName}`} />
                    <span>
                      {user.firstName} {user.lastName}
                    </span>
                  </li>
                )
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MultiSelect;

// --------------------------------------------------------------------------------------------------------------------------------------------------

// import React from "react";
// import { useState, useEffect, useRef, useCallback } from "react";
// import "./style.css";

const MultiSelect_ = () => {
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedUser, setSelectedUser] = useState([]);
  const [saveUniquevalue, setsaveUniqueValue] = useState(new Set());
  const [activeIndex, setActiveIndex] = useState(null);
  const selectRef = useRef(null);
  const inputRef = useRef(null);

  const getTheData = (value = "") => {
    if (value.trim() === "") {
      setData([]);
      return;
    }
    fetch(`https://dummyjson.com/users/search?q=${value}`)
      .then((res) => res.json())
      .then((response) => setData(response.users));
  };

  useEffect(() => {
    getTheData();
    inputRef.current.focus();
  }, []);

  const setSelectedValue = (user) => {
    setSelectedUser([...selectedUser, user]);
    setsaveUniqueValue(new Set([...saveUniquevalue, user.id]));

    setData([]);
    setSearchValue("");
    inputRef.current.focus();
  };

  const removeSelect = (user) => {
    let updateData = selectedUser.filter((value) => value.id !== user.id);
    console.log("akash", saveUniquevalue);
    let updateUniquevalue = new Set([...saveUniquevalue]);
    updateUniquevalue.delete(user.id);
    setsaveUniqueValue(updateUniquevalue);
    setSelectedUser(updateData);
  };

  const debounce = (fn) => {
    let time;
    return function (...args) {
      if (time) {
        clearTimeout(time);
      }
      time = setTimeout(() => {
        fn(...args);
      }, 700);
    };
  };

  const makeApiCall = (value) => {
    getTheData(value);
  };

  let optimzedSearchCall = useCallback(debounce(makeApiCall), []);

  const handleChange = (event) => {
    let { value } = event.target;
    setSearchValue(value);
    optimzedSearchCall(value);
  };

  const handleKeyDown = (event) => {
    const keyCode = event.keyCode;
    setChange();
    if (
      event.key === "Backspace" &&
      event.target.value === "" &&
      selectedUser.length > 0
    ) {
      removeSelect(selectedUser[selectedUser.length - 1]);
      return;
    } else if (keyCode === 13) {
      // enter
      let name = data[activeIndex].firstName + data[activeIndex].lastName;
      setSearchValue(name);
      setActiveIndex(null);
      setData([]);
      return;
    } else if (keyCode === 40) {
      // key move down
      if (activeIndex === null || activeIndex === data.length - 1) {
        setActiveIndex(0);
        return;
      }
      setActiveIndex((prevIndex) => prevIndex + 1);
    } else if (keyCode === 38) {
      // move up
      if (activeIndex === 0) setActiveIndex(data.length - 1);
      else setActiveIndex((prevIndex) => prevIndex - 1);
    }
  };

  const setChange = () => {
    const selected = selectRef?.current?.querySelector(".active");
    if (selected) {
      selected?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  return (
    <>
      <h1>Multi Select</h1>
      <div className="user-search-container">
        <div className="user-search-input">
          {selectedUser.map((item) => {
            const { firstName, lastName, id } = item;
            return (
              <span
                key={id}
                className="multi-select"
                onClick={() => removeSelect(item)}
              >
                {firstName} {lastName} &times;
              </span>
            );
          })}
          <div>
            <input
              ref={inputRef}
              type="text"
              placeholder="Select User"
              value={searchValue}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
            <ul
              ref={selectRef}
              className="suggestion-list"
              style={{
                border: data.length > 0 && "1px solid",
              }}
            >
              {data.map((item, index) => {
                const { firstName, lastName, id } = item;
                return (
                  !saveUniquevalue.has(id) && (
                    <li
                      className={index === activeIndex && "active"}
                      key={id}
                      onClick={() => setSelectedValue(item)}
                    >
                      {firstName} {lastName}
                    </li>
                  )
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

// export default MultiSelect_;
