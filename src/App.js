import "./App.css";
import GridLight from "./components/Grid-Light";
import SearchUsers from "./components/Hoc/user";
import Td from "./components/Hoc/todos";
import Pagination from "./components/Pagination";
import PasswordManager from "./components/PasswordGenerator";
import Toast from "./components/ToastComp";

function App() {
  return (
    <div>
      {/* <PasswordManager /> */}
      <SearchUsers />
      <Td />
    </div>
  );
}

export default App;
