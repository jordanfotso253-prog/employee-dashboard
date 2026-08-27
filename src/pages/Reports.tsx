import { useEffect, useState } from 'react';
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Download } from 'lucide-react';
import { employeeService } from '../services/employeeService';
import type { Employee } from '../types';

const downloadCsv = (employees: Employee[]) => {
  const headers = ['Nom', 'Département', 'Email', 'Téléphone', 'Statut'];
  const rows = employees.map((employee) => [
    `${employee.firstName} ${employee.lastName}`,
    employee.company?.department || '—',
    employee.email,
    employee.phone,
    employee.status || 'Active',
  ].map((value) => `"${String(value).replace(/"/g, '""')}"`).join(','));

  const csvContent = [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'rapport-employes.csv';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export default function Reports() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    employeeService.getEmployees(0, 0).then((data) => setEmployees(data.users)).catch((err) => setError(err instanceof Error ? err.message : 'Impossible de charger les rapports.')).finally(() => setLoading(false));
  }, []);

  const departments = Array.from(new Set(employees.map((employee) => employee.company?.department).filter(Boolean)))
    .map((name) => ({ name, employees: employees.filter((employee) => employee.company?.department === name).length }));
  const ages = ['20-30', '31-40', '41-50', '51+'].map((name) => ({
    name,
    value: employees.filter((employee) => name === '51+' ? employee.age >= 51 : employee.age >= Number(name.slice(0, 2)) && employee.age <= Number(name.slice(3))).length,
  }));
  const activeCount = employees.filter((employee) => (employee.status || 'Active') === 'Active').length;

  const handleDownloadReport = () => {
    if (employees.length === 0) {
      return;
    }

    downloadCsv(employees);
  };

  if (loading) return <div className="loading-center"><div className="spinner" /></div>;
  if (error) return <div className="state-message state-error" role="alert"><strong>Rapports indisponibles</strong><span>{error}</span></div>;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Rapports</h1>
          <p className="page-subtitle">Consultez les rapports et analyses de l'entreprise</p>
        </div>
        <button className="btn btn-primary" onClick={handleDownloadReport} disabled={employees.length === 0}>
          <Download size={16} />
          Télécharger le rapport
        </button>
      </div>

      <div className="stats-grid" style={{ marginBottom: '1.5rem' }}>
        <div className="stat-card">
          <div className="stat-value" style={{ color: 'var(--primary)' }}>{employees.length}</div>
          <div className="stat-label">Nouveaux recrutements</div>
          <div className="stat-change">Total des enregistrements</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: 'var(--danger)' }}>0</div>
          <div className="stat-label">Départs</div>
          <div className="stat-change">Pas d'historique de statut</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{activeCount}</div>
          <div className="stat-label">Employés actifs</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: 'var(--success)' }}>—</div>
          <div className="stat-label">Présence non disponible</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }} className="reports-charts">
        <div className="card">
          <h3 style={{ fontWeight: 600, marginBottom: '1rem' }}>Employés par département</h3>
          <div className="chart-placeholder"><ResponsiveContainer width="100%" height="100%"><BarChart data={departments}><XAxis dataKey="name" axisLine={false} tickLine={false} /><YAxis axisLine={false} tickLine={false} /><Tooltip /><Bar dataKey="employees" fill="#4f46e5" radius={[4, 4, 0, 0]} /></BarChart></ResponsiveContainer></div>
        </div>
        <div className="card">
          <h3 style={{ fontWeight: 600, marginBottom: '1rem' }}>Répartition par âge</h3>
          <div className="chart-placeholder"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={ages} dataKey="value" nameKey="name" innerRadius={55} outerRadius={82}>{['#4f46e5', '#3b82f6', '#10b981', '#f59e0b'].map((color) => <Cell key={color} fill={color} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer></div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .reports-charts { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
