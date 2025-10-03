import React, { useState, useEffect } from "react";

function Dashboard() {
  // --- USER FORM ---
  function UserForm({ onAddUser }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    function handleSubmit(e) {
      e.preventDefault();
      if (!name || !email) {
        setError("⚠️ Name and email are required!");
        return;
      }
      onAddUser({
        id: Date.now(),
        name,
        email,
        company: { name: "Local User" },
        createdAt: new Date(),
      });
      setName("");
      setEmail("");
      setError("");
    }

    return (
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
          marginBottom: 25,
          padding: 20,
          borderRadius: 14,
          background: "linear-gradient(135deg, #edf2f7, #e2e8f0)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        }}
      >
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            flex: 1,
            minWidth: 180,
            padding: 12,
            borderRadius: 8,
            border: "1px solid #cbd5e0",
          }}
        />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            flex: 1,
            minWidth: 220,
            padding: 12,
            borderRadius: 8,
            border: "1px solid #cbd5e0",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "12px 20px",
            borderRadius: 8,
            border: "none",
            backgroundColor: "#3182ce",
            color: "#fff",
            fontWeight: 600,
            cursor: "pointer",
            transition: "0.25s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#2b6cb0")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#3182ce")}
        >
          ➕ Add User
        </button>
        {error && (
          <span style={{ width: "100%", marginTop: 8, color: "#e53e3e", fontWeight: 500 }}>
            {error}
          </span>
        )}
      </form>
    );
  }

  // --- USER ITEM ---
  function UserItem({ user, onDelete, onUpdate }) {
    const [editing, setEditing] = useState(false);
    const [editName, setEditName] = useState(user.name);
    const [editEmail, setEditEmail] = useState(user.email);
    const [isHover, setIsHover] = useState(false);

    function saveUpdate() {
      if (!editName || !editEmail) return;
      onUpdate(user.id, { ...user, name: editName, email: editEmail });
      setEditing(false);
    }

    function confirmDelete() {
      if (window.confirm(`Delete user ${user.name}?`)) onDelete(user.id);
    }

    const baseCard = {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 18,
      marginBottom: 14,
      borderRadius: 12,
      backgroundColor: "#fff",
      boxShadow: "0 6px 14px rgba(0,0,0,0.06)",
      transition: "all 0.25s ease",
      cursor: "pointer",
    };

    const hoverCard = {
      transform: "translateY(-4px)",
      background: "linear-gradient(90deg, #f7fafc, #edf2f7)",
      boxShadow: "0 10px 24px rgba(0,0,0,0.12)",
    };

    return (
      <div
        style={isHover ? { ...baseCard, ...hoverCard } : baseCard}
        onMouseOver={() => setIsHover(true)}
        onMouseOut={() => setIsHover(false)}
      >
        {editing ? (
          <>
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              style={{ padding: 10, borderRadius: 8, border: "1px solid #cbd5e0", marginRight: 8 }}
            />
            <input
              type="email"
              value={editEmail}
              onChange={(e) => setEditEmail(e.target.value)}
              style={{ padding: 10, borderRadius: 8, border: "1px solid #cbd5e0", marginRight: 8 }}
            />
            <button
              onClick={saveUpdate}
              style={{
                padding: "8px 12px",
                borderRadius: 8,
                border: "none",
                backgroundColor: "#38a169",
                color: "#fff",
                marginRight: 6,
                cursor: "pointer",
              }}
            >
              Save
            </button>
            <button
              onClick={() => setEditing(false)}
              style={{
                padding: "8px 12px",
                borderRadius: 8,
                border: "none",
                backgroundColor: "#e53e3e",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <div style={{ fontSize: 16, fontWeight: 500, color: "#2d3748" }}>
              {user.name} <span style={{ fontWeight: 400, color: "#4a5568" }}>({user.email})</span>
              <div style={{ fontSize: 14, color: "#718096" }}>🏢 {user.company?.name}</div>
            </div>
            <div>
              <button
                onClick={() => setEditing(true)}
                style={{
                  padding: "6px 12px",
                  borderRadius: 8,
                  border: "none",
                  backgroundColor: "#3182ce",
                  color: "#fff",
                  marginRight: 6,
                  cursor: "pointer",
                }}
              >
                Edit
              </button>
              <button
                onClick={confirmDelete}
                style={{
                  padding: "6px 12px",
                  borderRadius: 8,
                  border: "none",
                  backgroundColor: "#e53e3e",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    );
  }

  // --- STATE ---
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data.map((u) => ({ ...u, createdAt: new Date() }))));
  }, []);

  const addUser = (user) => setUsers([user, ...users]);
  const deleteUser = (id) => setUsers(users.filter((u) => u.id !== id));
  const updateUser = (id, updated) => setUsers(users.map((u) => (u.id === id ? updated : u)));

  // --- FILTER & SORT ---
  const filtered = users.filter(
    (u) =>
      (u.name && u.name.toLowerCase().includes(search.toLowerCase())) ||
      (u.email && u.email.toLowerCase().includes(search.toLowerCase())) ||
      (u.company?.name && u.company.name.toLowerCase().includes(search.toLowerCase()))
  );

  const sorted = [...filtered].sort((a, b) => {
    let aVal = sortField === "company" ? a.company?.name : a[sortField];
    let bVal = sortField === "company" ? b.company?.name : b[sortField];
    if (!aVal || !bVal) return 0;
    return sortOrder === "asc"
      ? aVal.toString().localeCompare(bVal.toString())
      : bVal.toString().localeCompare(aVal.toString());
  });

  const todayUsers = users.filter(
    (u) => u.createdAt && new Date(u.createdAt).toDateString() === new Date().toDateString()
  );

  return (
    <div style={{ maxWidth: 980, margin: "40px auto", padding: 20, fontFamily: "Segoe UI, Arial, sans-serif" }}>
      {/* --- DASHBOARD CARDS --- */}
      <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginBottom: 30 }}>
        <div
          style={{
            flex: 1,
            minWidth: 200,
            padding: 20,
            borderRadius: 16,
            background: "linear-gradient(90deg, #4299e1, #63b3ed)",
            color: "#fff",
            fontWeight: 600,
            fontSize: 20,
            textAlign: "center",
            boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
          }}
        >
          👥 Total Users: {users.length}
        </div>
        <div
          style={{
            flex: 1,
            minWidth: 200,
            padding: 20,
            borderRadius: 16,
            background: "linear-gradient(90deg, #38a169, #48bb78)",
            color: "#fff",
            fontWeight: 600,
            fontSize: 20,
            textAlign: "center",
            boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
          }}
        >
          🆕 New Today: {todayUsers.length}
        </div>
      </div>

      <h2 style={{ marginBottom: 25, color: "#2d3748", fontSize: 28 }}>📊 User Management Dashboard</h2>

      <UserForm onAddUser={addUser} />

      <input
        type="text"
        placeholder="🔍 Search by name, email, or company..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: 12,
          marginBottom: 18,
          width: "100%",
          borderRadius: 10,
          border: "1px solid #cbd5e0",
          fontSize: 16,
        }}
      />

      {/* Sort Controls */}
      <div style={{ display: "flex", gap: 12, marginBottom: 22 }}>
        <select
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
          style={{ padding: 10, borderRadius: 8, border: "1px solid #cbd5e0", fontSize: 16 }}
        >
          <option value="name">Sort by Name</option>
          <option value="email">Sort by Email</option>
          <option value="company">Sort by Company</option>
        </select>
        <button
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          style={{
            padding: "10px 16px",
            borderRadius: 8,
            border: "none",
            backgroundColor: "#3182ce",
            color: "#fff",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          {sortOrder === "asc" ? "⬆ Ascending" : "⬇ Descending"}
        </button>
      </div>

      {/* User List */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 14 }}>
        {sorted.map((u) => (
          <UserItem key={u.id} user={u} onDelete={deleteUser} onUpdate={updateUser} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
