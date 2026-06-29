import React from 'react';
import { UserRole } from '@/types';

interface NavbarProps {
  currentRole?: UserRole;
  onRoleChange?: (role: UserRole) => void;
  userName?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole = 'foreman',
  onRoleChange,
  userName = 'John Doe'
}) => {
  const roles: { value: UserRole; label: string }[] = [
    { value: 'foreman', label: 'Foreman' },
    { value: 'driver', label: 'Driver' },
    { value: 'site_store_admin', label: 'Site Admin' },
    { value: 'store_admin', label: 'Central Admin' },
    { value: 'technician', label: 'Technician' },
    { value: 'admin', label: 'System Admin' }
  ];

  return (
    <header style={styles.header}>
      <div style={styles.brand}>
        <span style={styles.logoIcon}>⚙️</span>
        <h1 style={styles.logoText}>SmartTool</h1>
      </div>
      
      <div style={styles.actions}>
        <div style={styles.roleSelector}>
          <label htmlFor="role-select" style={styles.roleLabel}>Active Role:</label>
          <select 
            id="role-select"
            value={currentRole}
            onChange={(e) => onRoleChange?.(e.target.value as UserRole)}
            style={styles.select}
          >
            {roles.map(r => (
              <option key={r.value} value={r.value}>{r.label}</option>
            ))}
          </select>
        </div>
        
        <div style={styles.userProfile}>
          <div style={styles.avatar}>{userName[0]}</div>
          <div style={styles.userInfo}>
            <div style={styles.userName}>{userName}</div>
            <div style={styles.userSub}>{currentRole.replace('_', ' ')}</div>
          </div>
        </div>
      </div>
    </header>
  );
};

const styles: Record<string, React.CSSProperties> = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    background: 'rgba(13, 17, 28, 0.8)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
    backdropFilter: 'blur(12px)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  logoIcon: {
    fontSize: '1.5rem',
  },
  logoText: {
    fontSize: '1.25rem',
    margin: 0,
    background: 'linear-gradient(135deg, #3b82f6, #a855f7)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
  },
  roleSelector: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  roleLabel: {
    fontSize: '0.8rem',
    color: 'rgba(255, 255, 255, 0.6)',
  },
  select: {
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    padding: '0.4rem 0.8rem',
    color: '#fff',
    fontSize: '0.85rem',
    cursor: 'pointer',
    outline: 'none',
  },
  userProfile: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  avatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #a855f7, #ec4899)',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '0.9rem',
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  userName: {
    fontSize: '0.85rem',
    fontWeight: 500,
    color: '#fff',
  },
  userSub: {
    fontSize: '0.7rem',
    color: 'rgba(255, 255, 255, 0.5)',
    textTransform: 'capitalize',
  }
};
