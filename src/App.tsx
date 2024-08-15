import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./auth/Login";
import Dashboard from "./dashboard/Dashboard";
import Register from "./auth/Register";
import PrivateRoute from "./utils/PrivateRoute";
import Home from "./pages/Home";
import Page404 from "./pages/Page404";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Page404 />} />
        <Route
          path="/dashboard"
          element={<PrivateRoute component={Dashboard} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
