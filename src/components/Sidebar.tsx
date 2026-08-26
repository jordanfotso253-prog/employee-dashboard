import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  CalendarDays,
  Wallet,
  GraduationCap,
  BarChart3,
  Settings,
  LogOut,
  Building2,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const { logout } = useAuth();

  const links = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Tableau de bord' },
    { to: '/employees', icon: Users, label: 'Employés' },
    { to: '/recruitment', icon: Briefcase, label: 'Recrutement' },
    { to: '/leaves', icon: CalendarDays, label: 'Congés' },
    { to: '/payroll', icon: Wallet, label: 'Paie' },
    { to: '/training', icon: GraduationCap, label: 'Formation' },
    { to: '/reports', icon: BarChart3, label: 'Rapports' },
    { to: '/settings', icon: Settings, label: 'Paramètres' },
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
            className={({ isActive }) =>
              `sidebar-link ${isActive ? 'active' : ''}`
            }
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
          Déconnexion
        </button>
      </div>
    </aside>
  );
}
