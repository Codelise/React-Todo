import { useState, useEffect } from "react";

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

  // saves task to localStorage
  useEffect(() => {
    localStorage.setItem("task", JSON.stringify(taskArray));
  }, [taskArray]);

  // Add task
  function handleAddTask() {
    if (!newTask) return;
    const taskObject = {
      task_id: "-" + Math.random().toString(36).substring(2, 9),
      task_name: newTask,
      task_time: Date.now().toLocaleString(),
      task_completed: false,
    };
    setTaskArray([...taskArray, taskObject]); // creates a new object that includes the input value
    console.log([...taskArray, taskObject]);
    setNewTask(""); // clears the input field
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
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            handleAddTask();
          }}
        >
          <div className="p-6 pb-2">
            <div className="flex flex-col gap-3">
              <label className="relative block w-full">
                <span className="sr-only">Add a new task</span>
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-white/40">
                  <span className="material-symbols-outlined">add_task</span>
                </div>
                <input
                  className="w-full pl-12 pr-4 text-base font-normal leading-normal text-white transition-all shadow-lg glass-input rounded-2xl placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/30 h-14 shadow-black/5"
                  placeholder="What needs to be done?"
                  type="text"
                  value={newTask}
                  onChange={(e) => {
                    const userTyped = e.target.value;
                    setNewTask(userTyped);
                  }}
                />
              </label>
              <button
                type="submit"
                className="w-full h-12 rounded-xl bg-primary hover:bg-blue-600 text-white font-semibold text-sm tracking-wide shadow-[0_0_15px_rgba(43,108,238,0.4)] transition-all hover:shadow-[0_0_20px_rgba(43,108,238,0.6)] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Add Task</span>
              </button>
            </div>
          </div>
        </form>

        {/* Todo List */}
        <div className="flex-1 px-4 pb-6 mt-5 space-y-2 overflow-y-auto">
          {taskArray.map((task) => {
            return (
              <div
                className={
                  task.task_completed
                    ? "opacity-60 flex items-center gap-4 p-4 transition-all cursor-pointer group glass-item rounded-xl hover:bg-white/10 hover:shadow-md"
                    : "flex items-center gap-4 p-4 transition-all cursor-pointer group glass-item rounded-xl hover:bg-white/10 hover:shadow-md"
                }
                key={task.task_id}
              >
                <input
                  className="w-6 h-6 bg-transparent border-2 rounded-lg cursor-pointer border-white/20"
                  type="checkbox"
                  onChange={() => {
                    handleToggleTask(task.task_id);
                  }}
                  checked={task.task_completed}
                />

                <div className="flex-1 min-w-0">
                  <p
                    className={
                      task.task_completed
                        ? "text-white line-through"
                        : "text-base font-medium leading-normal text-white"
                    }
                  >
                    {task.task_name}
                  </p>
                  <p className="text-white/40 text-xs mt-0.5">
                    {task.task_time}
                  </p>
                </div>
                <div className="">
                  <button className="pr-3 transition-opacity rounded-lg opacity-100 cursor-pointer hover:bg-white/10 text-white/60">
                    <span className="material-symbols-outlined text-[20px]">
                      edit
                    </span>
                  </button>
                  <button
                    className="p-2 transition-opacity rounded-lg opacity-100 cursor-pointer hover:bg-white/10 text-white/60 hover:text-red-400"
                    onClick={() => {
                      handleDeleteTask(task.task_id);
                    }}
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      delete
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
