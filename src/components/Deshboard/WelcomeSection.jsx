import { Icon } from "../../common/Icons";

export function WelcomeSection({
  user,
  onAddTask
}) {

  const today = new Date().toLocaleDateString(
    undefined,
    {
      weekday: "long",
      month: "long",
      day: "numeric"
    }
  );

    return (
        <div className="welcome-row">
            <div>
                <p className="date">{today}</p>
                <h1>Welcome back, {user.name.split(' ')[0]}! 
                    <span>👋</span>
                </h1>
                <p className="muted">
                    Here’s what’s happening with your tasks today.
                </p>
            </div>
                
            <button className="primary-btn add-desktop" onClick={onAddTask}>
                <Icon name="plus"/> Add new task
            </button>
        </div>
    );
}
