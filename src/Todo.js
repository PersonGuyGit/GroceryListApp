import "./Todo.css";
import React from "react";

export default function Todo({ todo, toggleTodo }) {
  function handleToDoClick(params) {
    toggleTodo(todo.id);
  }
  return (
    <div class="card">
      <div class="card-body">
        <label>
          <input
            type="checkbox"
            className="checkBoxCard"
            checked={todo.complete}
            onChange={handleToDoClick}
          />
          <span>{todo.name}</span>
        </label>
      </div>
    </div>
  );
}
