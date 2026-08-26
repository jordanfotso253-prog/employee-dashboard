import { GraduationCap, BookOpen, Users, Award, Plus, Clock } from 'lucide-react';

const courses = [
  {
    id: 1,
    title: 'Marketing Digital Avancé',
    platform: 'LinkedIn Learning',
    progress: 65,
    employees: 12,
    status: 'En cours',
  },
  {
    id: 2,
    title: 'React & TypeScript Masterclass',
    platform: 'Udemy',
    progress: 40,
    employees: 8,
    status: 'En cours',
  },
  {
    id: 3,
    title: 'Leadership Essentiel',
    platform: 'Interne',
    progress: 100,
    employees: 24,
    status: 'Terminé',
  },
  {
    id: 4,
    title: 'RGPD & Protection des données',
    platform: 'Interne',
    progress: 90,
    employees: 156,
    status: 'En cours',
  },
  {
    id: 5,
    title: 'Gestion de projet (PMP)',
    platform: 'Coursera',
    progress: 25,
    employees: 5,
    status: 'En cours',
  },
];

export default function Training() {
  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Formation</h1>
          <p className="page-subtitle">
            Suivez les parcours de formation et le développement des collaborateurs
          </p>
        </div>
        <button className="btn btn-primary">
          <Plus size={18} /> Ajouter une formation
        </button>
      </div>

      <div className="stats-grid" style={{ marginBottom: '1.5rem' }}>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>
            <BookOpen size={22} />
          </div>
          <div>
            <div className="stat-value">18</div>
            <div className="stat-label">Formations actives</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'var(--success-bg)', color: 'var(--success)' }}>
            <Users size={22} />
          </div>
          <div>
            <div className="stat-value">205</div>
            <div className="stat-label">Collaborateurs inscrits</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#fef3c7', color: 'var(--warning)' }}>
            <Clock size={22} />
          </div>
          <div>
            <div className="stat-value">1 240 h</div>
            <div className="stat-label">Heures de formation cette année</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#ede9fe', color: '#7c3aed' }}>
            <Award size={22} />
          </div>
          <div>
            <div className="stat-value">87</div>
            <div className="stat-label">Certificats obtenus</div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Catalogue des formations</h3>
        </div>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Formation</th>
                <th>Plateforme</th>
                <th>Progression</th>
                <th>Inscrits</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((c) => (
                <tr key={c.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div
                        className="stat-icon"
                        style={{
                          width: 36,
                          height: 36,
                          background: 'var(--primary-light)',
                          color: 'var(--primary)',
                        }}
                      >
                        <GraduationCap size={16} />
                      </div>
                      <strong>{c.title}</strong>
                    </div>
                  </td>
                  <td>{c.platform}</td>
                  <td style={{ minWidth: 140 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div
                        style={{
                          flex: 1,
                          height: 8,
                          background: 'var(--border)',
                          borderRadius: 4,
                          overflow: 'hidden',
                        }}
                      >
                        <div
                          style={{
                            width: `${c.progress}%`,
                            height: '100%',
                            background: 'var(--primary)',
                            borderRadius: 4,
                          }}
                        />
                      </div>
                      <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>{c.progress}%</span>
                    </div>
                  </td>
                  <td>{c.employees}</td>
                  <td>
                    <span
                      className={`badge ${
                        c.status === 'Terminé' ? 'badge-success' : 'badge-info'
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
