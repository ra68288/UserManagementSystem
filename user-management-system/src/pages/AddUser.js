import React, { useState } from "react";

function AddUser({ onAddUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [catchPhrase, setCatchPhrase] = useState("");
  const [bs, setBs] = useState("");
  const [street, setStreet] = useState("");
  const [suite, setSuite] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [error, setError] = useState("");
  const [addedUsers, setAddedUsers] = useState([]); // lista e userave te shtuar

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

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
      phone: phone.trim(),
      website: website.trim(),
      company: {
        name: companyName.trim(),
        catchPhrase: catchPhrase.trim(),
        bs: bs.trim()
      },
      address: {
        street: street.trim(),
        suite: suite.trim(),
        city: city.trim(),
        zipcode: zipcode.trim(),
        geo: {
          lat: lat.trim(),
          lng: lng.trim()
        }
      },
      createdAt: new Date()
    };

    onAddUser(newUser);           // shtohet ne state globale
    setAddedUsers([...addedUsers, newUser]); // shtohet ne listen lokale

    // pastro input-et
    setName(""); setEmail(""); setPhone(""); setWebsite("");
    setCompanyName(""); setCatchPhrase(""); setBs("");
    setStreet(""); setSuite(""); setCity(""); setZipcode("");
    setLat(""); setLng("");
  };

  return (
    <div style={{ padding: 25, borderRadius: 14, background: "#f0f4f8", marginBottom: 30 }}>
      <h3 style={{ marginBottom: 20 }}>Add New User</h3>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <input placeholder="Website" value={website} onChange={(e) => setWebsite(e.target.value)} />
        <input placeholder="Company Name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
        <input placeholder="Catch Phrase" value={catchPhrase} onChange={(e) => setCatchPhrase(e.target.value)} />
        <input placeholder="BS" value={bs} onChange={(e) => setBs(e.target.value)} />
        <input placeholder="Street" value={street} onChange={(e) => setStreet(e.target.value)} />
        <input placeholder="Suite" value={suite} onChange={(e) => setSuite(e.target.value)} />
        <input placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
        <input placeholder="Zipcode" value={zipcode} onChange={(e) => setZipcode(e.target.value)} />
        <input placeholder="Lat" value={lat} onChange={(e) => setLat(e.target.value)} />
        <input placeholder="Lng" value={lng} onChange={(e) => setLng(e.target.value)} />
        <button type="submit">Add User</button>
      </form>
      {error && <div style={{ color: "red", marginTop: 10 }}>{error}</div>}

      {/* LISTA E USERAVE TE SHTUAR */}
      {addedUsers.length > 0 && (
        <div style={{ marginTop: 25 }}>
          <h4>Recently Added Users:</h4>
          {addedUsers.map((u) => (
            <div key={u.id} style={{ padding: 12, marginBottom: 10, background: "#fff", borderRadius: 8, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
              <strong>{u.name}</strong> ({u.email})<br />
              Phone: {u.phone} | Website: {u.website}<br />
              Company: {u.company.name} | CatchPhrase: {u.company.catchPhrase} | BS: {u.company.bs}<br />
              Address: {u.address.street}, {u.address.suite}, {u.address.city}, {u.address.zipcode}<br />
              Geo: lat {u.address.geo.lat}, lng {u.address.geo.lng}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AddUser;
