export default function TodoItem({ task, onToggle, onEdit, onDelete }) {
  return (
    <div
      className={
        task.task_completed
          ? "opacity-60 flex items-center gap-4 p-4 transition-all cursor-pointer group glass-item rounded-xl hover:bg-white/10 hover:shadow-md"
          : "flex items-center gap-4 p-4 transition-all cursor-pointer group glass-item rounded-xl hover:bg-white/10 hover:shadow-md"
      }
    >
      <input
        className="w-6 h-6 bg-transparent border-2 rounded-lg cursor-pointer border-white/20"
        type="checkbox"
        onChange={() => onToggle(task.task_id)}
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
        <p className="text-white/40 text-xs mt-0.5">{task.task_time}</p>
      </div>
      <div className="">
        <button
          className="pr-3 transition-opacity rounded-lg opacity-100 cursor-pointer hover:bg-white/10 text-white/60"
          onClick={() => onEdit(task.task_id)}
        >
          <span className="material-symbols-outlined text-[20px]">edit</span>
        </button>
        <button
          className="p-2 transition-opacity rounded-lg opacity-100 cursor-pointer hover:bg-white/10 text-white/60 hover:text-red-400"
          onClick={() => onDelete(task.task_id)}
        >
          <span className="material-symbols-outlined text-[20px]">delete</span>
        </button>
      </div>
    </div>
  );
}
