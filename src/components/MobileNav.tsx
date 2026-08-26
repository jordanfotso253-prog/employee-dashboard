import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  CalendarDays,
  BarChart3,
} from 'lucide-react';

const links = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Accueil' },
  { to: '/employees', icon: Users, label: 'Employés' },
  { to: '/recruitment', icon: Briefcase, label: 'Recrut.' },
  { to: '/leaves', icon: CalendarDays, label: 'Congés' },
  { to: '/reports', icon: BarChart3, label: 'Rapports' },
];

export function MobileNav() {
  return (
    <nav className="mobile-nav">
      {links.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `mobile-nav-link ${isActive ? 'active' : ''}`
          }
        >
          <Icon size={20} />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
