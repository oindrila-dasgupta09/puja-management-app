import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Pujas from "./pages/Pujas";
import Purohits from "./pages/Purohits";
import Users from "./pages/Users";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/pujas"
          element={<Pujas />}
        />

        <Route
          path="/purohits"
          element={<Purohits />}
        />

        <Route
          path="/users"
          element={<Users />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
