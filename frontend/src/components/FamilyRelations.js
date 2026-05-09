import { useEffect, useState } from "react";
import api from "../api/axiosConfig";

function FamilyRelations() {

    const [persons, setPersons] = useState([]);

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

const [selectedPerson, setSelectedPerson] = useState(null);

const childrenArray = selectedPerson?.childrenNames
    ? selectedPerson.childrenNames.split(",")
    : [];

    return (

        <div style={{maxWidth: "900px", margin: "auto",background: "white", padding: "25px", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)"}}>
            <h2 style={{marginBottom: "20px", color: "#1e293b"}}>Family Relations</h2>

            <select
    onChange={(e) => {
        const person = persons.find(
            (p) => p.id === Number(e.target.value)
        );

        setSelectedPerson(person);
    }}
    style={{
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginBottom: "20px"
    }}
>
    <option value="">Select Person</option>

    {persons.map((p) => (
        <option key={p.id} value={p.id}>
            {p.firstName} {p.lastName}
        </option>
    ))}
</select>

{selectedPerson && (

    <div style={{ 
        marginTop: "20px",
        padding: "20px",
        borderRadius: "12px",
        background: "#f8fafc",
        border: "1px solid #e5e7eb"
    }}>

        {/* TOP ROW: HEAD + SPOUSE */}
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "120px",
            position: "relative"
        }}>

            {/* Head */}
            <div style={{
                padding: "15px 25px",
                borderRadius: "12px",
                background: "#1976d2",
                color: "white",
                minWidth: "160px",
                boxShadow: "0 6px 12px rgba(0,0,0,0.2)"
            }}>
                <b>{selectedPerson.firstName} {selectedPerson.lastName}</b>
                <div style={{ fontSize: "12px" }}>Head</div>
            </div>

            {/* Horizontal line between Head & Spouse */}
            <div style={{
                position: "absolute",
                top: "30px",
                width: "120px",
                height: "2px",
                background: "#333"
            }}></div>

            {/* Spouse */}
            <div style={{
                padding: "15px 25px",
                borderRadius: "12px",
                background: "#e91e63",
                color: "white",
                minWidth: "160px",
                boxShadow: "0 6px 12px rgba(0,0,0,0.2)"
            }}>
                <b>{selectedPerson.spouseName}</b>
                <div style={{ fontSize: "12px" }}>Spouse</div>
            </div>

        </div>

        {/* vertical connector */}
        <div style={{
            width: "2px",
            height: "40px",
            background: "#333",
            margin: "0 auto"
        }}></div>

        {/* CHILDREN BRANCH LINE */}
        <div style={{
            width: `${Math.max(childrenArray.length * 120, 120)}px`,
            height: "2px",
            background: "#333",
            margin: "0 auto"
        }}></div>

        {/* CHILDREN */}
        <div style={{
            display: "flex",
            justifyContent: "center",
            gap: "30px",
            marginTop: "10px"
        }}>

            {childrenArray.map((child, i) => (
                <div key={i} style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}>

                    {/* vertical line to child */}
                    <div style={{
                        width: "2px",
                        height: "20px",
                        background: "#333"
                    }}></div>

                    {/* child box */}
                    <div style={{
                        padding: "12px 18px",
                        borderRadius: "10px",
                        background: "#43a047",
                        color: "white",
                        minWidth: "120px",
                        boxShadow: "0 4px 8px rgba(0,0,0,0.15)"
                    }}>
                        {child.trim()}
                        <div style={{ fontSize: "11px" }}>Child</div>
                    </div>

                </div>
            ))}

        </div>

    </div>

)}
        </div>
    );
}

export default FamilyRelations;