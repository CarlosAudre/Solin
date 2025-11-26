import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import MainLayout from "./layout/MainLayout";
import Browse from "./pages/Browse";
import Profile from "./pages/Profile";
import BookDetail from "./pages/BookDetail";
import Auth from "./pages/Auth";
import ScrollToTop from "./utils/ScrollToTop";

// Protected Route Component
function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/auth" replace />;
  }
  
  return children;
}

function App() {
  return (
    <Router>
      <ScrollToTop/>
      <Routes>
        {/* Auth Route (Public) */}
        <Route path="/auth" element={<Auth />} />
        
        {/* Protected Routes */}
        <Route element={
          <ProtectedRoute>
            <MainLayout usuario="user"/>
          </ProtectedRoute>
        }>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path='/books/:id' element={<BookDetail/>}/>
        </Route>
        
        {/* Redirect unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;