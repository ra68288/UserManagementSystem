import React, { useState } from "react";

function UserForm({ onAddUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !email) {
      setError("Name and email are required!");
      return;
    }
    onAddUser({ id: Date.now(), name, email, company: { name: "Local" }, createdAt: new Date() });
    setName("");
    setEmail("");
    setError("");
  }

  return (
    <form onSubmit={handleSubmit} style={{
      display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 25, padding: 20,
      borderRadius: 12, background: "linear-gradient(120deg, #f0f4f8, #e2e8f0)", boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
    }}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
        style={{ flex: 1, minWidth: 150, padding: 12, borderRadius: 8, border: "1px solid #cbd5e0" }}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        style={{ flex: 1, minWidth: 200, padding: 12, borderRadius: 8, border: "1px solid #cbd5e0" }}
      />
      <button type="submit" style={{
        padding: "12px 18px", borderRadius: 8, border: "none",
        backgroundColor: "#3182ce", color: "#fff", fontWeight: 600, cursor: "pointer",
        transition: "0.2s"
      }}>Add User</button>
      {error && <span style={{ width: "100%", marginTop: 8, color: "#e53e3e", fontWeight: 500 }}>{error}</span>}
    </form>
  );
}

export default UserForm;
