import { useState } from "react";
import { Icon } from "../../common/Icons";

export function Topbar({
  user,
  theme,
  setTheme,
  requestNotifications,
  onLogout,
}) {
  const [showProfile, setShowProfile] = useState(false);

  const changeTheme = () => {
    setTheme(
      theme === "light"
        ? "dark"
        : "light"
    );
  };

  const toggleProfile = () => {
    setShowProfile((old) => !old);
  };

  return (
    <header className="topbar">

      <div className="mobile-logo brand">
        <span>
          <Icon name="check" />
        </span>
        FocusFlow
      </div>

      <div className="top-actions">

        {/* Notification */}
        <button
          className="icon-btn"
          onClick={requestNotifications}
          title="Enable notifications"
        >
          <Icon name="bell" />
        </button>

        {/* Theme */}
        <button
          className="icon-btn"
          onClick={changeTheme}
          title="Change theme"
        >
          <Icon
            name={theme === "light" ? "moon" : "sun"}
          />
        </button>

        {/* Profile */}
        <div className="profile-wrapper">

          <button
            className="avatar"
            onClick={toggleProfile}
            title="Profile"
            aria-label="Open profile"
          >
            {user.name.charAt(0).toUpperCase()}
          </button>

          {showProfile && (
            <div className="profile-dropdown">

              <div className="profile-info">

                <div className="profile-avatar">
                  {user.name.charAt(0).toUpperCase()}
                </div>

                <div className="profile-details">
                  <strong>{user.name}</strong>
                  <small>{user.email}</small>
                </div>

              </div>

              <div className="profile-divider" />

              <button
                className="profile-logout"
                onClick={onLogout}
              >
                <Icon name="logout" size={17} />
                <span>Logout</span>
              </button>

            </div>
          )}

        </div>

      </div>

    </header>
  );
}
