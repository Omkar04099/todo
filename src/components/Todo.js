import React, { useState, useEffect } from "react";
import styles from '../styles/todo.module.css';
import reset from '../assets/reset.ico';
import add from '../assets/add.png'

const Todo = () => {
  const loadStateFromLocalStorage = () => {
    const storedState = localStorage.getItem("todos");
    return storedState
      ? JSON.parse(storedState)
      : { active: [], completed: [] };
  };

  const [todos, setTodos] = useState(loadStateFromLocalStorage);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos({
        active: [
          { id: Date.now(), text: newTodo, completed: false },
          ...todos.active,
        ],
        completed: todos.completed,
      });
      setNewTodo("");
    }
  };

  const toggleTodo = (id) => {
    setTodos((prevTodos) => {
      const updatedActiveTodos = prevTodos.active.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      const completedTodo = prevTodos.active.find((todo) => todo.id === id);

      return {
        active: updatedActiveTodos.filter((todo) => !todo.completed),
        completed: completedTodo
          ? [
              { ...completedTodo, completed: !completedTodo.completed },
              ...prevTodos.completed,
            ]
          : prevTodos.completed,
      };
    });
  };

  const resetTodos = () => {
    setTodos({ active: [], completed: [] });
  };

  return (
    <div className={styles.container}>
      <h1>ToDo App</h1>
      <div className={styles.addTodo}>
        <input
          type="text"
          placeholder="Add a new task..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              addTodo();
            }
          }}
        />
        <a href="#" onClick={addTodo}><img src={add} alt="add-todo"/></a>
    </div>
      <div className={styles.cardContainer}>
        {[...todos.active, ...todos.completed].map((todo) => (
          <div 
            className={styles.card}
            key={todo.id}
            onClick={() => toggleTodo(todo.id)}
            style={{ textDecoration: todo.completed ? "line-through" : "none" }}
          >
            {todo.text}
          </div>
        ))}
      </div>
      <a href="#"
        className={styles.addBtn}
        onClick={resetTodos}
      >
        <img src={reset} alt="reset"/>
      </a>
      
    </div>
  );
};

export default Todo;
