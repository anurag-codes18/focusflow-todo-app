import { Icon } from "../../common/Icons";

export function Topbar({
  user,
  theme,
  setTheme,
  requestNotifications
}) {

  const changeTheme = () => {
    setTheme(
      theme === "light"
        ? "dark"
        : "light"
    );
  };

    return (
        <header className="topbar">
            <div className="mobile-logo brand">
                <span><Icon name="check"/></span>
                FocusFlow
            </div>
            <div className="top-actions">
                <button className="icon-btn" onClick={requestNotifications} title="Enable notifications">
                    <Icon name="bell"/>
                </button>
                <button className="icon-btn" onClick={changeTheme} title="Change theme">
                    <Icon name={theme === 'light'?'moon':'sun'} />
                </button>
                <div className="avatar">
                    {user.name.charAt(0).toUpperCase()}
                </div>
            </div>
        </header>
    );
}
