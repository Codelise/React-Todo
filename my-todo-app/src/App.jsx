import { useState } from "react";

export default function Todo() {
  const [taskArray, setTaskArray] = useState([
    {
      task_id: 1,
      task_name: "Review design system components",
      task_time: "Today, 4:00 PM",
      task_completed: false,
    },
    {
      task_id: 2,
      task_name: "Play video games",
      task_time: "Tomorrow, 9:00 PM",
      task_completed: false,
    },
    {
      task_id: 3,
      task_name: "Code",
      task_time: "Today, 3:00 PM",
      task_completed: true,
    },
  ]);

  function handleShowAlert() {
    alert("Ugghhh mmmm!");
  }
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-gradient-mesh dark group/design-root overflow-hidden justify-center items-center p-4">
      {/* Decorative blurred circles */}
      <div className="absolute top-10 left-12.5 w-64 h-64 bg-primary/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
      <div className="absolute top-0 right-12.5 w-64 h-64 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
      <div className="absolute -bottom-32 left-20 w-80 h-80 bg-blue-600/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>

      {/* Main Glass Container */}
      <main className="relative z-10 w-full max-w-md glass-panel rounded-3xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <header className="flex items-center justify-center p-6 border-b border-white/5 bg-white/5">
          <h1 className="text-white text-xl font-bold tracking-wide">
            My Todo List
          </h1>
        </header>

        {/* Input Area */}
        <div className="p-6 pb-2">
          <div className="flex flex-col gap-3">
            <label className="relative block w-full">
              <span className="sr-only">Add a new task</span>
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-white/40 pointer-events-none">
                <span className="material-symbols-outlined">add_task</span>
              </div>
              <input
                className="glass-input w-full rounded-2xl text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/30 h-14 pl-12 pr-4 text-base font-normal leading-normal transition-all shadow-lg shadow-black/5"
                placeholder="What needs to be done?"
                type="text"
              />
            </label>
            <button
              onClick={handleShowAlert}
              className="w-full h-12 rounded-xl bg-primary hover:bg-blue-600 text-white font-semibold text-sm tracking-wide shadow-[0_0_15px_rgba(43,108,238,0.4)] transition-all hover:shadow-[0_0_20px_rgba(43,108,238,0.6)] active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <span>Add Task</span>
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "18px" }}
              >
                arrow_forward
              </span>
            </button>
          </div>
        </div>

        {/* Todo List */}
        <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-2">
          {taskArray.map((task) => {
            return (
              <div
                className="group flex items-center gap-4 glass-item p-4 rounded-xl transition-all hover:bg-white/10 hover:shadow-md cursor-pointer"
                key={task.task_id}
              >
                <input
                  className="h-6 w-6 cursor-pointer appearance-none rounded-lg border-2 border-white/20 bg-transparent"
                  type="checkbox"
                />

                <div className="flex-1 min-w-0">
                  <p className="text-white text-base font-medium leading-normal">
                    {task.task_name}
                  </p>
                  <p className="text-white/40 text-xs mt-0.5">
                    {task.task_time}
                  </p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-red-400">
                  <span className="material-symbols-outlined text-[20px]">
                    delete+
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
