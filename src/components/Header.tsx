import { Search, Bell, Menu, Moon, Sun } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import type { FormEvent } from 'react';

interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { user } = useAuth();
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState<'profile' | 'notifications' | null>(null);
  const [search, setSearch] = useState('');

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = search.trim();
    navigate(query ? `/employees?search=${encodeURIComponent(query)}` : '/employees');
  };

  return (
    <header className="header">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1 }}>
        <button className="mobile-menu-btn" onClick={onMenuClick} aria-label="Open menu">
          <Menu size={20} />
        </button>
        <form className="header-search" onSubmit={handleSearch} role="search">
          <Search size={18} />
          <input
            type="search"
            placeholder="Rechercher un employé, un service..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            aria-label="Rechercher un employé ou un service"
          />
        </form>
      </div>

      <div className="header-right">
        <button className="icon-btn btn-outline" onClick={toggleTheme} aria-label="Toggle theme" title="Toggle theme">
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>
        <div className="header-menu-wrap">
        <button className="icon-btn btn-outline notification-button" onClick={() => setOpenMenu(openMenu === 'notifications' ? null : 'notifications')} aria-label="Notifications" title="Notifications">
          <Bell size={20} />
          <span className="notification-dot" />
        </button>
        {openMenu === 'notifications' && <div className="header-menu notification-menu"><strong>Notifications</strong><p>Aucune nouvelle notification</p></div>}
        </div>
        <div className="header-menu-wrap">
        <button className="header-user header-user-button" onClick={() => setOpenMenu(openMenu === 'profile' ? null : 'profile')} aria-label="Open profile menu">
          <img
            src={user?.image || 'https://i.pravatar.cc/100'}
            alt={user?.firstName}
          />
          <div className="header-user-info">
            <div className="header-user-name">{user?.firstName} {user?.lastName}</div>
            <div className="header-user-role">DRH</div>
          </div>
        </button>
        {openMenu === 'profile' && <div className="header-menu profile-menu"><strong>{user?.firstName} {user?.lastName}</strong><button onClick={() => { navigate('/settings'); setOpenMenu(null); }}>Paramètres du profil</button><button onClick={() => { logout(); setOpenMenu(null); }}>Déconnexion</button></div>}
        </div>
      </div>
    </header>
  );
}
