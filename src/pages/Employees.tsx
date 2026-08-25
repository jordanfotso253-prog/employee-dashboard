import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { employeeService } from '../services/employeeService';
import type { Employee } from '../types';
import { Search, Plus, Eye, Edit, Trash2 } from 'lucide-react';
import { DeleteModal } from '../components/DeleteModal';

export default function Employees() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('');
  const [status, setStatus] = useState('');
  const [gender, setGender] = useState('');
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleteName, setDeleteName] = useState('');
  const limit = 10;

  useEffect(() => {
    async function loadEmployees() {
      setLoading(true);
      setError('');
      try {
        const data = await employeeService.getEmployees(0, 0);
        setEmployees(data.users);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load employees.');
      } finally {
        setLoading(false);
      }
    }
    loadEmployees();
  }, []);

  const filteredEmployees = employees.filter((employee) => {
    const fullName = `${employee.firstName} ${employee.lastName}`.toLowerCase();
    const matchesSearch = `${fullName} ${employee.email} ${employee.phone}`
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesDepartment = !department || employee.company?.department === department;
    const matchesGender = !gender || employee.gender === gender;
    const employeeStatus = employee.status || 'Active';
    const matchesStatus = !status || employeeStatus === status;
    return matchesSearch && matchesDepartment && matchesGender && matchesStatus;
  });

  const total = filteredEmployees.length;
  const visibleEmployees = filteredEmployees.slice((page - 1) * limit, page * limit);

  const totalPages = Math.ceil(total / limit) || 1;

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await employeeService.deleteEmployee(deleteId);
      setEmployees((current) => current.filter((employee) => employee.id !== deleteId));
      setDeleteId(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to delete employee.');
    }
  };

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const departments = Array.from(
    new Set(employees.map((employee) => employee.company?.department).filter(Boolean)),
  ).sort();

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Employees</h1>
          <p className="page-subtitle">Manage and organize your employees</p>
        </div>
        <Link to="/employees/new" className="btn btn-primary">
          <Plus size={18} />
          Add Employee
        </Link>
      </div>

      <div className="filters-bar">
        <div className="search-input-wrap">
          <Search size={18} />
          <input
            type="text"
            className="form-input"
            placeholder="Search employees..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>
        <select className="form-input" value={department} onChange={(e) => { setDepartment(e.target.value); setPage(1); }}>
          <option value="">All Departments</option>
          {departments.map((name) => <option key={name} value={name}>{name}</option>)}
        </select>
        <select className="form-input" value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }}>
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <select className="form-input" value={gender} onChange={(e) => { setGender(e.target.value); setPage(1); }}>
          <option value="">All Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      {error ? (
        <div className="state-message state-error" role="alert">
          <strong>Unable to load employees</strong>
          <span>{error}</span>
          <button className="btn btn-outline btn-sm" onClick={() => window.location.reload()}>Try again</button>
        </div>
      ) : loading ? (
        <div className="loading-center"><div className="spinner" /></div>
      ) : employees.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
          No employees found
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="table-container desktop-table">
            <table>
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Department</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {visibleEmployees.map((emp) => (
                  <tr key={emp.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <img src={emp.image} alt="" className="avatar" />
                        <div>
                          <div style={{ fontWeight: 500 }}>{emp.firstName} {emp.lastName}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            {emp.company?.title || ''}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{emp.company?.department || '—'}</td>
                    <td>{emp.email}</td>
                    <td>{emp.phone}</td>
                    <td><span className="badge badge-success">Active</span></td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        <Link to={`/employees/${emp.id}`} className="btn btn-outline btn-sm" title="View">
                          <Eye size={15} />
                        </Link>
                        <Link to={`/employees/${emp.id}/edit`} className="btn btn-outline btn-sm" title="Edit">
                          <Edit size={15} />
                        </Link>
                        <button
                          className="btn btn-outline btn-sm"
                          style={{ color: 'var(--danger)' }}
                          title="Delete"
                          onClick={() => {
                            setDeleteId(emp.id);
                            setDeleteName(`${emp.firstName} ${emp.lastName}`);
                          }}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="mobile-cards">
            {visibleEmployees.map((emp) => (
              <div key={emp.id} className="emp-card">
                <img src={emp.image} alt="" className="avatar" />
                <div className="emp-card-info">
                  <div className="emp-card-name">{emp.firstName} {emp.lastName}</div>
                  <div className="emp-card-meta">
                    {emp.company?.department || '—'} · {emp.email}
                  </div>
                </div>
                <span className="badge badge-success">Active</span>
                <div style={{ display: 'flex', gap: '0.3rem' }}>
                  <Link to={`/employees/${emp.id}`} className="btn btn-outline btn-sm"><Eye size={14} /></Link>
                  <Link to={`/employees/${emp.id}/edit`} className="btn btn-outline btn-sm"><Edit size={14} /></Link>
                </div>
              </div>
            ))}
          </div>

          <div className="pagination">
            <p className="pagination-info">
              Showing {(page - 1) * limit + 1} to {Math.min(page * limit, total)} of {total} results
            </p>
            <div className="pagination-btns">
              <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>‹</button>
              {Array.from({ length: totalPages }, (_, i) => {
                const p = i + 1;
                return (
                  <button
                    key={p}
                    className={page === p ? 'active' : ''}
                    onClick={() => setPage(p)}
                  >
                    {p}
                  </button>
                );
              })}
              <button disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>›</button>
            </div>
          </div>
        </>
      )}

      {deleteId && (
        <DeleteModal
          name={deleteName}
          onCancel={() => setDeleteId(null)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}
