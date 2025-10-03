import React from "react";
import users from "../data/users";

function UserDetails() {
  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "40px auto",
        padding: 20,
        borderRadius: 20,
        fontFamily: "Segoe UI, Arial, sans-serif",
        color: "#fff",
        background: "linear-gradient(-45deg, #6a11cb, #2575fc, #ff6a00, #00c9ff)",
        backgroundSize: "400% 400%",
        animation: "gradientBG 12s ease infinite",
      }}
    >
      <style>
        {`
          @keyframes gradientBG {
            0% {background-position: 0% 50%;}
            50% {background-position: 100% 50%;}
            100% {background-position: 0% 50%;}
          }
        `}
      </style>

      <h2
        style={{
          textAlign: "center",
          fontSize: 34,
          fontWeight: "bold",
          marginBottom: 30,
          textShadow: "0 0 15px rgba(0,0,0,0.6)",
        }}
      >
        👥 User Details
      </h2>

      <div
        style={{
          display: "flex",
          overflowX: "auto",
          gap: 20,
          paddingBottom: 10,
        }}
      >
        {users.map((user) => (
          <div
            key={user.id}
            style={{
              minWidth: 320,
              padding: 20,
              borderRadius: 14,
              background: "rgba(0,0,0,0.6)",
              backdropFilter: "blur(8px)",
              boxShadow: "0 6px 20px rgba(0,0,0,0.4)",
              transition: "transform 0.3s ease",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "translateY(-8px) scale(1.05)")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.transform = "translateY(0) scale(1)")
            }
          >
            <h3
              style={{
                fontSize: 22,
                marginBottom: 15,
                color: "#90cdf4",
                borderBottom: "1px solid rgba(255,255,255,0.2)",
                paddingBottom: 8,
              }}
            >
              {user.name} <span style={{ color: "#ccc" }}>(ID: {user.id})</span>
            </h3>

            <div>👤 <strong>Username:</strong> {user.username}</div>
            <div>✉️ <strong>Email:</strong> {user.email}</div>
            <div>📞 <strong>Phone:</strong> {user.phone}</div>
            <div>🌍 <strong>Website:</strong> {user.website}</div>
            <div>🏠 <strong>Address:</strong> {user.address.street}, {user.address.city}</div>
            <div>📍 <strong>Geo:</strong> Lat {user.address.geo.lat}, Lng {user.address.geo.lng}</div>
            <div>🏢 <strong>Company:</strong> {user.company.name}</div>
            <div>💡 <strong>CatchPhrase:</strong> {user.company.catchPhrase}</div>
            <div>⚙️ <strong>BS:</strong> {user.company.bs}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserDetails;
