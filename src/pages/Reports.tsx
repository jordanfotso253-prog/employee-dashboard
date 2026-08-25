import { useEffect, useState } from 'react';
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { employeeService } from '../services/employeeService';
import type { Employee } from '../types';

export default function Reports() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    employeeService.getEmployees(0, 0).then((data) => setEmployees(data.users)).catch((err) => setError(err instanceof Error ? err.message : 'Unable to load reports.')).finally(() => setLoading(false));
  }, []);

  const departments = Array.from(new Set(employees.map((employee) => employee.company?.department).filter(Boolean)))
    .map((name) => ({ name, employees: employees.filter((employee) => employee.company?.department === name).length }));
  const ages = ['20-30', '31-40', '41-50', '51+'].map((name) => ({
    name,
    value: employees.filter((employee) => name === '51+' ? employee.age >= 51 : employee.age >= Number(name.slice(0, 2)) && employee.age <= Number(name.slice(3))).length,
  }));
  const activeCount = employees.filter((employee) => (employee.status || 'Active') === 'Active').length;

  if (loading) return <div className="loading-center"><div className="spinner" /></div>;
  if (error) return <div className="state-message state-error" role="alert"><strong>Reports unavailable</strong><span>{error}</span></div>;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Reports</h1>
          <p className="page-subtitle">View company reports and analytics</p>
        </div>
        <button className="btn btn-primary">Download Report</button>
      </div>

      <div className="stats-grid" style={{ marginBottom: '1.5rem' }}>
        <div className="stat-card">
          <div className="stat-value" style={{ color: 'var(--primary)' }}>{employees.length}</div>
          <div className="stat-label">New Hires</div>
          <div className="stat-change">Total records</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: 'var(--danger)' }}>0</div>
          <div className="stat-label">Terminations</div>
          <div className="stat-change">No status history</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{activeCount}</div>
          <div className="stat-label">Active Employees</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: 'var(--success)' }}>—</div>
          <div className="stat-label">Attendance unavailable</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }} className="reports-charts">
        <div className="card">
          <h3 style={{ fontWeight: 600, marginBottom: '1rem' }}>Employees by Department</h3>
          <div className="chart-placeholder"><ResponsiveContainer width="100%" height="100%"><BarChart data={departments}><XAxis dataKey="name" axisLine={false} tickLine={false} /><YAxis axisLine={false} tickLine={false} /><Tooltip /><Bar dataKey="employees" fill="#4f46e5" radius={[4, 4, 0, 0]} /></BarChart></ResponsiveContainer></div>
        </div>
        <div className="card">
          <h3 style={{ fontWeight: 600, marginBottom: '1rem' }}>Age Distribution</h3>
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
