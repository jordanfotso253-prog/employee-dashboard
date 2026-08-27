import { useState, type FormEvent } from 'react';
import {
  CalendarDays,
  CheckCircle2,
  XCircle,
  Clock,
  Users,
  TrendingDown,
  Plus,
} from 'lucide-react';

const pendingRequests = [
  {
    id: 1,
    name: 'Marie Dubois',
    type: 'Congés payés',
    dates: '26 mai – 30 mai 2026',
    days: 5,
    avatar: 1,
  },
  {
    id: 2,
    name: 'Thomas Bernard',
    type: 'RTT',
    dates: '10 juin – 11 juin 2026',
    days: 2,
    avatar: 2,
  },
  {
    id: 3,
    name: 'Claire Lefèvre',
    type: 'Congés payés',
    dates: '2 juin – 6 juin 2026',
    days: 5,
    avatar: 3,
  },
  {
    id: 4,
    name: 'Antoine Durand',
    type: 'Congés payés',
    dates: '16 juin – 20 juin 2026',
    days: 5,
    avatar: 4,
  },
];

const recentHistory = [
  {
    id: 1,
    name: 'Marie Dubois',
    type: 'Congés payés',
    dates: '26 mai – 30 mai 2026',
    duration: '5 jours',
    status: 'Validé',
    manager: 'Sophie Martin',
    decisionDate: '20 mai 2026',
  },
  {
    id: 2,
    name: 'Thomas Bernard',
    type: 'RTT',
    dates: '12 mai – 13 mai 2026',
    duration: '2 jours',
    status: 'Validé',
    manager: 'Sophie Martin',
    decisionDate: '19 mai 2026',
  },
  {
    id: 3,
    name: 'Lucas Petit',
    type: 'Maladie',
    dates: '5 mai – 6 mai 2026',
    duration: '2 jours',
    status: 'Justifié',
    manager: 'DRH',
    decisionDate: '19 mai 2026',
  },
  {
    id: 4,
    name: 'Claire Lefèvre',
    type: 'Congés payés',
    dates: '28 avr. – 2 mai 2026',
    duration: '5 jours',
    status: 'Validé',
    manager: 'Sophie Martin',
    decisionDate: '25 avr. 2026',
  },
  {
    id: 5,
    name: 'Emma Leroy',
    type: 'Congés sans solde',
    dates: '21 avr. – 22 avr. 2026',
    duration: '2 jours',
    status: 'Validé',
    manager: 'Julien Moreau',
    decisionDate: '18 avr. 2026',
  },
];

const typeColors: Record<string, string> = {
  'Congés payés': 'var(--primary)',
  RTT: 'var(--success)',
  Maladie: 'var(--warning)',
  'Congés sans solde': 'var(--text-muted)',
};

export default function Leaves() {
  const [requests, setRequests] = useState(pendingRequests);
  const [calendarOpen, setCalendarOpen] = useState(true);
  const [showLeaveForm, setShowLeaveForm] = useState(false);
  const [leaveForm, setLeaveForm] = useState({
    type: 'Congés payés',
    startDate: '2026-06-10',
    endDate: '2026-06-12',
    days: '3',
  });

  const handleApprove = (id: number) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
  };

  const handleCreateLeaveRequest = (event: FormEvent) => {
    event.preventDefault();

    const start = new Date(leaveForm.startDate);
    const end = new Date(leaveForm.endDate);
    const dayDiff = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1);

    const nextRequest = {
      id: Date.now(),
      name: 'Vous',
      type: leaveForm.type,
      dates: `${new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }).format(start)} – ${new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }).format(end)}`,
      days: Number(leaveForm.days) || dayDiff,
      avatar: 9,
    };

    setRequests((prev) => [nextRequest, ...prev]);
    setCalendarOpen(true);
    setShowLeaveForm(false);
    setLeaveForm({
      type: 'Congés payés',
      startDate: '2026-06-10',
      endDate: '2026-06-12',
      days: '3',
    });
  };

    const [calendarDate, setCalendarDate] = useState(new Date(2026, 4, 1));

    const monthLabel = new Intl.DateTimeFormat('fr-FR', {
      month: 'long',
      year: 'numeric',
    }).format(calendarDate);
    const firstDay = (new Date(calendarDate.getFullYear(), calendarDate.getMonth(), 1).getDay() + 6) % 7;
    const daysInMonth = new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 0).getDate();
    const today = new Date();
    const eventsByDate: Record<string, { label: string; color: string }[]> = {
      '2026-05-06': [{ label: 'RTT · T. Bernard', color: 'var(--success)' }],
      '2026-05-08': [{ label: 'CP · C. Lefèvre', color: 'var(--primary)' }],
      '2026-05-09': [{ label: 'CP · A. Durand', color: 'var(--primary)' }],
      '2026-05-13': [{ label: 'Maladie · S. Martin', color: 'var(--warning)' }],
      '2026-05-15': [{ label: 'RTT · N. Garnier', color: 'var(--success)' }],
      '2026-05-20': [{ label: 'CP · L. Bernard', color: 'var(--primary)' }],
      '2026-05-26': [{ label: 'RTT · H. Vincent', color: 'var(--success)' }],
      '2026-05-29': [{ label: 'CP · D. Laurent', color: 'var(--primary)' }],
    };
  const handleReject = (id: number) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Gestion des congés</h1>
          <p className="page-subtitle">
            Suivez, gérez et validez les congés et absences de vos équipes
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            className="btn btn-outline"
            type="button"
            aria-pressed={calendarOpen}
            onClick={() => setCalendarOpen((current) => !current)}
          >
            <CalendarDays size={16} /> Calendrier
          </button>
          <button className="btn btn-primary" type="button" onClick={() => setShowLeaveForm(true)}>
            <Plus size={18} /> Demander un congé
          </button>
        </div>
      </div>

      <div className="stats-grid" style={{ marginBottom: '1.5rem' }}>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>
            <Clock size={22} />
          </div>
          <div>
            <div className="stat-value">{requests.length}</div>
            <div className="stat-label">Congés en attente</div>
            <div className="stat-change">Demandes à traiter</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'var(--success-bg)', color: 'var(--success)' }}>
            <CheckCircle2 size={22} />
          </div>
          <div>
            <div className="stat-value">42</div>
            <div className="stat-label">Congés validés ce mois</div>
            <div className="stat-change positive">+12% vs mois dernier</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#ede9fe', color: '#7c3aed' }}>
            <Users size={22} />
          </div>
          <div>
            <div className="stat-value">6,5</div>
            <div className="stat-label">Solde moyen RTT</div>
            <div className="stat-change">Jours par collaborateur</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#fef3c7', color: 'var(--warning)' }}>
            <TrendingDown size={22} />
          </div>
          <div>
            <div className="stat-value">3,2%</div>
            <div className="stat-label">Taux d&apos;absentéisme</div>
            <div className="stat-change negative">-0,6% vs mois dernier</div>
          </div>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 360px',
          gap: '1.5rem',
          marginBottom: '1.5rem',
        }}
        className="leaves-grid"
      >
        {calendarOpen && (
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">{monthLabel}</h3>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  className="btn-icon"
                  type="button"
                  aria-label="Mois précédent"
                  onClick={() => setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1, 1))}
                >‹</button>
                <button
                  className="btn btn-outline"
                  type="button"
                  style={{ padding: '0.25rem 0.75rem', fontSize: '0.85rem' }}
                  onClick={() => setCalendarDate(new Date())}
                >
                  Aujourd&apos;hui
                </button>
                <button
                  className="btn-icon"
                  type="button"
                  aria-label="Mois suivant"
                  onClick={() => setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 1))}
                >›</button>
              </div>
            </div>
            <div className="calendar-grid">
              {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((d) => (
                <div key={d} className="calendar-day-header">
                  {d}
                </div>
              ))}
              {[...Array(firstDay)].map((_, i) => (
                <div key={`e${i}`} className="calendar-day empty" />
              ))}
              {[...Array(daysInMonth)].map((_, i) => {
                const day = i + 1;
                const dateKey = `${calendarDate.getFullYear()}-${String(calendarDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                const events = eventsByDate[dateKey] || [];
                const isToday = today.getFullYear() === calendarDate.getFullYear()
                  && today.getMonth() === calendarDate.getMonth()
                  && today.getDate() === day;

                return (
                  <div key={day} className={`calendar-day ${isToday ? 'today' : ''}`}>
                    <span className="calendar-day-num">{day}</span>
                    {events.map((e, idx) => (
                      <div
                        key={idx}
                        className="calendar-event"
                        style={{ background: e.color + '22', color: e.color, borderLeft: `3px solid ${e.color}` }}
                      >
                        {e.label}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
            <div className="calendar-legend">
              <span><span className="legend-dot" style={{ background: 'var(--primary)' }} /> Congés payés</span>
              <span><span className="legend-dot" style={{ background: 'var(--success)' }} /> RTT</span>
              <span><span className="legend-dot" style={{ background: 'var(--warning)' }} /> Maladie</span>
              <span><span className="legend-dot" style={{ background: 'var(--text-muted)' }} /> Sans solde</span>
            </div>
          </div>
        )}

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Demandes en attente ({requests.length})</h3>
            <button className="btn-link">Voir toutes</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {requests.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>
                Aucune demande en attente
              </p>
            ) : (
              requests.map((r) => (
                <div key={r.id} className="leave-request-card">
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <img
                      src={`https://i.pravatar.cc/40?u=${r.avatar + 10}`}
                      alt={r.name}
                      style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div style={{ flex: 1 }}>
                      <strong>{r.name}</strong>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        {r.type} · {r.days} jour{r.days > 1 ? 's' : ''}
                      </div>
                      <div style={{ fontSize: '0.8rem', marginTop: '0.25rem' }}>{r.dates}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
                    <button
                      className="btn btn-sm"
                      style={{
                        background: 'var(--success-bg)',
                        color: 'var(--success)',
                        flex: 1,
                      }}
                      onClick={() => handleApprove(r.id)}
                    >
                      <CheckCircle2 size={14} /> Approuver
                    </button>
                    <button
                      className="btn btn-sm"
                      style={{
                        background: 'var(--danger-bg)',
                        color: 'var(--danger)',
                        flex: 1,
                      }}
                      onClick={() => handleReject(r.id)}
                    >
                      <XCircle size={14} /> Refuser
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Historique récent des congés</h3>
          <button className="btn-link">Voir tout l&apos;historique →</button>
        </div>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Collaborateur</th>
                <th>Type de congé</th>
                <th>Dates</th>
                <th>Durée</th>
                <th>Statut</th>
                <th>Responsable</th>
                <th>Date de décision</th>
              </tr>
            </thead>
            <tbody>
              {recentHistory.map((h) => (
                <tr key={h.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <img
                        src={`https://i.pravatar.cc/36?u=${h.id + 20}`}
                        alt={h.name}
                        style={{ width: 32, height: 32, borderRadius: '50%' }}
                      />
                      <strong>{h.name}</strong>
                    </div>
                  </td>
                  <td>
                    <span
                      style={{
                        color: typeColors[h.type] || 'var(--text)',
                        fontWeight: 500,
                        fontSize: '0.875rem',
                      }}
                    >
                      {h.type}
                    </span>
                  </td>
                  <td>{h.dates}</td>
                  <td>{h.duration}</td>
                  <td>
                    <span
                      className={`badge ${
                        h.status === 'Validé' || h.status === 'Justifié'
                          ? 'badge-success'
                          : 'badge-muted'
                      }`}
                    >
                      {h.status}
                    </span>
                  </td>
                  <td>{h.manager}</td>
                  <td>{h.decisionDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showLeaveForm && (
        <div className="modal-overlay" onClick={() => setShowLeaveForm(false)}>
          <div className="modal" onClick={(event) => event.stopPropagation()}>
            <div className="modal-icon">
              <Plus size={24} />
            </div>
            <h3>Demander un congé</h3>
            <p>Soumettez une demande de congé pour votre équipe.</p>
            <form onSubmit={handleCreateLeaveRequest} style={{ display: 'grid', gap: '0.9rem', textAlign: 'left' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.35rem', fontWeight: 600 }}>Type</label>
                <select
                  className="form-input"
                  value={leaveForm.type}
                  onChange={(event) => setLeaveForm((current) => ({ ...current, type: event.target.value }))}
                >
                  <option value="Congés payés">Congés payés</option>
                  <option value="RTT">RTT</option>
                  <option value="Congés sans solde">Congés sans solde</option>
                  <option value="Maladie">Maladie</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.35rem', fontWeight: 600 }}>Date de début</label>
                <input
                  className="form-input"
                  type="date"
                  value={leaveForm.startDate}
                  onChange={(event) => setLeaveForm((current) => ({ ...current, startDate: event.target.value }))}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.35rem', fontWeight: 600 }}>Date de fin</label>
                <input
                  className="form-input"
                  type="date"
                  value={leaveForm.endDate}
                  onChange={(event) => setLeaveForm((current) => ({ ...current, endDate: event.target.value }))}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.35rem', fontWeight: 600 }}>Nombre de jours</label>
                <input
                  className="form-input"
                  type="number"
                  min="1"
                  value={leaveForm.days}
                  onChange={(event) => setLeaveForm((current) => ({ ...current, days: event.target.value }))}
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-outline" onClick={() => setShowLeaveForm(false)}>
                  Annuler
                </button>
                <button type="submit" className="btn btn-primary">
                  Envoyer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
