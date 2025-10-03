import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ListUsers from "./pages/ListUsers";
import AddUser from "./pages/AddUser";
import UserDetails from "./pages/UserDetails";

function App() {
  return (
    <Router>
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        {/* HEADER */}
        <header
          style={{
            background: "#89CFF0", // baby blue
            padding: "16px 32px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "white",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          }}
        >
          <h1 style={{ fontSize: 22, fontWeight: 700 }}>User Dashboard</h1>
          <nav style={{ display: "flex", gap: 20 }}>
            <NavLink to="/">Dashboard</NavLink>
            <NavLink to="/users">User List</NavLink>
            <NavLink to="/add">Add User</NavLink>
            <NavLink to="/details">User Details</NavLink>
          </nav>
        </header>

        {/* CONTENT */}
        <main style={{ flex: 1, padding: 30 }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<ListUsers />} />
            <Route path="/add" element={<AddUser />} />
            <Route path="/details" element={<UserDetails />} />
          </Routes>
        </main>

        {/* FOOTER */}
        <footer
          style={{
            background: "#89CFF0", // baby blue
            color: "#ffffff",
            textAlign: "center",
            padding: "14px",
            fontSize: 14,
            boxShadow: "0 -4px 10px rgba(0,0,0,0.15)",
          }}
        >
          © {new Date().getFullYear()} User Dashboard. All rights reserved.
        </footer>
      </div>
    </Router>
  );
}

function NavLink({ to, children }) {
  return (
    <Link
      to={to}
      style={{
        textDecoration: "none",
        backgroundColor: "#89CFF0", // baby blue same as header
        color: "#fff",
        fontWeight: 500,
        fontSize: 16,
        padding: "8px 14px",
        borderRadius: 8,
        transition: "all 0.25s ease",
        
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.backgroundColor = "#62B5E5"; // darker baby blue
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.backgroundColor = "#89CFF0"; // normal baby blue
      }}
    >
      {children}
    </Link>
  );
}

export default App;
