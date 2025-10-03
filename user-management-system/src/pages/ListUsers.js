import React, { useState, useEffect } from "react";
import UserItem from "../components/UserItem";

function ListUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(data => setUsers(data.map(u => ({ ...u, createdAt: new Date() }))));
  }, []);

  const deleteUser = id => setUsers(users.filter(u => u.id !== id));
  const updateUser = (id, updated) => setUsers(users.map(u => (u.id === id ? updated : u)));

  const filtered = users.filter(u =>
    (u.name && u.name.toLowerCase().includes(search.toLowerCase())) ||
    (u.email && u.email.toLowerCase().includes(search.toLowerCase()))
  );

  const sorted = [...filtered].sort((a, b) => sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));

  // Pagination
  const indexOfLast = currentPage * usersPerPage;
  const indexOfFirst = indexOfLast - usersPerPage;
  const currentUsers = sorted.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(sorted.length / usersPerPage);

  return (
    <div style={{ maxWidth: 950, margin: "40px auto", padding: 20, fontFamily: "Segoe UI, Arial, sans-serif" }}>
      <h2 style={{ marginBottom: 20 }}>Users List</h2>

      <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ flex: 1, minWidth: 200, padding: 12, borderRadius: 10, border: "1px solid #cbd5e0", fontSize: 16, marginBottom: 10 }}
        />
        <button
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          style={{ padding: "12px 18px", borderRadius: 10, border: "none", backgroundColor: "#3182ce", color: "#fff", fontWeight: 600, cursor: "pointer", fontSize: 16 }}
        >
          Sort by Name ({sortOrder})
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 14 }}>
        {currentUsers.map(u => (
          <UserItem key={u.id} user={u} onDelete={deleteUser} onUpdate={updateUser} />
        ))}
      </div>

      {/* Pagination Buttons */}
      {totalPages > 1 && (
        <div style={{ display: "flex", justifyContent: "center", marginTop: 30, gap: 10 }}>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              style={{
                padding: "8px 12px",
                borderRadius: 8,
                border: "none",
                backgroundColor: currentPage === i + 1 ? "#3182ce" : "#e2e8f0",
                color: currentPage === i + 1 ? "#fff" : "#2d3748",
                cursor: "pointer",
                fontWeight: 600
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ListUsers;
