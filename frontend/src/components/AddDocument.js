import { useState, useEffect } from "react";
import api from "../api/axiosConfig";

function AddDocument() {

    const [persons, setPersons] = useState([]);

    const [documents, setDocuments] = useState([]);

    const [file, setFile] = useState(null);

    const [selectedUser, setSelectedUser] = useState(null);

    const [document, setDocument] = useState({
        documentType: "",
        documentName: "",
        filePath: "",
        personId: ""
    });

    // Fetch all persons for dropdown
    const fetchPersons = async () => {
        try {
            const res = await api.get("/person/all");
            setPersons(Array.isArray(res.data) ? res.data : []);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchDocuments = async () => {
    try {
        const res = await api.get("/document/all");
        setDocuments(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
        console.log(error);
    }
   };

    useEffect(() => {
    fetchPersons();
    fetchDocuments();
    }, []);

    const handleChange = (e) => {
        setDocument({
            ...document,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();

formData.append("file", file);
formData.append("documentType", document.documentType);
console.log(document.personId);
await api.post(
    `/document/upload/${document.personId}`,
    formData
);

            alert("Document Added Successfully!");
            fetchDocuments();
        } catch (error) {
            console.log(error);
            alert("Error adding document");
        }
    };

    const handleDelete = async (id) => {
    try {
        await api.delete(`/document/${id}`);
        alert("Document deleted successfully");
        fetchDocuments(); // refresh table
    } catch (error) {
        console.log(error);
        alert("Error deleting document");
    }
    };

    const handleReplace = async (id, newFile) => {

    const formData = new FormData();
    formData.append("file", newFile);

    try {
        await api.put(`/document/replace/${id}`, formData);

        alert("Document replaced successfully");

        fetchDocuments();

    } catch (error) {
        console.log(error);
        alert("Error replacing document");
    }
};

const viewStyle = {
    background: "#2563eb",
    color: "white",
    padding: "6px 10px",
    borderRadius: "6px",
    textDecoration: "none",
    fontSize: "13px"
};

const deleteStyle = {
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer"
};

const groupedDocs = documents.reduce((acc, doc) => {
    const key = doc.person?.id;

    if (!key) return acc; // IMPORTANT safety check

    if (!acc[key]) {
        acc[key] = [];
    }

    acc[key].push(doc);

    return acc;
}, {});

const getPersonName = (id) => {
    const person = persons.find(p => String(p.id) === String(id));
    return person ? `${person.firstName} ${person.lastName}` : "Unknown User";
};
console.log("DOC SAMPLE:", documents[0]);

    
    return (
        <div style={{
    padding: "30px",
    background: "#f4f6f8",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center"
}}>




        <div style={{
            width: "100%",
    // maxWidth: "1000px",
    background: "white",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
            <h2 style={{ marginBottom: "20px", color: "#1e293b"}}>Document Manager</h2>



            <div style={{ marginBottom: "30px" }}>
            <form onSubmit={handleSubmit}>

                <select name="personId" onChange={handleChange} style={{
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    outline: "none"
}}>
                    <option value="">Select Person</option>
                    {persons.map((p) => (
                        <option key={p.id} value={p.id}>
                            {p.firstName} {p.lastName}
                        </option>
                    ))}
                </select>
                <br /><br />

                <input name="documentType" placeholder="Document Type (AADHAR/PAN/DL)" onChange={handleChange} style={{
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    outline: "none"
}}/>
                <br /><br />

                <input type="file" onChange={(e) => setFile(e.target.files[0])} style={{marginBottom: "10px"}} />
                <br /><br />

                <button type="submit" style={{
    width: "100%",
    padding: "12px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer"
}}>Add Document</button>
            </form>


            <h2 style={{ marginTop: "20px" }}>Users</h2>

<div style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "15px",
    marginTop: "10px"
}}>
    {Object.keys(groupedDocs).map((user) => (
        <div
            key={user}
            onClick={() => setSelectedUser(user)}
    onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.02)"}
    onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
    style={{
        background: selectedUser === user ? "#e0f2fe" : "white",
        padding: "15px",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        cursor: "pointer",
        border: selectedUser === user ? "2px solid #2563eb" : "none",
        transition: "0.2s"
    
            }}
        >
            <h3 style={{ color: "#1e293b" }}>{getPersonName(Number(user))}</h3>

           
            <p style={{ fontSize: "13px", color: "#64748b" }}>
                {groupedDocs[user].length} Documents
            </p>
        </div>
    ))}
</div>


{selectedUser && (

<>
        {/* OVERLAY */}
        <div
            onClick={() => setSelectedUser(null)}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0,0,0,0.3)",
                zIndex: 999
            }}
        />


    <div style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: "420px",
        height: "100vh",
        background: "white",
        boxShadow: "-5px 0 20px rgba(0,0,0,0.15)",
        padding: "20px",
        transform: "translateX(0)",
        transition: "0.3s ease-in-out",
        zIndex: 1000,
        overflowY: "auto"
    }}>

        <button
            onClick={() => setSelectedUser(null)}
            style={{
                background: "#ef4444",
                color: "white",
                border: "none",
                padding: "6px 10px",
                borderRadius: "6px",
                cursor: "pointer"
            }}
        >
            Close
        </button>

        <h2 style={{ marginTop: "15px" }}>
            {getPersonName(Number(selectedUser))}
        </h2>

        <hr />

        {(groupedDocs[selectedUser] || []).map((doc) => (
    <div key={doc.id} style={{
        padding: "12px",
        borderBottom: "1px solid #eee"
    }}>

        <p><b>{doc.documentType}</b></p>
        <p style={{ fontSize: "13px", color: "#666" }}>
            {doc.documentName}
        </p>

        {/* ACTIONS */}
        <div style={{
            display: "flex",
            gap: "10px",
            marginTop: "8px",
            alignItems: "center"
        }}>

            {/* VIEW */}
            <a
                href={`http://localhost:8080/${doc.filePath}`}
                target="_blank"
                rel="noreferrer"
                style={viewStyle}
            >
                View
            </a>

            {/* REPLACE */}
            <label style={{
                background: "#f59e0b",
                color: "white",
                padding: "4px 8px",
                borderRadius: "6px",
                fontSize: "12px",
                cursor: "pointer"
            }}>
                Replace
                <input
                    type="file"
                    style={{ display: "none" }}
                    onChange={(e) =>
                        handleReplace(doc.id, e.target.files[0])
                    }
                />
            </label>

            {/* DELETE */}
            <button
                onClick={() => handleDelete(doc.id)}
                style={deleteStyle}
            >
                Delete
            </button>

        </div>
    </div>
))}

    </div>
    
    </>
)}

            {/* <h2>Document List</h2>

<div style={{
    marginTop: "20px"
}}>
<table style={{ width: "100%",
    borderCollapse: "separate",
    borderSpacing: "0 10px",
    marginTop: "20px" }}>
    <thead>
        <tr style={{ background: "#1e293b", color: "white", height: "50px"}}>
            <th>ID</th>
            <th>Type</th>
            <th>Name</th>
            <th>File Path</th>
            <th>Actions</th>
        </tr>
    </thead>

    <tbody>
        {Array.isArray(documents) && documents.map((doc) => {
    console.log("DOCUMENT:", doc);

    return (
        <tr style={{
      borderBottom: "1px solid #eee",
      textAlign: "center",
      height: "50px",
      background: "white"
  }}
  onMouseOver={(e) => e.currentTarget.style.background = "#c5c8e6"}
  onMouseOut={(e) => e.currentTarget.style.background = "white"}>
            <td>{doc.id ? doc.id : "NO ID FOUND"}</td>
            <td>{doc.documentType}</td>
            <td>{doc.documentName}</td>
            <td>{doc.filePath}</td>



            <td style={{ padding: "12px" }}>

            <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "15px"
            }}>

            <a
            href={`http://localhost:8080/${doc.filePath}`}
            target="_blank"
            rel="noreferrer"
            style={viewStyle}
            >
            View
            </a>



           <label style={{
    background: "#f59e0b",
    color: "white",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "13px"
}}>
    Replace

    <input
        type="file"
        style={{ display: "none" }}
        onChange={(e) => handleReplace(doc.id, e.target.files[0])}
    />
</label>


            <button onClick={() => handleDelete(doc.id)} style={deleteStyle}>
                    Delete
                </button>
                </div>
            </td>
        </tr>
    );
})}
    </tbody>
</table> */}
{/* </div> */}
</div>
        </div>
        </div>
    );
}

export default AddDocument;