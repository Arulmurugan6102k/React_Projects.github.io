import React, { useState } from "react";
import "./To-Do.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

function ToDoApp() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [draggedItem, SetdraggedItem] = useState("");
  console.log(draggedItem);

  const addTask = () => {
    setNewTask("");
    if (newTask.trim() !== "") {
      const newTaskObj = {
        id: tasks.length + 1,
        text: newTask,
        completed: false,
      };
      setTasks([...tasks, newTaskObj]);
    }
  };

  const editTask = (id, newText) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, text: newText } : task
    );
    setTasks(updatedTasks);
  };

  const toggleComplete = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); 
      addTask();
    } else {
      setNewTask(event.target.value);
    }
  };

  const OnDragStartHandle = (e, index) => {
    SetdraggedItem(tasks[index]);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target.parentNode);
    e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
  };

  const onDragOverHandle = (index) => {
    const draggedOverItem = tasks[index];

    if (draggedOverItem === draggedItem) {
      return;
    }

    const items = tasks.filter(item => item !== draggedItem);

    items.splice(index, 0, draggedItem);

    setTasks(items);
  };

  return (
    <div className="container mt-4">
      <h1>Todo List</h1>
      <div className="mt-3">
        <input
          type="text"
          className="form-control"
          placeholder="Add a new task"
          value={newTask}
          onChange={handleKeyDown}
          onKeyDown={handleKeyDown} 
        />

        <button className="btn btn-primary mt-2" onClick={addTask}>
          Add Task
        </button>
        <ul className="list-group mt-3">
          {tasks.map((task, idx) => (
            <li
              onDragOver={() => onDragOverHandle(idx)}
              key={task.id}
              
            >
              <div
                className={`${task.completed ? "completed-task" : "" } list-group-item d-flex justify-content-between align-items-center `}
                draggable
                key={task.id}
                onDragStart={(event) => OnDragStartHandle(event, idx)}
              >
                {task.text}

                <div>
                <button
                  className={`btn btn-success btn-sm edit-btn ${
                    task.completed ? "btn-danger" : "btn-success"
                  }`}
                  onClick={() => toggleComplete(task.id)}
                >
                  {task.completed ? "undo" : "Completed"}
                </button>
                <button
                  className="btn btn-warning btn-sm edit-btn"
                  onClick={() => {
                    const updatedText = prompt("Edit Task:", task.text);
                    if (updatedText !== null) {
                      editTask(task.id, updatedText);
                    }
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>
              </div>

              </div>
             
            </li>
          ))}
        </ul>
       
      </div>
      <button className="btn btn-primary page-nav-btn "><Link className="link" to="nextPage">Nxt</Link></button>
    </div>
  );
}

export default ToDoApp;
