import { useState } from "react";
import classes from "./Todos.module.scss";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export default function Todos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [isListVisible, setIsListVisible] = useState(true);

  const addTodo = () => {
    if (!inputValue.trim()) return;

    setTodos([
      ...todos,
      {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false,
      },
    ]);
    setInputValue("");
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const activeTodos = todos.filter((todo) => !todo.completed).length;
  const completedTodos = todos.length - activeTodos;

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>todos</h1>

      <div className={classes.inputWrapper}>
        <button
          className={`${classes.toggleButton} ${
            !isListVisible ? classes.collapsed : ""
          }`}
          onClick={() => setIsListVisible(!isListVisible)}
        >
          ▼
        </button>
        <input
          type="text"
          className={classes.input}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
          placeholder="What needs to be done?"
        />
      </div>

      <div
        className={`${classes.todoList} ${
          !isListVisible ? classes.hidden : ""
        }`}
      >
        {filteredTodos.map((todo) => (
          <div
            key={todo.id}
            className={`${classes.todoItem} ${
              todo.completed ? classes.completed : ""
            }`}
          >
            <input
              type="checkbox"
              className={classes.checkbox}
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span className={classes.text}>{todo.text}</span>
          </div>
        ))}
      </div>

      <div className={classes.filters}>
        <span>{activeTodos} items left</span>

        <div>
          <button
            className={filter === "all" ? classes.active : ""}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={filter === "active" ? classes.active : ""}
            onClick={() => setFilter("active")}
          >
            Active
          </button>
          <button
            className={filter === "completed" ? classes.active : ""}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
        </div>
        <button
          className={classes.clearCompleted}
          disabled={!(completedTodos > 0)}
          onClick={clearCompleted}
        >
          Clear completed
        </button>
      </div>
    </div>
  );
}
