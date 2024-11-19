import { useState, useEffect } from "react";

export default function ItemManager() {
  const [nome, setNome] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [items, setItems] = useState([]);

  
  const fetchItems = async () => {
    const response = await fetch("/api/item");
    const data = await response.json();
    setItems(data);
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/item", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, quantidade }),
    });
    setNome("");
    setQuantidade("");
    fetchItems(); 
  };

  
  const deleteItem = async (id) => {
    await fetch("/api/item", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchItems(); 
  };

  
  useEffect(() => {
    fetchItems();
  }, []);

  return (
<div style={{ maxWidth: "400px", margin: "0 auto", padding: "10px", fontFamily: "Arial, sans-serif" }}>
  <form onSubmit={handleSubmit}>
    <h2>Adicionar Item</h2>
    <input
      type="text"
      placeholder="Nome"
      value={nome}
      onChange={(e) => setNome(e.target.value)}
      required
      style={{
        width: "100%",
        padding: "5px",
        marginBottom: "5px",
        border: "1px solid black",
      }}
    />
    <input
      type="number"
      placeholder="Quantidade"
      value={quantidade}
      onChange={(e) => setQuantidade(e.target.value)}
      required
      style={{
        width: "100%",
        padding: "5px",
        marginBottom: "5px",
        border: "1px solid black",
      }}
    />
    <button
      type="submit"
      style={{
        width: "100%",
        padding: "20px",
        backgroundColor: "blue",
        color: "White",
        border: "1px solid black",
        cursor: "pointer",
      }}
    >
      Adicionar
    </button>
  </form>

  <h2>Itens Cadastrados</h2>
  <div>
    {items.map((item) => (
      <div
        key={item.id}
        style={{
          marginBottom: "5px",
          padding: "5px",
          border: "1px solid black",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span>
          {item.nome} - {item.quantidade}
        </span>
        <button
          onClick={() => deleteItem(item.id)}
          style={{
            padding: "5px",
            backgroundColor: "white",
            color: "black",
            border: "1px solid black",
            cursor: "pointer",
          }}
        >
          Remover
        </button>
      </div>
    ))}
  </div>
</div>


  );
}


