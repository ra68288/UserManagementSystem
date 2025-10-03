import React, { useState } from "react";

function AddUser({ onAddUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name.trim() || !email.trim()) {
      setError("Name and Email are required!");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError("Invalid email format!");
      return;
    }

    const newUser = {
      id: Date.now(),
      name: name.trim(),
      email: email.trim(),
      company: { name: "Local" },
      createdAt: new Date()
    };

    onAddUser(newUser);
    setSuccess(`User "${newUser.name}" added successfully!`);
    setName("");
    setEmail("");
  };

  return (
    <div
      style={{
        padding: 25,
        borderRadius: 14,
        background: "linear-gradient(120deg, #edf2f7, #e2e8f0)",
        boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
        marginBottom: 30
      }}
    >
      <h3 style={{ marginBottom: 20, fontSize: 20, color: "#2d3748" }}>Add New User</h3>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}
      >
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          style={{
            flex: 1,
            minWidth: 180,
            padding: 12,
            borderRadius: 8,
            border: "1px solid #cbd5e0",
            fontSize: 16
          }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{
            flex: 1,
            minWidth: 220,
            padding: 12,
            borderRadius: 8,
            border: "1px solid #cbd5e0",
            fontSize: 16
          }}
        />
        <button
          type="submit"
          style={{
            padding: "12px 22px",
            borderRadius: 10,
            border: "none",
            backgroundColor: "#3182ce",
            color: "#fff",
            fontWeight: 600,
            cursor: "pointer",
            transition: "0.3s"
          }}
          onMouseOver={e => (e.currentTarget.style.backgroundColor = "#2b6cb0")}
          onMouseOut={e => (e.currentTarget.style.backgroundColor = "#3182ce")}
        >
          Add User
        </button>
      </form>

      {error && (
        <div
          style={{
            marginTop: 12,
            color: "#e53e3e",
            fontWeight: 500,
            fontSize: 14
          }}
        >
          {error}
        </div>
      )}
      {success && (
        <div
          style={{
            marginTop: 12,
            color: "#38a169",
            fontWeight: 500,
            fontSize: 14
          }}
        >
          {success}
        </div>
      )}
    </div>
  );
}

export default AddUser;
