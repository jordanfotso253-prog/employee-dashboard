import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Users } from 'lucide-react';

export default function Login() {
  const [username, setUsername] = useState('emilys');
  const [password, setPassword] = useState('emilyspass');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login({ username, password });
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Left illustration panel */}
      <div className="login-left">
        <div className="login-left-content">
          <img
            className="login-illustration"
            src="https://image.pollinations.ai/prompt/professional%20anime%20corporate%20team%20in%20a%20modern%20office%2C%20blue%20and%20teal%20brand%20colors%2C%20polished%204k%20digital%20illustration?width=1600&height=1200&nologo=true"
            alt="Professional anime illustration of a corporate team"
          />
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#312e81', marginBottom: 8 }}>
            Manage your team easily
          </h2>
          <p style={{ color: '#6366f1', fontSize: '0.95rem', maxWidth: 280, margin: '0 auto' }}>
            Track employees, departments and performance in one place.
          </p>
        </div>
      </div>

      {/* Right form panel */}
      <div className="login-right">
        <div className="login-card">
          <div className="login-logo">
            <div className="login-logo-icon">
              <Users size={22} />
            </div>
            Employee Manager
          </div>

          <h1 className="login-title">Welcome back 👋</h1>
          <p className="login-subtitle">Sign in to continue to your account</p>

          {error && (
            <div style={{
              background: '#fee2e2', color: '#991b1b', padding: '0.75rem 1rem',
              borderRadius: '0.5rem', marginBottom: '1.25rem', fontSize: '0.875rem'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="emilys"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <div style={{
              display: 'flex', justifyContent: 'space-between',
              alignItems: 'center', marginBottom: '1.5rem', fontSize: '0.875rem'
            }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input type="checkbox" defaultChecked />
                Remember me
              </label>
              <a href="#" style={{ color: 'var(--primary)', fontWeight: 500 }}>Forgot password?</a>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
              style={{ width: '100%', padding: '0.8rem' }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}
