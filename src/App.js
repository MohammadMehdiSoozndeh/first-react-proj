import { useEffect, useRef, useState } from "react";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from "uuid";

const LOCAL_STORAGE_KEY = "todoApp.todos";

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

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
    todo.isCompleted = !todo.isCompleted;
    setTodos(newTodos);
  }

  function handleAddTodo(e) {
    e.preventDefault();
    const name = todoNameRef.current.value;
    if (name === "") return;
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), text: name, isCompleted: false }];
    });
    todoNameRef.current.value = "";
  }

  function handleClearTodos() {
    const newTodos = todos.filter((todo) => !todo.isCompleted);
    setTodos(newTodos);
  }

  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <form onSubmit={handleAddTodo}>
        <input ref={todoNameRef} type="text" />
        <button type="submit">Add Todo</button>
        <button type="reset">Clear</button>
        <button onClick={handleClearTodos}>Clear Complete Todos</button>
        <div>{todos.filter((todo) => !todo.isCompleted).length} left to do</div>
      </form>
    </>
  );
}

export default App;
