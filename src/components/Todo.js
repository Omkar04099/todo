import React, { useState, useEffect } from "react";
import styles from '../styles/todo.module.css';
import reset from '../assets/reset.ico';
import add from '../assets/add.png';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      toast.success('Task added successfully!',{
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
    }
    else{
        toast.error('Task cannot be blank, please enter a task!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
    }
  };

  const toggleTodo = (id) => {
    setTodos((prevTodos) => {
      const updatedActiveTodos = prevTodos.active.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      const completedTodo = prevTodos.active.find((todo) => todo.id === id);
       if(todos.active.length===1 && todos.completed.length!==0){
        toast.success('Yay! you have completed all the tasks 🥳',{
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        })
      }
      else if(todos.active.length>0){
        toast.success('Hurray! task marked as complete 😀',{
              position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
              });
        }
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
    // console.log(todos);
    if(todos.active.length===0 && todos.completed.length===0){
        toast.warn('Nothing in the task list to reset🤔',{
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        })
    }else{
        toast.info('Task list has been reset',{
            position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
        });
    }
  };

  return (
    <div className={styles.container}>
      <h1>ToDo App</h1>
      <div className={styles.addTodo}>
        <input
          type="text"
          placeholder="Add a new task 📝..."
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
      <ToastContainer />
    </div>
  );
};

export default Todo;
