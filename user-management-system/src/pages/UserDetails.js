import React from "react";
import { useLocation } from "react-router-dom";

function UserDetails() {
  const location = useLocation();
  const user = location.state?.user; // merr user nga navigate

  if (!user) {
    return (
      <div style={{ textAlign: "center", padding: 40, fontSize: 18, color: "#e53e3e" }}>
        ❌ No user selected! Please go back to the User List.
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: 700,
        margin: "40px auto",
        padding: 30,
        borderRadius: 16,
        background: "linear-gradient(135deg, #edf2f7, #e2e8f0)",
        boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
        fontFamily: "Segoe UI, Arial, sans-serif",
      }}
    >
      <h2 style={{ marginBottom: 20, fontSize: 26, fontWeight: 700, color: "#2d3748" }}>
        👤 User Details
      </h2>

      <div style={{ marginBottom: 12, fontSize: 18 }}>
        <strong>Name:</strong> {user.name || "—"}
      </div>
      <div style={{ marginBottom: 12, fontSize: 18 }}>
        <strong>Email:</strong> {user.email || "—"}
      </div>
      <div style={{ marginBottom: 12, fontSize: 18 }}>
        <strong>Company:</strong> {user.company?.name || "—"}
      </div>
      <div style={{ marginBottom: 12, fontSize: 18 }}>
        <strong>Phone:</strong> {user.phone || "—"}
      </div>
      <div style={{ marginBottom: 12, fontSize: 18 }}>
        <strong>Website:</strong> {user.website || "—"}
      </div>
      <div style={{ marginBottom: 12, fontSize: 18 }}>
        <strong>Address:</strong>{" "}
        {user.address
          ? `${user.address.street}, ${user.address.city}, ${user.address.zipcode}`
          : "—"}
      </div>
    </div>
  );
}

export default UserDetails;
