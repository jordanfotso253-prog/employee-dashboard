import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { employeeService } from '../services/employeeService';
import type { Employee } from '../types';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { DeleteModal } from '../components/DeleteModal';

export default function EmployeeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const data = await employeeService.getEmployee(Number(id));
        setEmployee(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load employee details.');
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
    return <div className="loading-center"><div className="spinner" /></div>;
  }

  if (!employee) {
    return error
      ? <div className="state-message state-error" role="alert"><strong>Employee unavailable</strong><span>{error}</span></div>
      : <div className="card">Employee not found</div>;
  }

  const address = employee.address
    ? `${employee.address.address}, ${employee.address.city}, ${employee.address.state} ${employee.address.postalCode}, ${employee.address.country}`
    : '—';

  return (
    <div>
      <div style={{ marginBottom: '1.25rem' }}>
        <Link to="/employees" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          <ArrowLeft size={16} /> Back to Employees
        </Link>
      </div>

      <div className="details-header">
        <img src={employee.image} alt="" className="avatar-lg" />
        <div className="details-info" style={{ flex: 1 }}>
          <h2>{employee.firstName} {employee.lastName}</h2>
          <p className="role">{employee.company?.title || 'Employee'} · {employee.company?.department || ''}</p>
          <div style={{ marginTop: '0.75rem' }}>
            <span className="badge badge-success">Active</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Link to={`/employees/${id}/edit`} className="btn btn-primary btn-sm">
            <Edit size={16} /> Edit Employee
          </Link>
          <button className="btn btn-outline btn-sm" style={{ color: 'var(--danger)' }} onClick={() => setShowDelete(true)}>
            <Trash2 size={16} /> Delete
          </button>
        </div>
      </div>

      <div className="details-grid">
        <div className="details-section">
          <h3>Personal Information</h3>
          <div className="detail-row">
            <span className="label">Email</span>
            <span className="value">{employee.email}</span>
          </div>
          <div className="detail-row">
            <span className="label">Phone</span>
            <span className="value">{employee.phone}</span>
          </div>
          <div className="detail-row">
            <span className="label">Date of Birth</span>
            <span className="value">{employee.birthDate}</span>
          </div>
          <div className="detail-row">
            <span className="label">Gender</span>
            <span className="value" style={{ textTransform: 'capitalize' }}>{employee.gender}</span>
          </div>
          <div className="detail-row">
            <span className="label">Age</span>
            <span className="value">{employee.age}</span>
          </div>
          <div className="detail-row">
            <span className="label">Address</span>
            <span className="value">{address}</span>
          </div>
        </div>

        <div className="details-section">
          <h3>Job Information</h3>
          <div className="detail-row">
            <span className="label">Department</span>
            <span className="value">{employee.company?.department || '—'}</span>
          </div>
          <div className="detail-row">
            <span className="label">Position</span>
            <span className="value">{employee.company?.title || '—'}</span>
          </div>
          <div className="detail-row">
            <span className="label">Company</span>
            <span className="value">{employee.company?.name || '—'}</span>
          </div>
        </div>
      </div>

      {showDelete && (
        <DeleteModal
          name={`${employee.firstName} ${employee.lastName}`}
          onCancel={() => setShowDelete(false)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}
