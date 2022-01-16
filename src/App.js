import React, { useState, useRef, useEffect } from "react";
import { useReactToPrint } from 'react-to-print';
import ToDoList from "./ToDoList";
import { v4 as uuidv4 } from "uuid";
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPrint, faSave, faPlusCircle, faEraser } from '@fortawesome/free-solid-svg-icons'
import "./App.css";
import "./Navbar.js"
import Navbar from "./Navbar.js";



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
    <Navbar/>
    <div className="Background">
      <div className="RootDiv" class="card-header containerClass">
         <h1>Grocery List</h1>
        <div className="InputForTask" class="card-body InputTaskBarFrame containerClass">
          <span class="CheapFixForBar">
          <input placeholder="Enter your desired foodage." className="TaskInputBar" id="FormControlLg" class="form-control" ref={todoNameRef} type="text" />
          </span>
          <span class="TaskCountText">
           <h4>{todos.filter((todo) => !todo.complete).length} Items To Go.</h4> 
          </span>
        </div>
        <span ref={todoListRef} class="containerClass">
        <ToDoList todos={todos} toggleTodo={toggleTodo}/>
        </span>
        <div>
          <div className="ButtonMenuDiv">
          <button className="ButtonMenu" class="btn btn-primary" onClick={handleAddToDo}>Add Task
          <FontAwesomeIcon className="Icon" icon={faPlusCircle} color="white"/>
          </button>
          <button className="ButtonMenu" class="btn btn-primary" onClick={AddToProfile}>Save To Profile
          <FontAwesomeIcon className="Icon" icon={faSave} color="white"/>
          </button>
          <button className="ButtonMenu" class="btn btn-primary" onClick={handlePrint}>Print List
          <FontAwesomeIcon className="Icon" icon={faPrint} color="white"/>
          </button>
          <button className="ButtonMenu" class="btn btn-primary" onClick={handleClearTodos}>Clear Done Tasks
          <FontAwesomeIcon className="Icon" icon={faEraser} color="white"/>
          </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
