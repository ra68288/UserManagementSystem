import React, { useState } from "react";

function UserItem({ user, onDelete, onUpdate, darkMode }) {
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
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 18,
    marginBottom: 14,
    borderRadius: 12,
    backgroundColor: darkMode ? "#2d3748" : user.company.name === "Local" ? "#fefcbf" : "#fff",
    color: darkMode ? "#e2e8f0" : "#2d3748",
    boxShadow: darkMode ? "0 6px 18px rgba(0,0,0,0.6)" : "0 6px 18px rgba(0,0,0,0.05)",
    transition: "all 0.25s ease",
    cursor: "pointer"
  };

  const hoverStyle = {
    transform: "translateY(-4px)",
    background: darkMode
      ? "linear-gradient(90deg, #4a5568, #2d3748)"
      : user.company.name === "Local"
        ? "linear-gradient(90deg, #facc15, #fbbf24)"
        : "linear-gradient(90deg, #e2e8f0, #cbd5e0)",
    boxShadow: darkMode ? "0 10px 28px rgba(0,0,0,0.8)" : "0 10px 28px rgba(0,0,0,0.12)"
  };

  const inputStyle = {
    padding: 10,
    borderRadius: 8,
    border: "1px solid #cbd5e0",
    marginRight: 8,
    backgroundColor: darkMode ? "#4a5568" : "#fff",
    color: darkMode ? "#e2e8f0" : "#2d3748"
  };

  const buttonStyle = (bgColor) => ({
    padding: "6px 12px",
    borderRadius: 8,
    border: "none",
    backgroundColor: bgColor,
    color: "#fff",
    marginRight: 6,
    cursor: "pointer"
  });

  return (
    <div
      style={isHover ? { ...cardStyle, ...hoverStyle } : cardStyle}
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
    >
      {editing ? (
        <>
          <input type="text" value={editName} onChange={e => setEditName(e.target.value)} style={inputStyle} />
          <input type="email" value={editEmail} onChange={e => setEditEmail(e.target.value)} style={inputStyle} />
          <button onClick={saveUpdate} style={buttonStyle("#38a169")}>Save</button>
          <button onClick={() => setEditing(false)} style={buttonStyle("#e53e3e")}>Cancel</button>
        </>
      ) : (
        <>
          <div>
            <span style={{ fontSize: 16, fontWeight: 500 }}>{user.name}</span>
            <span style={{ fontWeight: 400, color: darkMode ? "#a0aec0" : "#4a5568", marginLeft: 8 }}>
              ({user.email})
            </span>
          </div>
          <div>
            <button onClick={() => setEditing(true)} style={buttonStyle("#3182ce")}>Edit</button>
            <button onClick={confirmDelete} style={buttonStyle("#e53e3e")}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
}

export default UserItem;
