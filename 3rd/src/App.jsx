import { useState, useEffect } from "react";
import "./App.css";
import "./items/item.css";
import { v4 as uuidv4 } from "uuid";
import "./items/responsive.css"

function App() {
  const [todo, setTodo] = useState("");
  const [alltodo, setAlltodo] = useState([]);
  const [showSaveButton, setShowSaveButton] = useState(false);
  const [showAddButton, setShowAddButton] = useState(true);
  const [editID, setEditID] = useState(null);

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if (savedTodos && savedTodos.length > 0) {
      setAlltodo(savedTodos);
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(alltodo));
  }, [alltodo]);

  const handleEdit = (todo, id) => {
    setShowSaveButton(true);
    setShowAddButton(false);
    setTodo(todo);
    setEditID(id);
  };

  const handleDelete = (id) => {
    const newTodo = alltodo.filter((item) => item.id !== id);
    setAlltodo(newTodo);
  };

  const handleAdd = () => {
    if (!todo.trim()) {
      alert("Input empty");
      return;
    }
    const newTodo = {
      id: uuidv4(),
      todo,
      isCompleted: false
    };
    setAlltodo([...alltodo, newTodo]);
    setTodo("");
    localStorage.setItem("todos", JSON.stringify([...alltodo, newTodo]));
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheck = (id) => {
    const updatedTodo = alltodo.map((item) =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setAlltodo(updatedTodo);
    localStorage.setItem("todos", JSON.stringify(updatedTodo));
  };

  const handleSaveClick = () => {
    const updatedTodo = alltodo.map((item) =>
      item.id === editID ? { ...item, todo } : item
    );
    setAlltodo(updatedTodo);
    setEditID(null);
    setShowAddButton(true);
    setShowSaveButton(false);
    setTodo("");
    localStorage.setItem("todos", JSON.stringify(updatedTodo));
  };

  return (
    <>
      <div className="container">
        <div className="title">Todo List</div>
        <div className="add">
          <input
            type="text"
            name="todo"
            value={todo}
            placeholder="   Add Items "
            onChange={handleChange}
          />
          {showAddButton && <button id="add" onClick={handleAdd}>Add</button>}
          {showSaveButton && <button id="save" onClick={handleSaveClick}>Save</button>}
        </div>
        <div className="listcontainer">
        <div className="list">
        {alltodo == "" && (<div id="listempty">List is Empty</div>)}
          {alltodo.map((item) => (
            <div key={item.id} className="itembox">
              <hr />
              <div  className={`item ${item.isCompleted ? "completed" : ""}`}>
                <input
                  type="checkbox"
                  name="check"
                  onChange={() => handleCheck(item.id)}
                  checked={item.isCompleted}
                  id={item.id}
                />
                <span className="itemtext">{item.todo}</span>
                <button id="edit" onClick={() => handleEdit(item.todo, item.id)}>Edit</button>
                <button id="del" onClick={() => handleDelete(item.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </>
  );
}

export default App;
