import { useState, useEffect } from "react";

function App() {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: "", content: "" });

  // ✅ Fetch all notes from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/notes")
      .then((res) => res.json())
      .then((data) => setNotes(data))
      .catch((err) => console.error("Error fetching notes:", err));
  }, []);

  // ✅ Add new note
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.content) return alert("Fill all fields");

    const res = await fetch("http://localhost:5000/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const newNote = await res.json();
    setNotes([newNote, ...notes]); // add new note at top
    setForm({ title: "", content: "" });
  };

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto", fontFamily: "Arial" }}>
      <h1>📝 My Notes</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
        <textarea
          placeholder="Content"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Add Note
        </button>
      </form>

      {notes.length === 0 ? (
        <p>No notes yet...</p>
      ) : (
        notes.map((note) => (
          <div
            key={note._id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <small>{new Date(note.createdAt).toLocaleString()}</small>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
