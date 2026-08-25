import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, BarChart3, Settings, LogOut, Building2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const { logout } = useAuth();

  const links = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/employees', icon: Users, label: 'Employees' },
    { to: '/reports', icon: BarChart3, label: 'Reports' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">
          <Building2 size={20} />
        </div>
        Employee Manager
      </div>

      <nav className="sidebar-nav">
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            onClick={onClose}
          >
            <Icon size={20} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button
          onClick={() => {
            logout();
            onClose?.();
          }}
          className="sidebar-link"
          style={{ width: '100%' }}
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}
