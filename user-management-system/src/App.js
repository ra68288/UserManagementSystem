import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ListUsers from "./pages/ListUsers";
import AddUser from "./pages/AddUser";
import UserDetails from "./pages/UserDetails";

function App() {
  const [users, setUsers] = useState([]); // state globale për userat
  const [darkMode, setDarkMode] = useState(false); // dark mode

  const handleAddUser = (user) => {
    setUsers([user, ...users]);
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const appStyles = {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: darkMode ? "#1a202c" : "#f0f4f8",
    color: darkMode ? "#e2e8f0" : "#1a202c",
    transition: "0.3s",
  };

  const headerStyles = {
    background: darkMode ? "#2d3748" : "#89CFF0",
    padding: "16px 32px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#fff",
  };

  const navLinkStyles = {
    textDecoration: "none",
    color: "#fff",
    padding: "8px 14px",
    borderRadius: 8,
  };

  const footerStyles = {
    background: darkMode ? "#2d3748" : "#89CFF0",
    color: "#fff",
    textAlign: "center",
    padding: "14px",
  };

  return (
    <Router>
      <div style={appStyles}>
        {/* HEADER */}
        <header style={headerStyles}>
          <h1>User Management System</h1>
          <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
            <nav style={{ display: "flex", gap: 20 }}>
              <NavLink to="/" style={navLinkStyles}>Dashboard</NavLink>
              <NavLink to="/users" style={navLinkStyles}>User List</NavLink>
              <NavLink to="/add" style={navLinkStyles}>Add User</NavLink>
              <NavLink to="/details" style={navLinkStyles}>User Details</NavLink>
            </nav>
            {/* DARK MODE TOGGLE */}
            <button
              onClick={toggleDarkMode}
              style={{
                padding: "8px 14px",
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
                backgroundColor: darkMode ? "#ecc94b" : "#4a5568",
                color: darkMode ? "#2d3748" : "#fff",
                fontWeight: 600,
              }}
            >
              {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
            </button>
          </div>
        </header>

        {/* CONTENT */}
        <main style={{ flex: 1, padding: 30 }}>
          <Routes>
            <Route path="/" element={<Dashboard users={users} darkMode={darkMode} />} />
            <Route path="/users" element={<ListUsers users={users} setUsers={setUsers} darkMode={darkMode} />} />
            <Route path="/add" element={<AddUser onAddUser={handleAddUser} darkMode={darkMode} />} />
            <Route path="/details" element={<UserDetails users={users} darkMode={darkMode} />} />
          </Routes>
        </main>

        {/* FOOTER */}
        <footer style={footerStyles}>
          © {new Date().getFullYear()} User Dashboard
        </footer>
      </div>
    </Router>
  );
}

function NavLink({ to, children, style }) {
  return (
    <Link to={to} style={style}>
      {children}
    </Link>
  );
}

export default App;
