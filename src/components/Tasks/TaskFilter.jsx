import { Icon } from "../../common/Icons";
import { categories, priorities } from "../../data/constants";

export function TaskFilters({
  search,
  setSearch,
  status,
  setStatus,
  category,
  setCategory,
  priority,
  setPriority
}) {

    return (
        <div className="tool-row">

            <div className="search-box">

                <Icon name="search"/>

                <input type={search} 
                    value={search} 
                    onChange={e=>setSearch(e.target.value)} 
                    placeholder="Search tasks..."
                />

            </div>

            <select value={status} onChange={e=>setStatus(e.target.value)}>

                <option>All</option>
                <option>Pending</option>
                <option>Completed</option>

            </select>

            <select value={category} onChange={e=>setCategory(e.target.value)}>

                <option>All</option>
                {
                   categories.map(x=><option key={x}>{x}</option>)
                }

            </select>

            <select value={priority} onChange={e=>setPriority(e.target.value)}>

                <option>All</option>
                {
                   priorities.map(x=><option key={x}>{x}</option>)
                }

            </select>

        </div>

    );
}