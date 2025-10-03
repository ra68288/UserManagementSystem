import React, { useState } from "react";

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
    if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
      onDelete(user.id);
    }
  }

  const cardStyle = {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: 18, marginBottom: 14, borderRadius: 12,
    backgroundColor: user.company.name === "Local" ? "#fefcbf" : "#fff",
    boxShadow: "0 6px 18px rgba(0,0,0,0.05)", transition: "all 0.25s ease", cursor: "pointer"
  };

  const hoverStyle = {
    transform: "translateY(-4px)",
    background: user.company.name === "Local" ? "linear-gradient(90deg, #facc15, #fbbf24)" : "linear-gradient(90deg, #e2e8f0, #cbd5e0)",
    boxShadow: "0 10px 28px rgba(0,0,0,0.12)"
  };

  return (
    <div
      style={isHover ? { ...cardStyle, ...hoverStyle } : cardStyle}
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
    >
      {editing ? (
        <>
          <input type="text" value={editName} onChange={e => setEditName(e.target.value)} style={{ padding: 10, borderRadius: 8, border: "1px solid #cbd5e0", marginRight: 8 }} />
          <input type="email" value={editEmail} onChange={e => setEditEmail(e.target.value)} style={{ padding: 10, borderRadius: 8, border: "1px solid #cbd5e0", marginRight: 8 }} />
          <button onClick={saveUpdate} style={{ padding: "8px 12px", borderRadius: 8, border: "none", backgroundColor: "#38a169", color: "#fff", marginRight: 6, cursor: "pointer" }}>Save</button>
          <button onClick={() => setEditing(false)} style={{ padding: "8px 12px", borderRadius: 8, border: "none", backgroundColor: "#e53e3e", color: "#fff", cursor: "pointer" }}>Cancel</button>
        </>
      ) : (
        <>
          <div style={{ fontSize: 16, fontWeight: 500, color: "#2d3748" }}>
            {user.name} <span style={{ fontWeight: 400, color: "#4a5568", marginLeft: 8 }}>({user.email})</span>
          </div>
          <div>
            <button onClick={() => setEditing(true)} style={{ padding: "6px 12px", borderRadius: 8, border: "none", backgroundColor: "#3182ce", color: "#fff", marginRight: 6, cursor: "pointer" }}>Edit</button>
            <button onClick={confirmDelete} style={{ padding: "6px 12px", borderRadius: 8, border: "none", backgroundColor: "#e53e3e", color: "#fff", cursor: "pointer" }}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
}

export default UserItem;
