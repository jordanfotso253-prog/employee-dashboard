import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { employeeService } from '../services/employeeService';
import type { Employee } from '../types';
import { Users, UserCheck, Building2, Calendar } from 'lucide-react';
import { Area, AreaChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export default function Dashboard() {
  const { user } = useAuth();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const data = await employeeService.getEmployees(0, 0);
        setEmployees(data.users);
        setTotal(data.total);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load dashboard data.');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const maleCount = employees.filter((e) => e.gender === 'male').length;
  const femaleCount = employees.filter((e) => e.gender === 'female').length;
  const avgAge = employees.length
    ? (employees.reduce((sum, e) => sum + e.age, 0) / employees.length).toFixed(1)
    : '0';
  const activeCount = employees.filter((employee) => (employee.status || 'Active') === 'Active').length;
  const departmentData = Array.from(new Set(employees.map((employee) => employee.company?.department).filter(Boolean)))
    .map((name) => ({ name, employees: employees.filter((employee) => employee.company?.department === name).length }));

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  if (loading) {
    return (
      <div className="loading-center">
        <div className="spinner" />
      </div>
    );
  }

  if (error) {
    return <div className="state-message state-error" role="alert"><strong>Dashboard unavailable</strong><span>{error}</span></div>;
  }

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 className="page-title">
          {greeting}, {user?.firstName}! 👋
        </h1>
        <p className="page-subtitle">Here's what's happening in your company today.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-card-top">
            <div>
              <div className="stat-value">{total}</div>
              <div className="stat-label">Total Employees</div>
              <div className="stat-change">From DummyJSON</div>
            </div>
            <div className="stat-icon" style={{ background: '#e0e7ff' }}>
              <Users size={22} color="var(--primary)" />
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-top">
            <div>
              <div className="stat-value">{activeCount}</div>
              <div className="stat-label">Active Employees</div>
              <div className="stat-change">Current records</div>
            </div>
            <div className="stat-icon" style={{ background: '#d1fae5' }}>
              <UserCheck size={22} color="var(--success)" />
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-top">
            <div>
              <div className="stat-value">{departmentData.length}</div>
              <div className="stat-label">Departments</div>
              <div className="stat-change">Detected departments</div>
            </div>
            <div className="stat-icon" style={{ background: '#fef3c7' }}>
              <Building2 size={22} color="var(--warning)" />
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-top">
            <div>
              <div className="stat-value">{avgAge}</div>
              <div className="stat-label">Avg Age</div>
              <div className="stat-change">Years</div>
            </div>
            <div className="stat-icon" style={{ background: '#fce7f3' }}>
              <Calendar size={22} color="#db2777" />
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }} className="dash-charts">
        <div className="card">
          <h3 style={{ fontWeight: 600, marginBottom: '1rem', fontSize: '0.95rem' }}>Employees by department</h3>
          <div className="chart-placeholder">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={departmentData} margin={{ top: 10, right: 8, left: -20, bottom: 0 }}>
                <defs><linearGradient id="overviewFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#4f46e5" stopOpacity={0.3} /><stop offset="100%" stopColor="#4f46e5" stopOpacity={0} /></linearGradient></defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Tooltip />
                <Area type="monotone" dataKey="employees" stroke="#4f46e5" strokeWidth={2} fill="url(#overviewFill)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h3 style={{ fontWeight: 600, marginBottom: '1rem', fontSize: '0.95rem' }}>Employees by Gender</h3>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', height: 220 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--primary)' }}>{maleCount}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Male</div>
            </div>
            <div style={{ width: 120, height: 120 }}><ResponsiveContainer><PieChart><Pie data={[{ value: maleCount }, { value: femaleCount }]} dataKey="value" innerRadius={38} outerRadius={58} paddingAngle={3}>{["#4f46e5", "#db2777"].map((color) => <Cell key={color} fill={color} />)}</Pie></PieChart></ResponsiveContainer></div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: '#db2777' }}>{femaleCount}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Female</div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h3 style={{ fontWeight: 600, fontSize: '0.95rem' }}>Recent Employees</h3>
          <Link to="/employees" style={{ color: 'var(--primary)', fontSize: '0.85rem', fontWeight: 500 }}>
            View all
          </Link>
        </div>
        <div className="table-container" style={{ border: 'none', boxShadow: 'none' }}>
          <table>
            <thead>
              <tr>
                <th>Employee</th>
                <th>Department</th>
                <th>Email</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {employees.slice(0, 5).map((emp) => (
                <tr key={emp.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <img src={emp.image} alt="" className="avatar" />
                      <span style={{ fontWeight: 500 }}>{emp.firstName} {emp.lastName}</span>
                    </div>
                  </td>
                  <td>{emp.company?.department || '—'}</td>
                  <td>{emp.email}</td>
                  <td><span className="badge badge-success">Active</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .dash-charts { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
