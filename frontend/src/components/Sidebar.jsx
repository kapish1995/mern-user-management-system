import { NavLink } from "react-router-dom";

export default function Sidebar({ onOpenTheme }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span className="sidebar-brand-mark" aria-hidden="true" />
        <span className="sidebar-brand-name">User Management</span>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/" end className={({ isActive }) => `sidebar-link${isActive ? " active" : ""}`}>
          Dashboard
        </NavLink>
        <NavLink to="/users" className={({ isActive }) => `sidebar-link${isActive ? " active" : ""}`}>
          Users
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <button className="theme-trigger" onClick={onOpenTheme} type="button">
          <span aria-hidden="true">🎨</span>
          Theme
        </button>
      </div>
    </aside>
  );
}
