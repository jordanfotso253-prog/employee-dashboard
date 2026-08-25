import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { employeeService } from '../services/employeeService';
import type { Employee } from '../types';
import { ArrowLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const employeeSchema = z.object({
  firstName: z.string().trim().min(2, 'First name must contain at least 2 characters.'),
  lastName: z.string().trim().min(2, 'Last name must contain at least 2 characters.'),
  email: z.string().trim().email('Enter a valid email address.'),
  phone: z.string().trim().min(7, 'Enter a valid phone number.'),
  age: z.string().refine((value) => Number(value) >= 18 && Number(value) <= 100, 'Age must be between 18 and 100.'),
  gender: z.enum(['male', 'female']),
  birthDate: z.string(),
  department: z.string().min(1, 'Select a department.'),
  title: z.string().trim().min(2, 'Enter a position.'),
  address: z.string(),
});

type EmployeeFormValues = z.infer<typeof employeeSchema>;

export default function EmployeeForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      age: '',
      gender: 'male',
      birthDate: '',
      department: '',
      title: '',
      address: '',
    },
  });

  useEffect(() => {
    if (!isEdit) return;
    async function load() {
      try {
        const data = await employeeService.getEmployee(Number(id));
        reset({
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          email: data.email || '',
          phone: data.phone || '',
          age: String(data.age || ''),
          gender: data.gender === 'female' ? 'female' : 'male',
          birthDate: data.birthDate || '',
          department: data.company?.department || '',
          title: data.company?.title || '',
          address: data.address
            ? `${data.address.address}, ${data.address.city}`
            : '',
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id, isEdit, reset]);

  const onSubmit = async (form: EmployeeFormValues) => {
    setSaving(true);
    setSubmitError('');
    try {
      const payload = {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        age: Number(form.age) || 25,
        gender: form.gender,
        birthDate: form.birthDate,
        company: {
          department: form.department,
          title: form.title,
          name: 'Company',
        },
      };
      if (isEdit) {
        await employeeService.updateEmployee(Number(id), payload as Partial<Employee>);
      } else {
        await employeeService.createEmployee(payload as Partial<Employee>);
      }
      navigate('/employees');
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Failed to save employee. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="loading-center"><div className="spinner" /></div>;
  }

  return (
    <div>
      <div style={{ marginBottom: '1.25rem' }}>
        <Link to={isEdit ? `/employees/${id}` : '/employees'} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          <ArrowLeft size={16} /> {isEdit ? 'Back to Details' : 'Back to Employees'}
        </Link>
      </div>

      <div className="page-header">
        <div>
          <h1 className="page-title">{isEdit ? 'Edit Employee' : 'Add New Employee'}</h1>
          <p className="page-subtitle">
            {isEdit ? 'Update employee information' : 'Create a new employee profile'}
          </p>
        </div>
      </div>

      <div className="card" style={{ maxWidth: 720 }}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">First Name *</label>
              <input
                name="firstName"
                className="form-input"
                {...register('firstName')}
                placeholder="Enter first name"
              />
              {errors.firstName && <span className="field-error">{errors.firstName.message}</span>}
            </div>
            <div className="form-group">
              <label className="form-label">Last Name *</label>
              <input
                name="lastName"
                className="form-input"
                {...register('lastName')}
                placeholder="Enter last name"
              />
              {errors.lastName && <span className="field-error">{errors.lastName.message}</span>}
            </div>
            <div className="form-group">
              <label className="form-label">Email *</label>
              <input
                name="email"
                type="email"
                className="form-input"
                {...register('email')}
                placeholder="Enter email"
              />
              {errors.email && <span className="field-error">{errors.email.message}</span>}
            </div>
            <div className="form-group">
              <label className="form-label">Phone</label>
              <input
                name="phone"
                className="form-input"
                {...register('phone')}
                placeholder="Enter phone number"
              />
              {errors.phone && <span className="field-error">{errors.phone.message}</span>}
            </div>
            <div className="form-group">
              <label className="form-label">Department *</label>
              <select
                name="department"
                className="form-input"
                {...register('department')}
              >
                <option value="">Select department</option>
                <option value="HR">HR</option>
                <option value="IT">IT</option>
                <option value="Marketing">Marketing</option>
                <option value="Finance">Finance</option>
                <option value="Sales">Sales</option>
              </select>
              {errors.department && <span className="field-error">{errors.department.message}</span>}
            </div>
            <div className="form-group">
              <label className="form-label">Position</label>
              <input
                name="title"
                className="form-input"
                {...register('title')}
                placeholder="Enter position"
              />
              {errors.title && <span className="field-error">{errors.title.message}</span>}
            </div>
            <div className="form-group">
              <label className="form-label">Gender *</label>
              <select
                name="gender"
                className="form-input"
                {...register('gender')}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Age *</label>
              <input type="number" min="18" max="100" className="form-input" {...register('age')} placeholder="Enter age" />
              {errors.age && <span className="field-error">{errors.age.message}</span>}
            </div>
            <div className="form-group">
              <label className="form-label">Date of Birth</label>
              <input
                name="birthDate"
                type="date"
                className="form-input"
                {...register('birthDate')}
              />
            </div>
            <div className="form-group full-width">
              <label className="form-label">Address</label>
              <input
                name="address"
                className="form-input"
                {...register('address')}
                placeholder="Enter address"
              />
            </div>
          </div>

          {submitError && <div className="form-error" role="alert">{submitError}</div>}
          <div className="form-actions">
            <button type="button" className="btn btn-outline" onClick={() => navigate(-1)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Saving...' : isEdit ? 'Update Employee' : 'Save Employee'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
