import { useState, useEffect } from "react";
import api from "../api/axiosConfig";
import axios from "axios";

function AddPerson() {

    const [person, setPerson] = useState({
        firstName: "",
        lastName: "",
        mobileNo: "",
        dob: "",
        location: "",
        familyRole: "",
        spouseName: "",
        childrenNames: ""
    });

    const [persons, setPersons] = useState([]);

    const [isEditOpen, setIsEditOpen] = useState(false);
const [editPerson, setEditPerson] = useState({
    id: "",
    firstName: "",
    lastName: "",
    mobileNo: "",
    dob: "",
    location: ""
});

const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setPerson({
            ...person,
            [e.target.name]: e.target.value
        });
    };

    const [search, setSearch] = useState("");

    const fetchPersons = async () => {
    try {
        const res = await api.get("/person/all");
        setPersons(res.data);
    } catch (error) {
        console.log(error);
    }
    };

    useEffect(() => {
    fetchPersons();
    }, []);

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const res = await api.post("/person/add", person);
        alert("Person Added Successfully!");

        fetchPersons(); 
        console.log(res.data);
    } catch (error) {
        console.log(error);
        alert("Error adding person");
    }
};

const handleDelete = async (id) => {
    try {
        await axios.delete(`http://localhost:8080/api/person/${id}`);
        alert("Person deleted successfully");
        
        // refresh list
        window.location.reload();
    } catch (error) {
        console.log(error);
        alert("Error deleting person");
    }
};

const handleEdit = (person) => {
    setEditPerson(person);
    setIsEditOpen(true);
};


    return (
        <div style={{
    maxWidth: "1000px",
    margin: "auto",
    padding: "20px"
}}>

    <h2 style={{
    color: "#1e293b",
    marginBottom: "15px"
}}>
    Person Management
</h2>
<div style={{
    display: "flex",
    gap: "20px",
    alignItems: "flex-start"
}}>

    <div style={{
    flex: 1,
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
}}>
            <form onSubmit={handleSubmit}>
                <input name="firstName" placeholder="First Name" onChange={handleChange} style={{width: "95%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc"}}/><br /><br />
                <input name="lastName" placeholder="Last Name" onChange={handleChange} style={{width: "95%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc"}}/><br /><br />
                <input name="mobileNo" placeholder="Mobile No" onChange={handleChange} style={{width: "95%", padding: "10px",  borderRadius: "8px", border: "1px solid #ccc"}}/><br /><br />
                <input name="dob" placeholder="DOB (YYYY-MM-DD)" onChange={handleChange} style={{width: "95%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc"}}/><br /><br />
                <input name="location" placeholder="Location" onChange={handleChange} style={{width: "95%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc"}}/><br /><br />
                <input name="familyRole" placeholder="Family Role (Head/Spouse/Child)" onChange={handleChange} style={{width: "95%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc"}}/><br /><br />
                <input name="spouseName" placeholder="Spouse Name (if applicable)" onChange={handleChange} style={{width: "95%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc"}}/><br /><br />
                <input name="childrenNames" placeholder="Children Names" onChange={handleChange} style={{width: "95%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc"}}/><br /><br />

                <button type="submit" style={{width: "100%", padding: "12px", background: "#2563eb", color: "white", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer"}}>Add Person</button>
            </form>
    </div>

            <div style={{
    flex: 2,
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
}}>
            
            <h2 style={{ marginBottom: "15px" }}>Person List</h2>


    <div style={{
    marginBottom: "15px",
    padding: "10px 15px",
    background: "#e0f2fe",
    borderRadius: "8px",
    fontWeight: "bold",
    color: "#0369a1"
}}>
    Total Clients: {persons.length}
</div>

    <input
    type="text"
    placeholder="Search by name..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    style={{
        width: "100%",
        padding: "10px",
        marginBottom: "15px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        outline: "none"
    }}
/>



<table style={{
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: "0 12px"
}}>
    <thead>
        <tr style={{ background: "#1e293b", color: "white", height: "50px" }}>
            {/* <th>ID</th> */}
            <th>Name</th>
            <th>Mobile</th>
            <th>DOB</th>
            <th>Location</th>
            <th>Actions</th>
        </tr>
    </thead>

    <tbody>

        
    {persons
  .filter((p) =>
    (p.firstName + " " + p.lastName)
      .toLowerCase()
      .includes(search.toLowerCase())
  )
  .length === 0 ? (

    <tr>
      <td colSpan="5" style={{
    background: "white",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    borderRadius: "10px",
    textAlign: "center"
}}>
        No results found
      </td>
    </tr>

  ) : (

    persons
      .filter((p) =>
        (p.firstName + " " + p.lastName)
          .toLowerCase()
          .includes(search.toLowerCase())
      )
    .map((p) => (
            <tr key={p.id}
  onMouseOver={(e) => {
    const tds = e.currentTarget.querySelectorAll("td");
    tds.forEach(td => td.style.background = "#e0f2fe");
  }}
  onMouseOut={(e) => {
    const tds = e.currentTarget.querySelectorAll("td");
    tds.forEach(td => td.style.background = "white");
  }}>
                {/* <td style={{background: "white",padding: "8px 10px",textAlign: "center", fontSize: "13px", whiteSpace: "nowrap"}}>{p.id}</td> */}
                <td style={{background: "white",padding: "12px",textAlign: "center", fontSize: "13px", whiteSpace: "nowrap"}}>{p.firstName} {p.lastName}</td>
                <td style={{background: "white",padding: "12px",textAlign: "center", fontSize: "13px", whiteSpace: "nowrap"}}>{p.mobileNo}</td>
                <td style={{background: "white",padding: "12px",textAlign: "center", fontSize: "13px", whiteSpace: "nowrap"}}>{p.dob}</td>
                <td style={{background: "white",padding: "12px",textAlign: "center", fontSize: "13px", whiteSpace: "nowrap"}}>{p.location}</td>
<td>
    <div style={{
        display: "flex",
        gap: "10px",
        justifyContent: "center",
        alignItems: "center"
    }}>

        <button
            onClick={() => handleEdit(p)}
            style={{
                background: "#3b82f6",
                color: "white",
                border: "none",
                padding: "6px 12px",
                borderRadius: "6px",
                cursor: "pointer"
            }}
        >
            Edit
        </button>

        <button
            onClick={() => handleDelete(p.id)}
            style={{
                background: "#ef4444",
                color: "white",
                border: "none",
                padding: "6px 12px",
                borderRadius: "6px",
                cursor: "pointer"
            }}
        >
            Delete
        </button>

    </div>
</td>
            </tr>
        ))
  )}    
    </tbody>
</table>
</div>
</div>


{isEditOpen && (
    <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }}>

        <div style={{
            background: "white",
            padding: "20px",
            borderRadius: "12px",
            width: "400px"
        }}>

            <h3>Edit Person</h3>

            <input
                value={editPerson.firstName}
                onChange={(e) =>
                    setEditPerson({ ...editPerson, firstName: e.target.value })
                }
                placeholder="First Name"
                style={{ width: "100%", margin: "5px 0", padding: "8px" }}
            />

            <input
                value={editPerson.lastName}
                onChange={(e) =>
                    setEditPerson({ ...editPerson, lastName: e.target.value })
                }
                placeholder="Last Name"
                style={{ width: "100%", margin: "5px 0", padding: "8px" }}
            />

            <input
                value={editPerson.mobileNo}
                onChange={(e) =>
                    setEditPerson({ ...editPerson, mobileNo: e.target.value })
                }
                placeholder="Mobile"
                style={{ width: "100%", margin: "5px 0", padding: "8px" }}
            />

            <input
                value={editPerson.location}
                onChange={(e) =>
                    setEditPerson({ ...editPerson, location: e.target.value })
                }
                placeholder="Location"
                style={{ width: "100%", margin: "5px 0", padding: "8px" }}
            />

            <div style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px"
            }}>

                <button onClick={() => setIsEditOpen(false)}>
                    Cancel
                </button>

                <button
    disabled={loading}
    onClick={async () => {
        setLoading(true);

        await axios.put(
            `http://localhost:8080/api/person/update/${editPerson.id}`,
            editPerson
        );

        setPersons((prev) =>
            prev.map((p) =>
                p.id === editPerson.id ? editPerson : p
            )
        );

        setLoading(false);
        setIsEditOpen(false);
        alert("Person updated successfully!");
    }}
>
    {loading ? "Saving..." : "Save"}
</button>

            </div>

        </div>
    </div>
)}
        </div>
        
    );
}

export default AddPerson;