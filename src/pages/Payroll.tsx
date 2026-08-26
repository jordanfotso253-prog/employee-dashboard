import { Download, FileText, DollarSign } from 'lucide-react';

const payrollSummary = [
  { label: 'Masse salariale (mai)', value: '284 650 €', change: '+2,1%', positive: true },
  { label: 'Employés payés', value: '1 248', change: '100%', positive: true },
  { label: 'Salaire moyen', value: '3 420 €', change: '+1,4%', positive: true },
  { label: 'Coût des heures supp.', value: '12 480 €', change: '-0,8%', positive: false },
];

const recentPayslips = [
  { id: 1, name: 'Camille Rousseau', period: 'Mai 2026', net: '3 890 €', status: 'Payé' },
  { id: 2, name: 'Thomas Bernard', period: 'Mai 2026', net: '4 120 €', status: 'Payé' },
  { id: 3, name: 'Léa Dubois', period: 'Mai 2026', net: '3 450 €', status: 'Payé' },
  { id: 4, name: 'Hugo Moreau', period: 'Mai 2026', net: '3 780 €', status: 'En cours' },
  { id: 5, name: 'Nicolas Petit', period: 'Mai 2026', net: '3 210 €', status: 'Payé' },
];

export default function Payroll() {
  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Paie</h1>
          <p className="page-subtitle">Gérez les salaires, bulletins et rémunérations</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn btn-outline">
            <Download size={16} /> Exporter
          </button>
          <button className="btn btn-primary">
            <FileText size={18} /> Générer les bulletins
          </button>
        </div>
      </div>

      <div className="stats-grid" style={{ marginBottom: '1.5rem' }}>
        {payrollSummary.map((item) => (
          <div className="stat-card" key={item.label}>
            <div className="stat-icon" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>
              <DollarSign size={22} />
            </div>
            <div>
              <div className="stat-value">{item.value}</div>
              <div className="stat-label">{item.label}</div>
              <div className={`stat-change ${item.positive ? 'positive' : 'negative'}`}>
                {item.change} vs mois dernier
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Bulletins de paie récents</h3>
          <button className="btn-link">Voir tous →</button>
        </div>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Collaborateur</th>
                <th>Période</th>
                <th>Net à payer</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentPayslips.map((p) => (
                <tr key={p.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <img
                        src={`https://i.pravatar.cc/36?u=${p.id + 30}`}
                        alt={p.name}
                        style={{ width: 32, height: 32, borderRadius: '50%' }}
                      />
                      <strong>{p.name}</strong>
                    </div>
                  </td>
                  <td>{p.period}</td>
                  <td style={{ fontWeight: 600 }}>{p.net}</td>
                  <td>
                    <span
                      className={`badge ${
                        p.status === 'Payé' ? 'badge-success' : 'badge-warning'
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn-icon" title="Télécharger">
                      <Download size={16} />
                    </button>
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
