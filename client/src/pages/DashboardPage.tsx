import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ThemeToggle } from '../components/ThemeToggle';

const UserIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const LogoutIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16,17 21,12 16,7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const ShieldIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

export const DashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="dash-layout">
      <ThemeToggle />
      <div className="orb-green" style={{ position: 'absolute', top: '8%', right: '8%', width: 300, height: 300, background: 'radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div className="orb-blue" style={{ position: 'absolute', bottom: '15%', left: '5%', width: 200, height: 200, background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div className="dash-card">
        <div className="dash-header">
          <div className="dash-header-icon">
            <UserIcon size={28} />
          </div>
          <h1>Dashboard</h1>
          <p>Welcome, {user?.username}!</p>
        </div>

        <div className="profile-card">
          <h2>Your Profile</h2>
          <div className="profile-row">
            <span className="profile-row-label">Username</span>
            <span className="profile-row-value">{user?.username}</span>
          </div>
          <div className="profile-row">
            <span className="profile-row-label">Email</span>
            <span className="profile-row-value">{user?.email}</span>
          </div>
          <div className="profile-row">
            <span className="profile-row-label">Member since</span>
            <span className="profile-row-value">
              {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
            </span>
          </div>
          <div className="profile-row">
            <span className="profile-row-label">Status</span>
            <span className="badge badge-success">
              <ShieldIcon size={11} /> Active
            </span>
          </div>
        </div>

        <div className="dash-actions">
          <button onClick={handleLogout} className="dash-btn dash-btn-danger">
            <LogoutIcon /> Sign Out
          </button>
        </div>

        <div className="dash-footer">
          Login Site &middot; Built with React + Express
        </div>
      </div>
    </div>
  );
};
