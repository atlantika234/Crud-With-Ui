import React, { useState, useEffect } from "react";

const API_URL = "http://127.0.0.1:8000/games";

function App() {
  const [games, setGames] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setGames(data);
    } catch (err) {
      console.error("Помилка завантаження:", err);
    }
  };

  const addGame = async () => {
    if (!title.trim()) return;
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });
      if (!res.ok) throw new Error("Помилка при додаванні");
      setTitle("");
      setDescription("");
      fetchGames();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteGame = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Помилка при видаленні");
      fetchGames();
    } catch (err) {
      console.error(err);
    }
  };

  const startEdit = (game) => {
    setEditingId(game.id);
    setTitle(game.title);
    setDescription(game.description || "");
  };

  const saveEdit = async () => {
    try {
      const res = await fetch(`${API_URL}/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });
      if (!res.ok) throw new Error("Помилка при збереженні");
      setEditingId(null);
      setTitle("");
      setDescription("");
      fetchGames();
    } catch (err) {
      console.error(err);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setTitle("");
    setDescription("");
  };

  return (
    <div style={{ maxWidth: 800, margin: "40px auto", padding: 20, fontFamily: "sans-serif" }}>
      <h2 style={{ textAlign: "center" }}>Керування іграми</h2>

      <div style={{ marginBottom: 30, background: "#f9f9f9", padding: 20, borderRadius: 8 }}>
        <h3>{editingId ? "Редагувати гру" : "Додати нову гру"}</h3>
        <input
          type="text"
          placeholder="Назва гри"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "100%", marginBottom: 10, padding: 8 }}
        />
        <textarea
          placeholder="Опис гри"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          style={{ width: "100%", marginBottom: 10, padding: 8 }}
        />
        <div>
          {editingId === null ? (
            <button onClick={addGame} style={{ padding: "8px 16px" }}>
              Додати
            </button>
          ) : (
            <>
              <button onClick={saveEdit} style={{ padding: "8px 16px", marginRight: 10 }}>
                Зберегти
              </button>
              <button onClick={cancelEdit} style={{ padding: "8px 16px" }}>
                Відміна
              </button>
            </>
          )}
        </div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
        {games.map((game) => (
          <div key={game.id} style={{ border: "1px solid #ccc", borderRadius: 8, padding: 16, flex: "1 1 250px" }}>
            <h4>{game.title}</h4>
            <p style={{ minHeight: 40 }}>{game.description || "Нет описания"}</p>
            <div style={{ marginTop: 10 }}>
              <button onClick={() => startEdit(game)} style={{ marginRight: 8 }}>
                Змінити
              </button>
              <button onClick={() => deleteGame(game.id)}>Видалити</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
