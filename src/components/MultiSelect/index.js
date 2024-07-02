import { useEffect, useRef, useState } from "react";
import "./styles.css";
import Pill from "./Pill";

const MultiSelect = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setsuggestions] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [selectedUserSet, setSelectedUserSet] = useState(new Set());

  const inputRef = useRef(null);

  useEffect(() => {
    const fetchUsers = () => {
      if (searchTerm.trim() === "") {
        setsuggestions([]);
        return;
      }
      fetch(`https://dummyjson.com/users/search?q=${searchTerm}`)
        .then((res) => res.json())
        .then((data) => setsuggestions(data))
        .catch((err) => console.log(err));
    };
    fetchUsers();
  }, [searchTerm]);

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
            onChange={(e) => setSearchTerm(e.target.value)}
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
