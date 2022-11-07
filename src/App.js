import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Main } from "./components/Main/Main";
import { AddTask } from "./components/AddTask/AddTask";
import { Error } from "./components/Error/Error";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/add_task" element={<AddTask />} />
        {/* <Route path="*" element={<Error />} /> */}
      </Routes>
    </div>
  );
}

export default App;
