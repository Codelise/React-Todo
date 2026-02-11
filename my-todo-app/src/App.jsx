import { useState, useEffect } from "react";
import TodoItem from "./components/TodoItem";
import TaskForm from "./components/TaskForm";

export default function Todo() {
  // gets saved task from localStorage, if empty shows empty array (blank)
  const [taskArray, setTaskArray] = useState(() => {
    const loadFromLocalStorage = localStorage.getItem("task");
    if (!loadFromLocalStorage) {
      return [];
    } else {
      return JSON.parse(loadFromLocalStorage);
    }
  });

  // this is for the input task only
  const [newTask, setNewTask] = useState("");
  // for editing task
  const [editTask, setEditTask] = useState(null);

  // saves task to localStorage
  useEffect(() => {
    localStorage.setItem("task", JSON.stringify(taskArray));
  }, [taskArray]);

  // Add task
  function handleAddTask() {
    if (!newTask) {
      alert("Please add a task");
      return;
    }

    // editTask === null means I'm not editing
    if (editTask === null) {
      const taskObject = {
        task_id: "-" + Math.random().toString(36).substring(2, 9),
        task_name: newTask,
        task_time: new Date().toLocaleString(),
        task_completed: false,
      };
      setTaskArray([...taskArray, taskObject]); // creates a new object that includes the input value
    }
    // else I'm editing a task
    else {
      const updatedTask = taskArray.map((task) => {
        if (task.task_id === editTask) {
          return { ...task, task_name: newTask };
        } else {
          return task;
        }
      });
      setTaskArray(updatedTask);
    }
    setNewTask(""); // clears the input field
    setEditTask(null);
  }

  // Delete Task
  function handleDeleteTask(id) {
    const confirmDelete = confirm("Are you sure you want to delete this task?");
    if (!confirmDelete) return;
    const deleteTask = taskArray.filter((task) => task.task_id !== id);
    setTaskArray(deleteTask);
  }

  // Check task
  function handleToggleTask(id) {
    const updated = taskArray.map((task) => {
      if (task.task_id === id) {
        return { ...task, task_completed: !task.task_completed };
      } else {
        return task;
      }
    });

    setTaskArray(updated);
  }

  // Edit task
  function handleEditTask(id) {
    setEditTask(id);
    const findTask = taskArray.find((task) => task.task_id === id);
    if (findTask) {
      // sets the new edited task name or empy string
      setNewTask(findTask.task_name || "");
    }
  }

  return (
    <div className="relative flex flex-col items-center justify-center w-full min-h-screen p-4 overflow-hidden bg-gradient-mesh dark group/design-root">
      {/* Decorative blurred circles */}
      <div className="absolute top-10 left-12.5 w-64 h-64 bg-primary/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
      <div className="absolute top-0 right-12.5 w-64 h-64 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
      <div className="absolute rounded-full -bottom-32 left-20 w-80 h-80 bg-blue-600/20 mix-blend-multiply filter blur-3xl opacity-70"></div>

      {/* Main Glass Container */}
      <main className="relative z-10 w-full max-w-md glass-panel rounded-3xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <header className="flex items-center justify-center p-6 border-b border-white/5 bg-white/5">
          <h1 className="text-xl font-bold tracking-wide text-white">
            My Todo List
          </h1>
        </header>

        {/* Input Area */}
        <TaskForm
          newTask={newTask}
          onNewTaskChange={setNewTask}
          onSubmit={handleAddTask}
        />

        {/* Todo List */}
        <div className="flex-1 px-4 pb-6 mt-5 space-y-2 overflow-y-auto">
          {taskArray.map((task) => {
            return (
              <TodoItem
                key={task.task_id}
                task={task}
                onToggle={handleToggleTask}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}
