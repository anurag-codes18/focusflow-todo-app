import { TaskCard } from "../TaskCard";
import { EmptyState } from "../EmptyState";


export function TaskList({
  tasks,
  filtered,
  onToggle,
  onEdit,
  onDelete,
  onDragStart,
  onDrop,
  onAdd
}) {

  if (tasks.length === 0) {
    return (
      <EmptyState
        filtered={filtered}
        onAdd={onAdd}
      />
    );
  }

    return (
        <div className="task-list">

      {tasks.map((task) => (

        <TaskCard
          key={task.id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
          onDragStart={onDragStart}
          onDrop={onDrop}
        />

      ))}

    </div>
  );
}

          
          
          
