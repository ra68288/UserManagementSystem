import React from "react";
import users from "../data/users"; // importo listën e userave

function UserDetails() {
  return (
    <div
      style={{
        maxWidth: 900,
        margin: "40px auto",
        padding: 20,
        borderRadius: 16,
        background: "#f7fafc",
        fontFamily: "Segoe UI, Arial, sans-serif",
      }}
    >
      <h2
        style={{
          marginBottom: 30,
          fontSize: 28,
          fontWeight: 700,
          color: "#2d3748",
          textAlign: "center",
        }}
      >
        👥 User Details (All Users)
      </h2>

      {users.map((user) => (
        <div
          key={user.id}
          style={{
            marginBottom: 30,
            padding: 20,
            borderRadius: 12,
            background: "white",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <h3 style={{ marginBottom: 15, fontSize: 22, color: "#2c5282" }}>
            {user.name} (ID: {user.id})
          </h3>

          <div style={{ marginBottom: 8 }}>
            <strong>Username:</strong> {user.username}
          </div>
          <div style={{ marginBottom: 8 }}>
            <strong>Email:</strong> {user.email}
          </div>
          <div style={{ marginBottom: 8 }}>
            <strong>Phone:</strong> {user.phone}
          </div>
          <div style={{ marginBottom: 8 }}>
            <strong>Website:</strong> {user.website}
          </div>

          <div style={{ marginBottom: 8 }}>
            <strong>Address:</strong>{" "}
            {user.address.street}, {user.address.suite}, {user.address.city},{" "}
            {user.address.zipcode}
          </div>
          <div style={{ marginBottom: 8 }}>
            <strong>Geo:</strong> Lat {user.address.geo.lat}, Lng{" "}
            {user.address.geo.lng}
          </div>

          <div style={{ marginBottom: 8 }}>
            <strong>Company:</strong> {user.company.name}
          </div>
          <div style={{ marginBottom: 8 }}>
            <strong>CatchPhrase:</strong> {user.company.catchPhrase}
          </div>
          <div style={{ marginBottom: 8 }}>
            <strong>BS:</strong> {user.company.bs}
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserDetails;
