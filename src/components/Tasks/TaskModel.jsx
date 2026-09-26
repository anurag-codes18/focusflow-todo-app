import { useState } from "react";
import { Icon } from "../../common/Icons";
import { categories, priorities } from "../../data/constants";



export function TaskModal({ 
    task, 
    onClose, 
    onSave 
}) {

    const empty = { 
        title:'', 
        description:'', 
        category:'Personal', 
        priority:'Medium', 
        dueDate:'', 
        reminderAt:''
    };
    const [form, setForm] = useState(task || empty);

    const submit = e => {
        e.preventDefault();
        if (!form.title.trim()) return;
        onSave({...form, title:form.title.trim(), description:form.description.trim()});
    };

    return (
        <div className="modal-backdrop" onMouseDown={e => e.target === e.currentTarget && onClose()}>

            <form className="task-modal" onSubmit={submit}>

                <div className="modal-head">
                    <div>
                        <p className="eyebrow purple">TASK DETAILS</p>
                        <h2>{task ? 'Edit task' : 'Create a new task'}</h2>
                    </div>
                    <button type="button" className="icon-btn" onClick={onClose}>
                        <Icon name="close"/>
                    </button>
                </div>

                <label>Task title
                    <input autoFocus required value={form.title} 
                        onChange={e=>setForm({...form,title:e.target.value})} 
                        placeholder="What needs to be done?" 
                    />
                </label>

                <label>Description
                    <textarea rows="3" 
                        value={form.description} 
                        onChange={e=>setForm({...form,description:e.target.value})} 
                        placeholder="Add some helpful details..." 
                    />
                </label>

                <div className="form-grid">

                    <label>Category
                        <select value={form.category} 
                            onChange={e=>setForm({...form,category:e.target.value})}
                        >

                            {categories.map(x=><option key={x}>{x}</option>)}
                        </select>
                    </label>

                    <label>Priority
                        <select value={form.priority} 
                            onChange={e=>setForm({...form,priority:e.target.value})}
                        >
                            {priorities.map(x=><option key={x}>{x}</option>)}
                        </select>
                    </label>

                    <label>Due date
                        <input type="date" 
                            value={form.dueDate} 
                            onChange={e=>setForm({...form,dueDate:e.target.value})}
                        />
                    </label>

                    <label>Reminder
                        <input type="datetime-local" 
                            value={form.reminderAt || ''} 
                            onChange={e=>setForm({...form,reminderAt:e.target.value})}
                        />
                    </label>
                </div>

                <div className="modal-actions">
                    <button type="button" 
                        className="secondary-btn" 
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    
                    <button className="primary-btn">
                        {task ? 'Save changes' : 'Add task'}
                    </button>
                </div>

            </form>
        </div>
    );
}
