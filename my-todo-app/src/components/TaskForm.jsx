export default function TaskForm({ newTask, onNewTaskChange, onSubmit }) {
  console.log("Props recieved: ", { newTask, onNewTaskChange, onSubmit });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
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
              onChange={(e) => {
                onNewTaskChange(e.target.value);
              }}
              value={newTask}
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
  );
}
