import { useState, type FormEvent } from 'react';
import {
  Briefcase,
  Users,
  Calendar,
  TrendingUp,
  Plus,
  MapPin,
  Filter,
  CheckCircle2,
  Clock,
  XCircle,
} from 'lucide-react';

type Tab = 'jobs' | 'candidates' | 'interviews';

const initialOpenJobs = [
  {
    id: 1,
    title: 'Responsable Marketing Digital',
    department: 'Marketing',
    location: 'Paris, France',
    candidates: 12,
    status: 'Ouvert',
  },
  {
    id: 2,
    title: 'Développeur Full Stack',
    department: 'IT & Développement',
    location: 'Lyon, France (Hybride)',
    candidates: 18,
    status: 'Ouvert',
  },
  {
    id: 3,
    title: 'Responsable RH',
    department: 'Ressources Humaines',
    location: 'Lille, France',
    candidates: 8,
    status: 'Ouvert',
  },
  {
    id: 4,
    title: 'Commercial Grands Comptes',
    department: 'Commercial',
    location: 'Bordeaux, France',
    candidates: 15,
    status: 'Ouvert',
  },
  {
    id: 5,
    title: 'Comptable Général',
    department: 'Finance',
    location: 'Nantes, France',
    candidates: 6,
    status: 'Fermé',
  },
];

const candidates = [
  {
    id: 1,
    name: 'Camille Dubois',
    email: 'camille.dubois@email.fr',
    job: 'Responsable Marketing Digital',
    date: '12 mai 2026',
    stage: 'Candidature reçue',
    stageColor: 'var(--info)',
  },
  {
    id: 2,
    name: 'Thomas Bernard',
    email: 'thomas.bernard@email.fr',
    job: 'Développeur Full Stack',
    date: '11 mai 2026',
    stage: 'Entretien RH',
    stageColor: 'var(--warning)',
  },
  {
    id: 3,
    name: 'Julie Moreau',
    email: 'julie.moreau@email.fr',
    job: 'Responsable RH',
    date: '10 mai 2026',
    stage: 'Entretien technique',
    stageColor: 'var(--success)',
  },
  {
    id: 4,
    name: 'Antoine Leroy',
    email: 'antoine.leroy@email.fr',
    job: 'Commercial Grands Comptes',
    date: '9 mai 2026',
    stage: 'Candidature reçue',
    stageColor: 'var(--info)',
  },
  {
    id: 5,
    name: 'Lucie Fournier',
    email: 'lucie.fournier@email.fr',
    job: 'Comptable Général',
    date: '8 mai 2026',
    stage: 'Offre',
    stageColor: 'var(--primary)',
  },
];

export default function Recruitment() {
  const [activeTab, setActiveTab] = useState<Tab>('jobs');
  const [openJobs, setOpenJobs] = useState(initialOpenJobs);
  const [showOfferForm, setShowOfferForm] = useState(false);
  const [newOffer, setNewOffer] = useState({
    title: '',
    department: 'Marketing',
    location: '',
    candidates: '0',
  });

  const handleCreateOffer = (event: FormEvent) => {
    event.preventDefault();

    if (!newOffer.title.trim() || !newOffer.location.trim()) {
      return;
    }

    const offer = {
      id: Date.now(),
      title: newOffer.title.trim(),
      department: newOffer.department,
      location: newOffer.location.trim(),
      candidates: Number(newOffer.candidates) || 0,
      status: 'Ouvert',
    };

    setOpenJobs((current) => [offer, ...current]);
    setActiveTab('jobs');
    setShowOfferForm(false);
    setNewOffer({
      title: '',
      department: 'Marketing',
      location: '',
      candidates: '0',
    });
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Recrutement</h1>
          <p className="page-subtitle">
            Gérez les offres d&apos;emploi, candidatures et entretiens
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn btn-outline" type="button" onClick={() => setActiveTab('jobs')}>
            <Filter size={16} /> Voir le pipeline
          </button>
          <button className="btn btn-primary" type="button" onClick={() => setShowOfferForm(true)}>
            <Plus size={18} /> Nouvelle offre
          </button>
        </div>
      </div>

      <div className="tabs-row" style={{ marginBottom: '1.5rem' }}>
        {(
          [
            { key: 'jobs', label: "Offres d'emploi" },
            { key: 'candidates', label: 'Candidatures' },
            { key: 'interviews', label: 'Entretiens' },
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

      <div className="stats-grid" style={{ marginBottom: '1.5rem' }}>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>
            <Briefcase size={22} />
          </div>
          <div>
            <div className="stat-value">12</div>
            <div className="stat-label">Offres ouvertes</div>
            <div className="stat-change positive">+2 vs mois dernier</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'var(--success-bg)', color: 'var(--success)' }}>
            <Users size={22} />
          </div>
          <div>
            <div className="stat-value">87</div>
            <div className="stat-label">Candidatures ce mois</div>
            <div className="stat-change positive">+18 vs mois dernier</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#ede9fe', color: '#7c3aed' }}>
            <Calendar size={22} />
          </div>
          <div>
            <div className="stat-value">14</div>
            <div className="stat-label">Entretiens planifiés</div>
            <div className="stat-change positive">+3 vs mois dernier</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#fef3c7', color: 'var(--warning)' }}>
            <TrendingUp size={22} />
          </div>
          <div>
            <div className="stat-value">18%</div>
            <div className="stat-label">Taux de conversion</div>
            <div className="stat-change positive">+4% vs mois dernier</div>
          </div>
        </div>
      </div>

      {activeTab === 'jobs' && (
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Offres d&apos;emploi ouvertes</h3>
            <button className="btn-link">Voir toutes les offres →</button>
          </div>
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Poste</th>
                  <th>Département</th>
                  <th>Lieu</th>
                  <th>Candidats</th>
                  <th>Statut</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {openJobs.map((job) => (
                  <tr key={job.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div
                          className="stat-icon"
                          style={{
                            width: 36,
                            height: 36,
                            background: 'var(--primary-light)',
                            color: 'var(--primary)',
                            flexShrink: 0,
                          }}
                        >
                          <Briefcase size={16} />
                        </div>
                        <strong>{job.title}</strong>
                      </div>
                    </td>
                    <td>{job.department}</td>
                    <td>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <MapPin size={14} style={{ color: 'var(--text-muted)' }} />
                        {job.location}
                      </span>
                    </td>
                    <td>{job.candidates}</td>
                    <td>
                      <span
                        className={`badge ${
                          job.status === 'Ouvert' ? 'badge-success' : 'badge-muted'
                        }`}
                      >
                        {job.status}
                      </span>
                    </td>
                    <td>
                      <button className="btn-icon" title="Voir">
                        <CheckCircle2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'candidates' && (
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Candidatures récentes</h3>
            <button className="btn-link">Voir toutes les candidatures →</button>
          </div>
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Candidat</th>
                  <th>Poste postulé</th>
                  <th>Date</th>
                  <th>Étape</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {candidates.map((c) => (
                  <tr key={c.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <img
                          src={`https://i.pravatar.cc/40?u=${c.id}`}
                          alt={c.name}
                          style={{
                            width: 36,
                            height: 36,
                            borderRadius: '50%',
                            objectFit: 'cover',
                          }}
                        />
                        <div>
                          <strong>{c.name}</strong>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                            {c.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{c.job}</td>
                    <td>{c.date}</td>
                    <td>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          fontSize: '0.85rem',
                          fontWeight: 500,
                          color: c.stageColor,
                        }}
                      >
                        <span
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            background: c.stageColor,
                          }}
                        />
                        {c.stage}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.35rem' }}>
                        <button className="btn-icon" title="Valider">
                          <CheckCircle2 size={16} style={{ color: 'var(--success)' }} />
                        </button>
                        <button className="btn-icon" title="Refuser">
                          <XCircle size={16} style={{ color: 'var(--danger)' }} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'interviews' && (
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Entretiens à venir</h3>
          </div>
          <div className="empty-state" style={{ padding: '3rem', textAlign: 'center' }}>
            <Clock size={40} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
            <p style={{ color: 'var(--text-muted)' }}>
              14 entretiens planifiés cette semaine. Sélectionnez une date pour voir les détails.
            </p>
            <button
              className="btn btn-primary"
              style={{ marginTop: '1rem' }}
              onClick={() => setActiveTab('jobs')}
            >
              Ouvrir le calendrier
            </button>
          </div>
        </div>
      )}

      {showOfferForm && (
        <div className="modal-overlay" onClick={() => setShowOfferForm(false)}>
          <div className="modal" onClick={(event) => event.stopPropagation()}>
            <div className="modal-icon">
              <Plus size={24} />
            </div>
            <h3>Nouvelle offre</h3>
            <p>Ajoutez rapidement une nouvelle opportunité de recrutement.</p>
            <form onSubmit={handleCreateOffer} style={{ display: 'grid', gap: '0.9rem', textAlign: 'left' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.35rem', fontWeight: 600 }}>Titre</label>
                <input
                  className="form-input"
                  value={newOffer.title}
                  onChange={(event) => setNewOffer((current) => ({ ...current, title: event.target.value }))}
                  placeholder="Chargé de clientèle"
                  required
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.35rem', fontWeight: 600 }}>Département</label>
                <select
                  className="form-input"
                  value={newOffer.department}
                  onChange={(event) => setNewOffer((current) => ({ ...current, department: event.target.value }))}
                >
                  <option value="Marketing">Marketing</option>
                  <option value="IT & Développement">IT & Développement</option>
                  <option value="Ressources Humaines">Ressources Humaines</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Finance">Finance</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.35rem', fontWeight: 600 }}>Lieu</label>
                <input
                  className="form-input"
                  value={newOffer.location}
                  onChange={(event) => setNewOffer((current) => ({ ...current, location: event.target.value }))}
                  placeholder="Bordeaux, France"
                  required
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.35rem', fontWeight: 600 }}>Candidats</label>
                <input
                  className="form-input"
                  type="number"
                  min="0"
                  value={newOffer.candidates}
                  onChange={(event) => setNewOffer((current) => ({ ...current, candidates: event.target.value }))}
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-outline" onClick={() => setShowOfferForm(false)}>
                  Annuler
                </button>
                <button type="submit" className="btn btn-primary">
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
