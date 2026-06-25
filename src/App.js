import "./App.css";
import { useState, useEffect } from "react";

function App() {

  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(() => 
  {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [filter, setFilter] = useState("All");

useEffect(() => {
    localStorage.setItem(
      "tasks",
      JSON.stringify(tasks)
    );
}, [tasks]);

  const addTask = () => {

    if (task.trim() === "") return;

    const newTask = {
  id: Date.now(),
  title: task,
  status: "Pending"
};

    setTasks([...tasks, newTask]);
    setTask("");
  };
const deleteTask = (id) => {
  setTasks(
    tasks.filter(
      (task) => task.id !== id
    )
  );
};
const updateStatus = (id) => {

  setTasks(
    tasks.map((task) => {

      if (task.id === id) {

        if (task.status === "Pending") {
          return { ...task, status: "In Progress" };
        }

        if (task.status === "In Progress") {
          return { ...task, status: "Completed" };
        }

      }

      return task;
    })
  );
};

const sortTasks = () => {
  const sorted = [...tasks].sort((a, b) =>
    a.title.localeCompare(b.title)
  );

  setTasks(sorted);
};

const clearAllTasks = () => {
  const confirmClear = window.confirm(
    "Are you sure you want to delete all tasks?"
  );

  if (confirmClear) {
    setTasks([]);
  }
};

const filteredTasks =
  filter === "All"
    ? tasks
    : tasks.filter(
        (task) => task.status === filter
      );

      const totalTasks = tasks.length;

const completedTasks = tasks.filter(
  (task) => task.status === "Completed"
).length;

  return (
    <div className="container">
      <h1>To-Do List Application</h1>
<div className="stats">
  <span>Total Tasks: {totalTasks}</span>
  <span>Completed: {completedTasks}</span>
</div>
      <input
        type="text"
        placeholder="Enter a task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      <button onClick={addTask}>
        Add Task
      </button>
<select
  value={filter}
  onChange={(e) => setFilter(e.target.value)}
>
  <option value="All">All</option>
  <option value="Pending">Pending</option>
  <option value="In Progress">In Progress</option>
  <option value="Completed">Completed</option>
</select>

      <button onClick={sortTasks}>
        Sort A-Z
      </button>

      <button onClick={clearAllTasks}>
  Clear All Tasks
</button>

     <ul>
  {filteredTasks.length === 0 ? (
    <p>No tasks found.</p>
  ) : (
    filteredTasks.map((item) => (
      <li key={item.id}>
        {item.title}

        <span
          className={`status ${item.status.replace(" ", "-")}`}
        >
          {item.status}
        </span>

        <button
          onClick={() => updateStatus(item.id)}
        >
          Update Status
        </button>

        <button
          onClick={() => deleteTask(item.id)}
        >
          Delete
        </button>
      </li>
    ))
  )}
</ul>

    </div>
  );
}
export default App;