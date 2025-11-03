import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MainLayout from "./layout/MainLayout";
import Browse from "./pages/Browse";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout usuario="user"/>}>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse/>}/>
          <Route path="/profile" element={<Profile/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
