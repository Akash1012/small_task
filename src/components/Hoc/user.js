import Hoc from "./hoc";

const Users = ({ data }) => {
  let filterData = data.map((users) => {
    return (
      <div key={users.id}>
        <h3>{users.name}</h3>
      </div>
    );
  });

  return (
    <>
      <h2>{filterData}</h2>
    </>
  );
};

const SearchUsers = Hoc(Users, "users");

export default SearchUsers;
