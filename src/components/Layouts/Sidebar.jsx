import { Icon } from "../../common/Icons";


export function Sidebar({
  user,
  stats,
  setStatus,
  onLogout
}) {

    const scrollToStats = () => {
        document
            .querySelector(".stats-grid")
            ?.scrollIntoView({
            behavior: "smooth"
        });
    };

    return (
        <aside className="sidebar">
            <div className="brand">
                <span><Icon name="check"/></span>
                FocusFlow
            </div>
            <nav>
                <button className="active">
                    <Icon name="grid"/> 
                    My tasks 
                    <b>{stats.pending}</b>
                </button>
                <button onClick={()=>setStatus('Completed')}>
                    <Icon name="check"/> Completed
                </button>
                <button onClick={scrollToStats}>
                   <Icon name="chart"/> Statistics
                </button>
            </nav>
            <div className="sidebar-bottom">
                <div className="mini-profile">
                    <div>
                        {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span><b>{user.name}</b>
                        <small>{user.email}</small>
                    </span>
                </div>
                <button className="logout-btn" onClick={onLogout}>
                    <Icon name="logout"/> Log out
                </button>
            </div>
        </aside>
    );
}