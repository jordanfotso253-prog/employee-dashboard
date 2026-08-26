import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import {
  Bell,
  LockKeyhole,
  Moon,
  Save,
  Sun,
  UserRound,
  SlidersHorizontal,
  Camera,
} from 'lucide-react';

const tabs = [
  { name: 'Profil', icon: UserRound },
  { name: 'Sécurité', icon: LockKeyhole },
  { name: 'Notifications', icon: Bell },
  { name: 'Apparence', icon: Moon },
  { name: 'Préférences', icon: SlidersHorizontal },
];

export default function Settings() {
  const { user, updateAvatar } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('Profil');

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      window.alert('Veuillez sélectionner une image.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      window.alert("L'image doit faire moins de 5 Mo.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => updateAvatar(String(reader.result));
    reader.readAsDataURL(file);
  };

  const renderTabContent = () => {
    if (activeTab === 'Sécurité') {
      return (
        <>
          <h3 className="settings-panel-title">Changer le mot de passe</h3>
          <p className="settings-panel-description">
            Mettez à jour votre mot de passe régulièrement pour renforcer la sécurité de votre compte.
          </p>
          <div className="form-group">
            <label className="form-label">Mot de passe actuel</label>
            <input type="password" className="form-input" placeholder="Entrez votre mot de passe actuel" />
          </div>
          <div className="form-group">
            <label className="form-label">Nouveau mot de passe</label>
            <input type="password" className="form-input" placeholder="Entrez votre nouveau mot de passe" />
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Le mot de passe doit contenir au moins 12 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.
          </p>
          <button className="btn btn-primary">
            <Save size={16} /> Mettre à jour le mot de passe
          </button>
        </>
      );
    }

    if (activeTab === 'Notifications') {
      return (
        <>
          <h3 className="settings-panel-title">Notifications</h3>
          <p className="settings-panel-description">
            Choisissez les notifications que vous souhaitez recevoir.
          </p>
          {[
            { title: 'Mises à jour employés', desc: 'Recevoir les mises à jour employés par e-mail' },
            { title: 'Rapports hebdomadaires', desc: 'Recevoir les rapports hebdomadaires par e-mail' },
            { title: 'Alertes de sécurité', desc: 'Recevoir les alertes de sécurité par e-mail' },
          ].map((item) => (
            <label className="setting-option" key={item.title}>
              <span>
                <strong>{item.title}</strong>
                <small>{item.desc}</small>
              </span>
              <input type="checkbox" defaultChecked={item.title !== 'Rapports hebdomadaires'} />
            </label>
          ))}
        </>
      );
    }

    if (activeTab === 'Apparence') {
      return (
        <>
          <h3 className="settings-panel-title">Apparence</h3>
          <p className="settings-panel-description">
            Personnalisez l&apos;apparence de votre interface.
          </p>
          <button className="appearance-choice" onClick={toggleTheme}>
            <span>
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
              {theme === 'light' ? 'Passer en mode sombre' : 'Passer en mode clair'}
            </span>
            <span className="appearance-status">Actuel</span>
          </button>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.75rem' }}>
            Utiliser une interface sombre pour réduire la fatigue visuelle.
          </p>
        </>
      );
    }

    if (activeTab === 'Préférences') {
      return (
        <>
          <h3 className="settings-panel-title">Préférences</h3>
          <p className="settings-panel-description">
            Langue et paramètres régionaux.
          </p>
          <div className="form-group">
            <label className="form-label">Langue</label>
            <select className="form-input" defaultValue="fr">
              <option value="fr">Français</option>
              <option value="en">English</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Fuseau horaire</label>
            <select className="form-input">
              <option>UTC +01:00 Heure d&apos;Europe centrale</option>
              <option>UTC +00:00 GMT</option>
              <option>UTC -05:00 Eastern Time</option>
            </select>
          </div>
          <button className="btn btn-primary">
            <Save size={16} /> Enregistrer les modifications
          </button>
        </>
      );
    }

    // Profil (default) — layout like mockup
    return (
      <>
        <h3 className="settings-panel-title">Informations du profil</h3>
        <p className="settings-panel-description">
          Mettez à jour vos informations personnelles.
        </p>

        <div className="profile-avatar-row">
          <img
            src={user?.image || 'https://i.pravatar.cc/120'}
            alt={`${user?.firstName || ''} profil`}
            className="avatar-lg"
          />
          <label className="btn btn-outline btn-sm profile-upload">
            <Camera size={16} /> Changer la photo
            <input type="file" accept="image/*" onChange={handleAvatarChange} hidden />
          </label>
        </div>

        <div className="form-grid-2">
          <div className="form-group">
            <label className="form-label">Prénom</label>
            <input className="form-input" defaultValue={user?.firstName || ''} />
          </div>
          <div className="form-group">
            <label className="form-label">Nom</label>
            <input className="form-input" defaultValue={user?.lastName || ''} />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">E-mail</label>
          <input className="form-input" defaultValue={user?.email || ''} />
        </div>

        <button className="btn btn-primary">
          <Save size={16} /> Mettre à jour le profil
        </button>
      </>
    );
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Paramètres</h1>
          <p className="page-subtitle">Gérez votre compte et vos préférences</p>
        </div>
      </div>

      <div className="settings-layout">
        <div className="card settings-nav-card">
          <nav className="settings-nav">
            {tabs.map(({ name, icon: Icon }) => (
              <button
                key={name}
                className={`settings-tab ${activeTab === name ? 'active' : ''}`}
                onClick={() => setActiveTab(name)}
                aria-pressed={activeTab === name}
              >
                <Icon size={18} />
                {name}
              </button>
            ))}
          </nav>
        </div>

        <div className="card settings-panel">{renderTabContent()}</div>
      </div>
    </div>
  );
}
