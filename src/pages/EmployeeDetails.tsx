import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { employeeService } from '../services/employeeService';
import type { Employee } from '../types';
import {
  ArrowLeft,
  Edit,
  Trash2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  Building2,
  Star,
  GraduationCap,
} from 'lucide-react';
import { DeleteModal } from '../components/DeleteModal';

type Tab = 'infos' | 'documents' | 'formations' | 'evaluations' | 'historique';

export default function EmployeeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDelete, setShowDelete] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('infos');

  useEffect(() => {
    async function load() {
      try {
        const data = await employeeService.getEmployee(Number(id));
        setEmployee(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Impossible de charger les détails de l'employé.",
        );
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  const handleDelete = async () => {
    try {
      await employeeService.deleteEmployee(Number(id));
      navigate('/employees');
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="loading-center">
        <div className="spinner" />
      </div>
    );
  }

  if (!employee) {
    return error ? (
      <div className="state-message state-error" role="alert">
        <strong>Employé indisponible</strong>
        <span>{error}</span>
      </div>
    ) : (
      <div className="card">Employé introuvable</div>
    );
  }

  const address = employee.address
    ? `${employee.address.address}, ${employee.address.city}, ${employee.address.state} ${employee.address.postalCode}`
    : '—';

  const fullName = `${employee.firstName} ${employee.lastName}`;
  const title = employee.company?.title || 'Collaborateur';
  const department = employee.company?.department || '—';

  return (
    <div>
      {/* Breadcrumb */}
      <div style={{ marginBottom: '1rem' }}>
        <Link
          to="/employees"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            color: 'var(--text-muted)',
            fontSize: '0.875rem',
          }}
        >
          <ArrowLeft size={16} /> Collaborateurs
        </Link>
        <span style={{ color: 'var(--text-muted)', margin: '0 0.4rem' }}>/</span>
        <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{fullName}</span>
      </div>

      {/* Profile header card — like mockup */}
      <div className="card profile-header-card">
        <div className="profile-header-main">
          <img src={employee.image} alt={fullName} className="avatar-xl" />
          <div className="profile-header-info">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <h2 className="profile-name">{fullName}</h2>
              <span className="badge badge-success">Actif</span>
            </div>
            <p className="profile-role">
              {title}
              {department !== '—' && (
                <span className="profile-dept"> · {department}</span>
              )}
            </p>
            <div className="profile-meta-badges">
              <span className="meta-badge">
                <Briefcase size={14} /> Contrat CDI
              </span>
              <span className="meta-badge">
                <Calendar size={14} /> Ancienneté —
              </span>
              <span className="meta-badge">
                <MapPin size={14} /> {employee.address?.city || '—'}
              </span>
            </div>
            <div className="profile-contact-row">
              <span>
                <Mail size={14} /> {employee.email}
              </span>
              <span>
                <Phone size={14} /> {employee.phone || '—'}
              </span>
            </div>
          </div>
        </div>
        <div className="profile-header-actions">
          <Link to={`/employees/${id}/edit`} className="btn btn-primary btn-sm">
            <Edit size={16} /> Modifier
          </Link>
          <button
            className="btn btn-outline btn-sm"
            style={{ color: 'var(--danger)' }}
            onClick={() => setShowDelete(true)}
          >
            <Trash2 size={16} /> Supprimer
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs-row" style={{ margin: '1.25rem 0 1rem' }}>
        {(
          [
            { key: 'infos', label: 'Informations' },
            { key: 'documents', label: 'Documents' },
            { key: 'formations', label: 'Formations' },
            { key: 'evaluations', label: 'Évaluations' },
            { key: 'historique', label: 'Historique' },
          ] as const
        ).map((tab) => (
          <button
            key={tab.key}
            className={`tab-btn ${activeTab === tab.key ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content grid: main + sidebar */}
      <div className="profile-content-grid">
        <div>
          {activeTab === 'infos' && (
            <div className="profile-infos-grid">
              <div className="card">
                <h3 className="card-section-title">
                  <UserRoundIcon /> Informations personnelles
                </h3>
                <div className="detail-row">
                  <span className="label">E-mail</span>
                  <span className="value">{employee.email}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Adresse</span>
                  <span className="value">{address}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Téléphone</span>
                  <span className="value">{employee.phone || '—'}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Date de naissance</span>
                  <span className="value">
                    {employee.birthDate}
                    {employee.age ? ` (${employee.age} ans)` : ''}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="label">Genre</span>
                  <span className="value" style={{ textTransform: 'capitalize' }}>
                    {employee.gender === 'male'
                      ? 'Homme'
                      : employee.gender === 'female'
                        ? 'Femme'
                        : employee.gender}
                  </span>
                </div>
              </div>

              <div className="card">
                <h3 className="card-section-title">
                  <Building2 size={18} /> Informations professionnelles
                </h3>
                <div className="detail-row">
                  <span className="label">Poste</span>
                  <span className="value">{title}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Département</span>
                  <span className="value">{department}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Entreprise</span>
                  <span className="value">{employee.company?.name || '—'}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Type de contrat</span>
                  <span className="value">
                    <span className="badge badge-info">CDI</span>
                  </span>
                </div>
                <div className="detail-row">
                  <span className="label">Lieu de travail</span>
                  <span className="value">
                    {employee.address?.city || '—'}
                    {employee.address?.country ? `, ${employee.address.country}` : ''}
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="card">
              <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>
                Aucun document pour le moment.
              </p>
            </div>
          )}

          {activeTab === 'formations' && (
            <div className="card">
              <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>
                Aucune formation en cours.
              </p>
            </div>
          )}

          {activeTab === 'evaluations' && (
            <div className="card">
              <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>
                Aucune évaluation disponible.
              </p>
            </div>
          )}

          {activeTab === 'historique' && (
            <div className="card">
              <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>
                Historique non disponible.
              </p>
            </div>
          )}
        </div>

        {/* Right sidebar cards — like mockup */}
        <div className="profile-sidebar">
          <div className="card">
            <div className="card-header" style={{ marginBottom: '0.75rem' }}>
              <h3 className="card-title" style={{ fontSize: '0.9rem' }}>
                <Calendar size={16} style={{ marginRight: 6, verticalAlign: 'middle' }} />
                Prochains congés
              </h3>
              <button className="btn-link">Voir tous</button>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Aucun congé prévu prochainement.
            </p>
          </div>

          <div className="card">
            <div className="card-header" style={{ marginBottom: '0.75rem' }}>
              <h3 className="card-title" style={{ fontSize: '0.9rem' }}>
                <GraduationCap size={16} style={{ marginRight: 6, verticalAlign: 'middle' }} />
                Formations en cours
              </h3>
              <button className="btn-link">Voir toutes</button>
            </div>
            <div style={{ marginBottom: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: 4 }}>
                <span>Formation interne</span>
                <span style={{ fontWeight: 600 }}>0%</span>
              </div>
              <div
                style={{
                  height: 8,
                  background: 'var(--border)',
                  borderRadius: 4,
                  overflow: 'hidden',
                }}
              >
                <div style={{ width: '0%', height: '100%', background: 'var(--primary)' }} />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header" style={{ marginBottom: '0.5rem' }}>
              <h3 className="card-title" style={{ fontSize: '0.9rem' }}>
                <Star size={16} style={{ marginRight: 6, verticalAlign: 'middle' }} />
                Dernière évaluation
              </h3>
              <button className="btn-link">Voir le détail</button>
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--primary)' }}>
              —/5
            </div>
            <div style={{ color: 'var(--warning)', marginTop: 4 }}>
              <Star size={16} fill="currentColor" />
              <Star size={16} />
              <Star size={16} />
              <Star size={16} />
              <Star size={16} />
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 6 }}>
              Aucune évaluation récente
            </p>
          </div>
        </div>
      </div>

      {showDelete && (
        <DeleteModal
          name={fullName}
          onCancel={() => setShowDelete(false)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}

function UserRoundIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ marginRight: 6, verticalAlign: 'middle' }}
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
