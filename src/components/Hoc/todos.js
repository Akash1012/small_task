import Hoc from "./hoc";

const Todos = ({ data }) => {
  let filterData = data.slice(0, 10).map((users) => {
    return (
      <div key={users.id}>
        <h3>{users.title}</h3>
      </div>
    );
  });
  return <>{filterData}</>;
};

const Td = Hoc(Todos, "todos");

export default Td;
