import React, { useState, useEffect } from "react";

function AddUser({ onAddUser, darkMode }) {
  const [formData, setFormData] = useState({
    name:"", email:"", phone:"", website:"",
    companyName:"", catchPhrase:"", bs:"",
    street:"", suite:"", city:"", zipcode:"",
    lat:"", lng:""
  });
  const [error, setError] = useState("");
  const [addedUsers, setAddedUsers] = useState([]);
  const [animations, setAnimations] = useState([]);

  const fields = [
    "name","email","phone","website",
    "companyName","catchPhrase","bs",
    "street","suite","city","zipcode","lat","lng"
  ];

  const handleChange = (field, value) => setFormData({...formData,[field]:value});

  const handleSubmit = (e) => {
    e.preventDefault(); setError("");

    if(!formData.name.trim() || !formData.email.trim()){
      setError("Name and Email are required!"); return;
    }

    const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailPattern.test(formData.email)){ setError("Invalid email format!"); return;}

    const newUser={
      id: Date.now(),
      name:formData.name.trim(),
      email:formData.email.trim(),
      phone:formData.phone.trim(),
      website:formData.website.trim(),
      company:{
        name:formData.companyName.trim(),
        catchPhrase:formData.catchPhrase.trim(),
        bs:formData.bs.trim()
      },
      address:{
        street:formData.street.trim(),
        suite:formData.suite.trim(),
        city:formData.city.trim(),
        zipcode:formData.zipcode.trim(),
        geo:{lat:formData.lat.trim(), lng:formData.lng.trim()}
      },
      createdAt:new Date()
    };

    onAddUser(newUser);
    setAddedUsers([newUser,...addedUsers]);
    setAnimations([newUser.id,...animations]);
    setFormData(fields.reduce((acc,f)=>({...acc,[f]:""}),{}));
  };

  useEffect(()=>{
    if(animations.length>0){
      const timer = setTimeout(()=>setAnimations(animations.slice(1)),600);
      return ()=>clearTimeout(timer);
    }
  },[animations]);

  const inputStyle = {
    padding:"14px 16px",
    borderRadius:12,
    border:`1px solid ${darkMode?"#4a5568":"#cbd5e0"}`,
    minWidth:150,
    flex:1,
    background: darkMode?"#2d3748":"#fff",
    color: darkMode?"#e2e8f0":"#1a202c",
    outline:"none",
    transition:"all 0.3s ease",
    boxShadow: darkMode?"0 2px 4px rgba(255,255,255,0.1)":"0 2px 4px rgba(0,0,0,0.1)",
    fontWeight:500
  };

  const buttonStyle = {
    padding:"14px 26px",
    borderRadius:16,
    border:"none",
    background: "linear-gradient(135deg, #3182ce, #63b3ed)",
    color:"#fff",
    fontWeight:600,
    cursor:"pointer",
    overflow:"hidden",
    position:"relative",
    transition:"all 0.3s ease, transform 0.2s",
    boxShadow:"0 6px 20px rgba(0,0,0,0.25)"
  };

  const cardStyle=(isNew, index)=>({
    padding:22,
    marginBottom:18,
    borderRadius:18,
    background: darkMode?"#2d3748":"#fff",
    color: darkMode?"#e2e8f0":"#1a202c",
    boxShadow: darkMode?"0 8px 26px rgba(255,255,255,0.05)":"0 8px 26px rgba(0,0,0,0.12)",
    transform:isNew?"translateY(-40px) scale(0.9)":"translateY(0) scale(1)",
    opacity:isNew?0:1,
    animation:isNew?`fadeSlideIn 0.6s forwards ${index*0.05}s`:"none",
    cursor:"pointer",
    transition:"all 0.4s ease",
    border:`1px solid ${darkMode?"#4a5568":"#e2e8f0"}`
  });

  return (
    <div style={{
      padding:36,
      borderRadius:20,
      background: darkMode?"#1a202c":"#f7fafc",
      marginBottom:36,
      transition:"background 0.3s"
    }}>
      <h3 style={{marginBottom:28, color: darkMode?"#e2e8f0":"#1a202c", fontSize:24, fontWeight:700}}>
        ➕ Add New User
      </h3>
      <form onSubmit={handleSubmit} style={{display:"flex", flexWrap:"wrap", gap:16}}>
        {fields.map((f,i)=>(
          <input key={i} placeholder={f.charAt(0).toUpperCase()+f.slice(1)}
            value={formData[f]}
            onChange={e=>handleChange(f,e.target.value)}
            style={inputStyle}
            onFocus={e=>e.target.style.boxShadow="0 0 0 3px #63b3ed"}
            onBlur={e=>e.target.style.boxShadow= darkMode?"0 2px 4px rgba(255,255,255,0.1)":"0 2px 4px rgba(0,0,0,0.1)"}
          />
        ))}
        <button
          type="submit"
          style={buttonStyle}
          onMouseEnter={e=>e.target.style.transform="scale(1.07)"}
          onMouseLeave={e=>e.target.style.transform="scale(1)"}
        >
          Add User
          <span style={{
            position:"absolute", top:0,left:0,width:"100%",height:"100%",
            background:"rgba(255,255,255,0.2)",
            borderRadius:"inherit", transform:"scaleX(0)", transition:"transform 0.4s",
            pointerEvents:"none"
          }} className="ripple"></span>
        </button>
      </form>
      {error && <div style={{color:"#e53e3e", marginTop:14, fontWeight:600}}>{error}</div>}

      {addedUsers.length>0 && (
        <div style={{marginTop:40, maxHeight:450, overflowY:"auto", paddingRight:8}}>
          <h4 style={{color:darkMode?"#e2e8f0":"#1a202c", marginBottom:16, fontWeight:600}}>Recently Added Users:</h4>
          {addedUsers.map((u,idx)=>{
            const isNew=animations.includes(u.id);
            return (
              <div
                key={u.id}
                style={cardStyle(isNew,idx)}
                onMouseEnter={e=>e.currentTarget.style.boxShadow="0 14px 36px rgba(0,0,0,0.35)"}
                onMouseLeave={e=>e.currentTarget.style.boxShadow= darkMode
                  ?"0 8px 26px rgba(255,255,255,0.05)"
                  :"0 8px 26px rgba(0,0,0,0.12)"}
              >
                <strong>{u.name}</strong> ({u.email})<br/>
                📞 {u.phone} | 🌐 {u.website}<br/>
                🏢 {u.company.name} | {u.company.catchPhrase} | {u.company.bs}<br/>
                🏠 {u.address.street}, {u.address.suite}, {u.address.city}, {u.address.zipcode}<br/>
                🌍 lat {u.address.geo.lat}, lng {u.address.geo.lng}
              </div>
            )
          })}
        </div>
      )}

      <style>{`
        @keyframes fadeSlideIn{
          0%{opacity:0; transform: translateY(-40px) scale(0.9);}
          100%{opacity:1; transform: translateY(0) scale(1);}
        }
        ::-webkit-scrollbar{
          width:6px;
        }
        ::-webkit-scrollbar-thumb{
          background: ${darkMode?"#4a5568":"#cbd5e0"};
          border-radius:3px;
        }
      `}</style>
    </div>
  );
}

export default AddUser;
