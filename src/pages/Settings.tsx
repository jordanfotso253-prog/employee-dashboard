import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Bell, LockKeyhole, Moon, Save, Sun, UserRound, SlidersHorizontal } from 'lucide-react';

const tabs = [
  { name: 'Profile', icon: UserRound },
  { name: 'Security', icon: LockKeyhole },
  { name: 'Notifications', icon: Bell },
  { name: 'Appearance', icon: Moon },
  { name: 'Preferences', icon: SlidersHorizontal },
];

export default function Settings() {
  const { user, updateAvatar } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('Profile');

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      window.alert('Please select an image file.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      window.alert('The image must be smaller than 5 MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => updateAvatar(String(reader.result));
    reader.readAsDataURL(file);
  };

  const renderTabContent = () => {
    if (activeTab === 'Security') {
      return <>
        <h3 className="settings-panel-title">Security</h3>
        <p className="settings-panel-description">Protect your account with a strong password.</p>
        <div className="form-group"><label className="form-label">Current Password</label><input type="password" className="form-input" placeholder="Enter current password" /></div>
        <div className="form-group"><label className="form-label">New Password</label><input type="password" className="form-input" placeholder="Enter new password" /></div>
        <button className="btn btn-primary"><Save size={16} /> Update Password</button>
      </>;
    }
    if (activeTab === 'Notifications') {
      return <>
        <h3 className="settings-panel-title">Notifications</h3>
        <p className="settings-panel-description">Choose which updates you want to receive.</p>
        {['Employee updates', 'Weekly reports', 'Security alerts'].map((item) => <label className="setting-option" key={item}><span><strong>{item}</strong><small>Receive {item.toLowerCase()} by email</small></span><input type="checkbox" defaultChecked={item !== 'Weekly reports'} /></label>)}
      </>;
    }
    if (activeTab === 'Appearance') {
      return <>
        <h3 className="settings-panel-title">Appearance</h3>
        <p className="settings-panel-description">Choose how Employee Manager looks on your device.</p>
        <button className="appearance-choice" onClick={toggleTheme}><span>{theme === 'light' ? <Moon size={18} /> : <Sun size={18} />} Use {theme === 'light' ? 'dark' : 'light'} mode</span><span className="appearance-status">Current</span></button>
      </>;
    }
    if (activeTab === 'Preferences') {
      return <>
        <h3 className="settings-panel-title">Preferences</h3>
        <p className="settings-panel-description">Customize the way information is displayed.</p>
        <div className="form-group"><label className="form-label">Language</label><select className="form-input"><option>English</option><option>French</option></select></div>
        <div className="form-group"><label className="form-label">Time zone</label><select className="form-input"><option>UTC - 05:00 Eastern Time</option><option>UTC + 01:00 Central European Time</option></select></div>
      </>;
    }
    return <>
      <h3 className="settings-panel-title">Profile Information</h3>
      <div className="profile-avatar-editor">
        <img src={user?.image} alt={`${user?.firstName} profile`} className="avatar-lg" />
        <div>
          <strong>Profile photo</strong>
          <small>Choose an image up to 5 MB.</small>
          <label className="btn btn-outline btn-sm profile-upload">
            Upload photo
            <input type="file" accept="image/*" onChange={handleAvatarChange} />
          </label>
        </div>
      </div>
      <div className="form-group"><label className="form-label">Full Name</label><input className="form-input" value={`${user?.firstName || ''} ${user?.lastName || ''}`} readOnly /></div>
      <div className="form-group"><label className="form-label">Email</label><input className="form-input" value={user?.email || ''} readOnly /></div>
      <div className="form-group"><label className="form-label">Username</label><input className="form-input" value={user?.username || ''} readOnly /></div>
      <button className="btn btn-primary"><Save size={16} /> Update Profile</button>
    </>;
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Settings</h1>
          <p className="page-subtitle">Manage your account and preferences</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '1.5rem' }} className="settings-layout">
        <div className="card" style={{ padding: '0.75rem' }}>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
            {tabs.map(({ name, icon: Icon }) => (
              <button
                key={name}
                className={`settings-tab ${activeTab === name ? 'active' : ''}`}
                onClick={() => setActiveTab(name)}
                aria-pressed={activeTab === name}
              >
                <Icon size={16} /> {name}
              </button>
            ))}
          </nav>
        </div>

        <div className="card settings-panel">
          {renderTabContent()}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .settings-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
