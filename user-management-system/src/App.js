import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ListUsers from "./pages/ListUsers";
import AddUser from "./pages/AddUser";
import UserDetails from "./pages/UserDetails";

function App() {
  const [users, setUsers] = useState([]); // state globale për userat

  // funksioni që shton user
  const handleAddUser = (user) => {
    setUsers([user, ...users]);
  };

  return (
    <Router>
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        {/* HEADER */}
        <header style={{ background: "#89CFF0", padding: "16px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", color: "white" }}>
          <h1>User Dashboard</h1>
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
            <Route path="/" element={<Dashboard users={users} />} />
            <Route path="/users" element={<ListUsers users={users} setUsers={setUsers} />} />
            <Route path="/add" element={<AddUser onAddUser={handleAddUser} />} />
            <Route path="/details" element={<UserDetails users={users} />} />
          </Routes>
        </main>

        {/* FOOTER */}
        <footer style={{ background: "#89CFF0", color: "#fff", textAlign: "center", padding: "14px" }}>
          © {new Date().getFullYear()} User Dashboard
        </footer>
      </div>
    </Router>
  );
}

function NavLink({ to, children }) {
  return (
    <Link to={to} style={{ textDecoration: "none", color: "#fff", padding: "8px 14px", borderRadius: 8 }}>
      {children}
    </Link>
  );
}

export default App;
