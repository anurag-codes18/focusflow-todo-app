import { Icon } from "../../common/Icons";

export function EmptyState ({ 
    filtered,
    onAdd
}) {

    return (
        <div className="empty-state">

            <div className="empty-icon">
                <Icon name={filtered?'search':'check'} size={34}/>
            </div>

            <h3>{filtered?'No matching tasks':'Your list is clear'}</h3>
            <p>{filtered?'Try changing your search or filters.':'Add your first task and start making progress.'}</p>

            {!filtered && (
                <button className="primary-btn" onClick={onAdd}> 
                <Icon name="plus" size={18}/> 
                Add first task 
                </button>
            )}
        </div>
    );
}