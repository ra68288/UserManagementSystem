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
              <HoverLink to="/">Dashboard</HoverLink>
              <HoverLink to="/users">User List</HoverLink>
              <HoverLink to="/add">Add User</HoverLink>
              <HoverLink to="/details">User Details</HoverLink>
            </nav>
            {/* DARK MODE TOGGLE */}
            <HoverButton onClick={toggleDarkMode} darkMode={darkMode}>
              {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
            </HoverButton>
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

// Hover button me smooth darken effect
function HoverButton({ children, onClick, darkMode }) {
  const [hover, setHover] = useState(false);

  const baseColor = darkMode ? "#ecc94b" : "#4a5568";
  const hoverColor = darkenColor(baseColor, 30);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        padding: "8px 14px",
        borderRadius: 8,
        border: "none",
        cursor: "pointer",
        backgroundColor: hover ? hoverColor : baseColor,
        color: darkMode ? "#2d3748" : "#fff",
        fontWeight: 600,
        transition: "0.25s",
      }}
    >
      {children}
    </button>
  );
}

// Hover link me smooth effect
function HoverLink({ to, children }) {
  const [hover, setHover] = useState(false);

  const baseColor = "#fff";
  const hoverColor = "#e2e8f0";

  return (
    <Link
      to={to}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        textDecoration: "none",
        color: hover ? hoverColor : baseColor,
        padding: "8px 14px",
        borderRadius: 8,
        transition: "0.25s",
      }}
    >
      {children}
    </Link>
  );
}

// Funksion i thjesht per te errësuar ngjyrën
function darkenColor(color, amount) {
  let col = color.replace("#", "");
  if (col.length === 3) col = col.split("").map(c => c + c).join("");
  const num = parseInt(col, 16);
  let r = Math.max(0, ((num >> 16) & 0xff) - amount);
  let g = Math.max(0, ((num >> 8) & 0xff) - amount);
  let b = Math.max(0, (num & 0xff) - amount);
  return `rgb(${r},${g},${b})`;
}

export default App;
