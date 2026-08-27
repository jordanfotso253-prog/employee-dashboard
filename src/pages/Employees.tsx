import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { employeeService } from '../services/employeeService';
import type { Employee } from '../types';
import { Search, Plus, Eye, Edit, Trash2, MoreVertical } from 'lucide-react';
import { DeleteModal } from '../components/DeleteModal';

export default function Employees() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [department, setDepartment] = useState('');
  const [status, setStatus] = useState('');
  const [gender, setGender] = useState('');
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleteName, setDeleteName] = useState('');
  const [openActionsId, setOpenActionsId] = useState<number | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search') || '';
  const limit = 10;

  useEffect(() => {
    async function loadEmployees() {
      setLoading(true);
      setError('');
      try {
        const data = await employeeService.getEmployees(0, 0);
        setEmployees(data.users);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Impossible de charger les employés.');
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
  const pageItems = (() => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const items: Array<number | 'ellipsis'> = [1];

    if (page > 3) {
      items.push('ellipsis');
    }

    const start = page <= 3 ? 2 : Math.max(2, page);
    const end = page <= 3 ? 3 : Math.min(totalPages - 1, page + 1);

    for (let p = start; p <= end; p += 1) {
      if (!items.includes(p)) {
        items.push(p);
      }
    }

    if (page < totalPages - 2) {
      items.push('ellipsis');
    }

    if (!items.includes(totalPages)) {
      items.push(totalPages);
    }

    return items;
  })();

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await employeeService.deleteEmployee(deleteId);
      setEmployees((current) => current.filter((employee) => employee.id !== deleteId));
      setDeleteId(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Impossible de supprimer l'employé.");
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
          <h1 className="page-title">Employés</h1>
          <p className="page-subtitle">Gérez et organisez vos collaborateurs</p>
        </div>
        <Link to="/employees/new" className="btn btn-primary">
          <Plus size={18} />
          Ajouter un employé
        </Link>
      </div>

      <div className="filters-bar">
        <div className="search-input-wrap">
          <Search size={18} />
          <input
            type="text"
            className="form-input"
            placeholder="Rechercher un employé..."
            value={search}
            onChange={(e) => {
              const value = e.target.value;
              if (value) {
                setSearchParams({ search: value });
              } else {
                setSearchParams({});
              }
              setPage(1);
            }}
          />
        </div>
        <select className="form-input" value={department} onChange={(e) => { setDepartment(e.target.value); setPage(1); }}>
          <option value="">Tous les départements</option>
          {departments.map((name) => <option key={name} value={name}>{name}</option>)}
        </select>
        <select className="form-input" value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }}>
          <option value="">Tous les statuts</option>
          <option value="Actif">Actif</option>
          <option value="Inactif">Inactif</option>
        </select>
        <select className="form-input" value={gender} onChange={(e) => { setGender(e.target.value); setPage(1); }}>
          <option value="">All Gender</option>
          <option value="male">Homme</option>
          <option value="female">Femme</option>
        </select>
      </div>

      {error ? (
        <div className="state-message state-error" role="alert">
          <strong>Impossible de charger les employés.</strong>
          <span>{error}</span>
          <button className="btn btn-outline btn-sm" onClick={() => window.location.reload()}>Try again</button>
        </div>
      ) : loading ? (
        <div className="loading-center"><div className="spinner" /></div>
      ) : employees.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
          Aucun employé trouvé
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="table-container desktop-table">
            <table>
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Département</th>
                  <th>E-mail</th>
                  <th>Téléphone</th>
                  <th>Statut</th>
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
                    <td><span className="badge badge-success">Actif</span></td>
                    <td>
                      <div className="employee-actions-menu">
                        <button
                          className="btn btn-outline btn-sm"
                          title="Plus d'options"
                          aria-label={`Plus d'options pour ${emp.firstName} ${emp.lastName}`}
                          aria-expanded={openActionsId === emp.id}
                          onClick={() => setOpenActionsId(openActionsId === emp.id ? null : emp.id)}
                        >
                          <MoreVertical size={16} />
                        </button>
                        {openActionsId === emp.id && (
                          <div className="employee-actions-dropdown">
                            <Link to={`/employees/${emp.id}`} onClick={() => setOpenActionsId(null)}>
                              <Eye size={15} /> Voir
                            </Link>
                            <Link to={`/employees/${emp.id}/edit`} onClick={() => setOpenActionsId(null)}>
                              <Edit size={15} /> Modifier
                            </Link>
                            <button
                              className="danger-action"
                              onClick={() => {
                                setDeleteId(emp.id);
                                setDeleteName(`${emp.firstName} ${emp.lastName}`);
                                setOpenActionsId(null);
                              }}
                            >
                              <Trash2 size={15} /> Supprimer
                            </button>
                          </div>
                        )}
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
                <span className="badge badge-success">Actif</span>
                <div className="emp-card-actions employee-actions-menu">
                  <button
                    className="btn btn-outline btn-sm"
                    title="Plus d'options"
                    aria-label={`Plus d'options pour ${emp.firstName} ${emp.lastName}`}
                    aria-expanded={openActionsId === emp.id}
                    onClick={() => setOpenActionsId(openActionsId === emp.id ? null : emp.id)}
                  >
                    <MoreVertical size={16} />
                  </button>
                  {openActionsId === emp.id && (
                    <div className="employee-actions-dropdown">
                      <Link to={`/employees/${emp.id}`} onClick={() => setOpenActionsId(null)}>
                        <Eye size={15} /> Voir
                      </Link>
                      <Link to={`/employees/${emp.id}/edit`} onClick={() => setOpenActionsId(null)}>
                        <Edit size={15} /> Modifier
                      </Link>
                      <button
                        className="danger-action"
                        onClick={() => {
                          setDeleteId(emp.id);
                          setDeleteName(`${emp.firstName} ${emp.lastName}`);
                          setOpenActionsId(null);
                        }}
                      >
                        <Trash2 size={15} /> Supprimer
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="pagination">
            <p className="pagination-info">
              Affichage de {(page - 1) * limit + 1} to {Math.min(page * limit, total)} sur {total} results
            </p>
            <div className="pagination-btns">
              <button type="button" aria-label="Page précédente" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>‹</button>
              {pageItems.map((item, index) => {
                if (item === 'ellipsis') {
                  return (
                    <span key={`ellipsis-${index}`} className="pagination-ellipsis">
                      …
                    </span>
                  );
                }

                return (
                  <button
                    key={item}
                    className={page === item ? 'active' : ''}
                    aria-current={page === item ? 'page' : undefined}
                    onClick={() => setPage(item)}
                  >
                    {item}
                  </button>
                );
              })}
              <button type="button" aria-label="Page suivante" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>›</button>
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
