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
