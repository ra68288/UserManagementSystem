import React, { useState, useEffect } from "react";
import UserItem from "../components/UserItem";

function ListUsers({ darkMode }) {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) =>
        setUsers(data.map((u) => ({ ...u, createdAt: new Date() })))
      );
  }, []);

  const deleteUser = (id) => setUsers(users.filter((u) => u.id !== id));
  const updateUser = (id, updated) =>
    setUsers(users.map((u) => (u.id === id ? updated : u)));

  // --- Highlight search matches
  const highlightText = (text) => {
    if (!search) return text;
    const regex = new RegExp(`(${search})`, "gi");
    return text.split(regex).map((part, i) =>
      regex.test(part) ? (
        <span key={i} style={{ backgroundColor: "#ffeaa7", borderRadius: 4 }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  // --- Filter & Sort ---
  const filtered = users.filter((u) => {
    const searchText = search.toLowerCase();
    return (
      u.name?.toLowerCase().includes(searchText) ||
      u.email?.toLowerCase().includes(searchText) ||
      u.phone?.toLowerCase().includes(searchText) ||
      u.website?.toLowerCase().includes(searchText) ||
      u.company?.name?.toLowerCase().includes(searchText) ||
      u.address?.street?.toLowerCase().includes(searchText)
    );
  });

  const sorted = [...filtered].sort((a, b) =>
    sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
  );

  // --- Pagination ---
  const indexOfLast = currentPage * usersPerPage;
  const indexOfFirst = indexOfLast - usersPerPage;
  const currentUsers = sorted.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(sorted.length / usersPerPage);

  return (
    <div
      style={{
        maxWidth: 950,
        margin: "40px auto",
        padding: 20,
        fontFamily: "Segoe UI, Arial, sans-serif",
        color: darkMode ? "#e2e8f0" : "#1a202c",
        transition: "0.3s",
      }}
    >
      <h2 style={{ marginBottom: 20, fontSize: 28, fontWeight: 600 }}>
        👥 Users List
      </h2>

      {/* Search + Sort */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
          marginBottom: 20,
        }}
      >
        <input
          type="text"
          placeholder="Search by name, email, phone, company, address..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            minWidth: 250,
            padding: 12,
            borderRadius: 12,
            border: "1px solid #cbd5e0",
            fontSize: 16,
            boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
            transition: "0.25s",
            backgroundColor: darkMode ? "#2d3748" : "#fff",
            color: darkMode ? "#e2e8f0" : "#1a202c",
          }}
        />
        <button
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          style={{
            padding: "12px 20px",
            borderRadius: 12,
            border: "none",
            backgroundColor: "#3182ce",
            color: "#fff",
            fontWeight: 600,
            cursor: "pointer",
            transition: "0.3s",
            boxShadow: "0 4px 10px rgba(0,0,0,0.12)",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#2b6cb0")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#3182ce")}
        >
          Sort by Name ({sortOrder})
        </button>
      </div>

      {/* Users Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>
        {currentUsers.map((u) => (
          <div
            key={u.id}
            style={{
              padding: 16,
              borderRadius: 14,
              backgroundColor: darkMode ? "#2d3748" : "#fff",
              boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
              transition: "0.3s",
              cursor: "pointer",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow = "0 12px 28px rgba(0,0,0,0.16)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.08)";
            }}
          >
            <UserItem
              user={u}
              onDelete={deleteUser}
              onUpdate={updateUser}
              highlightText={highlightText}
              darkMode={darkMode}
            />
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 30,
            gap: 10,
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            style={{
              padding: "8px 14px",
              borderRadius: 10,
              border: "none",
              backgroundColor: "#718096",
              color: "#fff",
              fontWeight: 600,
              cursor: "pointer",
              transition: "0.25s",
            }}
          >
            ⬅ Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              style={{
                padding: "10px 14px",
                borderRadius: 10,
                border: "none",
                backgroundColor: currentPage === i + 1 ? "#3182ce" : "#e2e8f0",
                color: currentPage === i + 1 ? "#fff" : "#4a5568",
                fontWeight: 600,
                cursor: "pointer",
                transition: "0.25s",
              }}
              onMouseOver={(e) => {
                if (currentPage !== i + 1) e.currentTarget.style.backgroundColor = "#3182ce";
              }}
              onMouseOut={(e) => {
                if (currentPage !== i + 1) e.currentTarget.style.backgroundColor = "#e2e8f0";
              }}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            style={{
              padding: "8px 14px",
              borderRadius: 10,
              border: "none",
              backgroundColor: "#718096",
              color: "#fff",
              fontWeight: 600,
              cursor: "pointer",
              transition: "0.25s",
            }}
          >
            Next ➡
          </button>
        </div>
      )}
    </div>
  );
}

export default ListUsers;
