'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PasswordPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Redirect with password in query
    window.location.href = `/?password=${encodeURIComponent(password)}`;
  };

  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        padding: '60px 40px',
        maxWidth: '450px',
        width: '100%',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '60px', marginBottom: '20px' }}>🐋</div>
        
        <h1 style={{
          color: '#333',
          fontSize: '32px',
          marginBottom: '10px',
          fontWeight: 700,
        }}>
          Whale Hunter Pro
        </h1>
        
        <p style={{
          color: '#666',
          fontSize: '16px',
          marginBottom: '40px',
        }}>
          Enter password to access the platform
        </p>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '30px', textAlign: 'left' }}>
            <label style={{
              display: 'block',
              color: '#555',
              fontWeight: 600,
              marginBottom: '10px',
              fontSize: '14px',
            }}>
              Access Password
            </label>
            
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              placeholder="Enter password"
              required
              autoComplete="off"
              autoFocus
              style={{
                width: '100%',
                padding: '15px 20px',
                border: '2px solid #e0e0e0',
                borderRadius: '10px',
                fontSize: '16px',
                outline: 'none',
                transition: 'all 0.3s ease',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#667eea';
                e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e0e0e0';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
          
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '15px 20px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 10px 20px rgba(102, 126, 234, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Access Platform
          </button>
          
          {error && (
            <div style={{
              color: '#e74c3c',
              fontSize: '14px',
              marginTop: '15px',
            }}>
              ❌ Incorrect password. Please try again.
            </div>
          )}
        </form>
        
        <div style={{
          marginTop: '30px',
          color: '#999',
          fontSize: '13px',
        }}>
          🔒 Secure access · Contact Luke for password
        </div>
      </div>
    </div>
  );
}
