import { useState } from "react";
import AddPerson from "./components/AddPerson";
import AddDocument from "./components/AddDocument";
import FamilyRelations from "./components/FamilyRelations";
function App() {

  const [page, setPage] = useState("person");

//   const navBtn = (active) => ({
//   padding: "10px 15px",
//   border: "none",
//   borderRadius: "8px",
//   cursor: "pointer",
//   background: active ? "#2563eb" : "#e5e7eb",
//   color: active ? "white" : "black",
//   fontWeight: "bold"
// });

const sideBtn = (active) => ({
  padding: "10px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  textAlign: "left",
  background: active ? "#2563eb" : "transparent",
  color: "white"
});

  return (
  <div style={{
    display: "flex",
    height: "100vh",
    fontFamily: "Arial",
    paddingTop: "60px"   
  }}>

    <div style={{
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  height: "60px",
  background: "#0f172a",
  color: "white",
  display: "flex",
  alignItems: "center",
  padding: "0 20px",
  zIndex: 1000,
  justifyContent: "space-between"
}}><h2 style={{ margin: 0 }}>
  ClientVault
</h2>
<div style={{ fontSize: "13px", opacity: 0.8 }}>
  Client Management System
</div>
</div>

    {/* SIDEBAR */}
    <div style={{
      width: "220px",
      background: "#1e293b",
      color: "white",
      padding: "20px"
    }}>

      <h2 style={{ marginBottom: "30px" }}>
        Dashboard
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>

        <button onClick={() => setPage("person")} style={sideBtn(page === "person")}>
          Person
        </button>

        <button onClick={() => setPage("document")} style={sideBtn(page === "document")}>
          Documents
        </button>

        <button onClick={() => setPage("family")} style={sideBtn(page === "family")}>
          Family
        </button>

      </div>

    </div>

    {/* MAIN CONTENT */}
    <div style={{
      flex: 1,
      background: "#f4f6f8",
      padding: "20px",
      overflowY: "auto"
    }}>

      {page === "person" && <AddPerson />}
      {page === "document" && <AddDocument />}
      {page === "family" && <FamilyRelations />}

    </div>

  </div>
);
}

export default App;