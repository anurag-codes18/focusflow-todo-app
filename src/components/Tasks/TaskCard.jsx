import { Icon } from "../../common/Icons";

export function TaskCard({ 
    task, 
    onToggle, 
    onEdit, 
    onDelete, 
    onDragStart, 
    onDrop 
}) {

    const formatDateTime = (timestamp) => {
       if (!timestamp) return "";

        return new Date(timestamp).toLocaleString("en-IN", {
           day: "2-digit",
           month: "short",
           year: "numeric",
           hour: "2-digit",
           minute: "2-digit"
        });
    };

  const overdue = 
    task.dueDate && 
    !task.completed && 
    new Date(task.dueDate + 'T23:59:59') < new Date();

    return (
        <article className={`task-card ${task.completed?'done':''}`} 
            draggable onDragStart={()=>onDragStart(task.id)} 
            onDragOver={e=>e.preventDefault()} 
            onDrop={()=>onDrop(task.id)}
        >

            <button className={`check-btn ${task.completed?'checked':''}`} 
                onClick={()=>onToggle(task.id)} 
                aria-label={task.completed?'Mark incomplete':'Mark complete'}
            >
                {task.completed && <Icon name="check" size={15}/>}
            </button>

            <div className="task-main">

                <div className="task-title-row">
                    <h3>{task.title}</h3>
                    <span className={`priority ${task.priority.toLowerCase()}`}>
                        {task.priority}
                    </span>
                </div>

                {task.description && 
                   <p>{task.description}</p>
                }

                <div className="task-meta">

                    <span className={`category cat-${task.category.toLowerCase()}`}>
                        {task.category}
                    </span>

                    {task.dueDate && 
                        <span className={overdue?'overdue':''}>
                           <Icon name="calendar" size={15}/>
                           {overdue?'Overdue · ':''}
                           {new Date(task.dueDate+'T00:00:00').toLocaleDateString(undefined,{month:'short',day:'numeric'})}
                        </span>
                    }

                    {task.reminderAt && 
                        <span title="Reminder set">
                            <Icon name="bell" size={15}/>
                            Reminder
                        </span>
                    }
                    
                    {task.createdAt &&
                        <span title="Task Added">
                            <Icon name="calendar" size={15} />
                            Added {formatDateTime(task.createdAt)}
                        </span>
                    }

                    {task.completed && task.completedAt &&
                        <span title="Task Completed">
                            <Icon name="check" size={15} />
                            Completed {formatDateTime(task.completedAt)}
                        </span>

                    }
                </div>
            </div>

            <div className="task-actions">

                <button onClick={()=>onEdit(task)} aria-label="Edit task">
                    <Icon name="edit" size={18}/>
                </button>
                
                <button onClick={()=>onDelete(task.id)} aria-label="Delete task">
                    <Icon name="trash" size={18}/>
                </button>

            </div>
        </article>
    ); 
}




