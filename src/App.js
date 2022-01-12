import React, { useState, useRef, useEffect } from "react";
import { useReactToPrint } from 'react-to-print';
import ToDoList from "./ToDoList";
import { v4 as uuidv4 } from "uuid";
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPrint } from '@fortawesome/free-solid-svg-icons'

import "./App.css";

const LOCAL_STORAGE_KEY = "todoApp.todos";

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();
  const todoListRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => todoListRef.current,
  });

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function handleAddToDo(e) {
    const name = todoNameRef.current.value;
    if (name === "") return;
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }];
    });
    todoNameRef.current.value = null;
  }

  function handleClearTodos() {
    const newTodos = todos.filter((todos) => !todos.complete);
    setTodos(newTodos);
  }

  function AddToProfile() {
    // To Save data from lists to the database
  }

  return (
    <>
    <div className="Background">
      <div className="RootDiv" class="card-header">
         <h1>Grocery List</h1>
        <div className="InputForTask" class="card-body InputTaskBarFrame">
          <span class="CheapFixForBar">
          <input placeholder="Enter your desired foodage." className="TaskInputBar" id="FormControlLg" class="form-control" ref={todoNameRef} type="text" />
          </span>
          <span class="TaskCountText">
           <h4>{todos.filter((todo) => !todo.complete).length} Tasks left in Your Day.</h4> 
          </span>
        </div>
        <span ref={todoListRef}>
        <ToDoList todos={todos} toggleTodo={toggleTodo}/>
        </span>
        <div>
          <div className="ButtonMenuDiv">
          <button className="ButtonMenu" class="btn btn-primary" onClick={handleAddToDo}>Add Task</button>
          <button className="ButtonMenu" class="btn btn-primary" onClick={AddToProfile}>Save To Profile</button>
          <button className="ButtonMenu" class="btn btn-primary" onClick={handlePrint}>
          <FontAwesomeIcon icon="fa-solid fa-print" />
            Print List</button>
          <button className="ButtonMenu" class="btn btn-primary" onClick={handleClearTodos}>Clear Completed Tasks</button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
