'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function AuthPage() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Check hash for #signup
    if (typeof window !== 'undefined' && window.location.hash === '#signup') {
      setActiveTab('signup');
    }
  }, []);

  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <div className="auth-body">
      <nav className="auth-nav-override">
        <Link href="/" className="logo">🐾 Petsy<em>petz</em></Link>
        <Link href="/" className="nav-back">← Back to Homepage</Link>
      </nav>

      <div className="auth-wrap">
        <div className="auth-left">
          <h2 className="left-tagline">
            The Home for<br />Every <em>Pet Lover</em><br />on the Planet
          </h2>
          <p className="left-sub">
            Join 120,000+ pet owners, rescues, and professionals connecting, competing, and caring together.
          </p>
          <div className="left-perks">
            <div className="left-perk"><div className="perk-dot"></div>Free to join — no credit card required</div>
            <div className="left-perk"><div className="perk-dot"></div>List pets for adoption at zero cost</div>
            <div className="left-perk"><div className="perk-dot"></div>Enter weekly contests and win prizes</div>
            <div className="left-perk"><div className="perk-dot"></div>Connect directly with pet professionals</div>
            <div className="left-perk"><div className="perk-dot"></div>Shop & sell in the pet marketplace</div>
          </div>
        </div>

        <div className="auth-right">
          <div className="auth-card">
            <div className="auth-tabs">
              <button 
                className={`auth-tab ${activeTab === 'signin' ? 'active' : ''}`}
                onClick={() => setActiveTab('signin')}
              >
                Sign In
              </button>
              <button 
                className={`auth-tab ${activeTab === 'signup' ? 'active' : ''}`}
                onClick={() => setActiveTab('signup')}
              >
                Sign Up
              </button>
            </div>

            {activeTab === 'signin' ? (
              <div className="auth-panel active">
                <div className="form-heading">Sign in</div>
                <div className="form-subheading">Enter your email and password to log in</div>

                <div className="form-group">
                  <label>Email</label>
                  <div className="input-wrap">
                    <input type="email" placeholder="Enter your email" />
                  </div>
                </div>

                <div className="form-group">
                  <label>Password</label>
                  <div className="input-wrap">
                    <input type={showPassword ? 'text' : 'password'} placeholder="Enter your password" />
                    <button className="eye-btn" onClick={togglePassword} type="button">
                      {showPassword ? '👁' : '🙈'}
                    </button>
                  </div>
                  <div className="forgot-row"><a href="#">Forgot Password ?</a></div>
                </div>

                <button className="form-btn">Login</button>

                <div className="form-switch">
                  Don't have an account? <a onClick={() => setActiveTab('signup')}>Sign up</a>
                </div>
                <div className="form-policy">
                  By continuing, you agree to our <a href="#">Privacy Policy</a>.
                </div>
              </div>
            ) : (
              <div className="auth-panel active">
                <div className="form-heading">Sign up</div>
                <div className="form-subheading">Create your free Petsypetz account</div>

                <div className="form-group">
                  <label>Full Name</label>
                  <div className="input-wrap">
                    <input type="text" placeholder="Amanda Prince" />
                  </div>
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <div className="input-wrap">
                    <input type="email" placeholder="you@example.com" />
                  </div>
                </div>

                <div className="form-group">
                  <label>Phone</label>
                  <div className="phone-row">
                    <div className="input-wrap"><input type="text" placeholder="🇺🇸 +1" style={{ textAlign: 'center' }} /></div>
                    <div className="input-wrap"><input type="tel" placeholder="(555) 000-0000" /></div>
                  </div>
                </div>

                <div className="form-group">
                  <label>Password</label>
                  <div className="input-wrap">
                    <input type={showPassword ? 'text' : 'password'} placeholder="Create a password" />
                    <button className="eye-btn" onClick={togglePassword} type="button">
                      {showPassword ? '👁' : '🙈'}
                    </button>
                  </div>
                </div>

                <button className="form-btn">Create Free Account 🐾</button>

                <div className="form-switch">
                  Already have an account? <a onClick={() => setActiveTab('signin')}>Sign in</a>
                </div>
                <div className="form-policy">
                  By continuing, you agree to our <a href="#">Privacy Policy</a>.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="auth-footer">
        © 2025 Petsypetz &nbsp;·&nbsp; <a href="#" style={{ color: 'var(--amber)' }}>Privacy Policy</a> &nbsp;·&nbsp; <a href="#" style={{ color: 'var(--amber)' }}>Terms of Service</a>
      </div>

      <style jsx>{`
        .auth-body {
          --cream: #fdf8f2;
          --warm-white: #fffcf8;
          --amber: #e8892b;
          --amber-light: #f5a94e;
          --amber-dark: #c4701a;
          --brown: #3d3dea;
          --text: #2a1f18;
          --text-light: #7a6558;
          --border: #e8ddd5;
          
          font-family: var(--font-dm-sans), sans-serif;
          background: var(--cream);
          color: var(--text);
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .auth-nav-override {
          background: var(--warm-white) !important;
          border-bottom: 1px solid var(--border) !important;
          padding: 0 52px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: space-between !important;
          height: 68px !important;
          box-shadow: 0 2px 16px rgba(61,61,234,0.06) !important;
          flex-shrink: 0 !important;
          position: relative !important;
          top: 0 !important;
        }

        .logo {
          font-family: var(--font-playfair), serif;
          font-size: 24px;
          font-weight: 900;
          color: var(--brown) !important;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .logo em { color: var(--amber) !important; font-style: normal; }
        
        .nav-back {
          color: var(--text-light);
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: color 0.2s;
          font-family: var(--font-dm-sans), sans-serif;
        }
        .nav-back:hover { color: var(--amber) !important; }

        .auth-wrap {
          flex: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
        }

        .auth-left {
          background: linear-gradient(135deg, var(--brown) 0%, #2a2ac8 100%);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          padding: 80px 72px;
          position: relative;
          overflow: hidden;
        }
        .auth-left::before {
          content:'';
          position:absolute;
          width:400px;
          height:400px;
          background: radial-gradient(circle,rgba(232,137,43,0.15) 0%,transparent 70%);
          top:-120px;
          right:-80px;
          border-radius:50%;
        }
        .auth-left::after {
          content:'🐾';
          position:absolute;
          font-size:280px;
          bottom:-50px;
          left:-30px;
          opacity:0.05;
          pointer-events:none;
          line-height:1;
        }

        .left-logo {
          font-family: 'Playfair Display', serif;
          font-size: 32px;
          font-weight: 900;
          color: #fff;
          margin-bottom: 40px;
          display: flex;
          align-items: center;
          gap: 10px;
          position: relative;
          z-index: 1;
          text-decoration: none;
        }
        .left-logo em { color: var(--amber-light); font-style: normal; }
        .left-logo .icon {
          width: 48px;
          height: 48px;
          background: rgba(255,255,255,0.1);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
        }

        .left-tagline {
          font-family: 'Playfair Display', serif;
          font-size: clamp(28px, 3vw, 42px);
          font-weight: 900;
          color: #fff;
          line-height: 1.2;
          margin-bottom: 20px;
          position: relative;
          z-index: 1;
        }
        .left-tagline em { color: var(--amber-light); font-style: normal; }

        .left-sub {
          color: rgba(255,255,255,0.6);
          font-size: 15px;
          line-height: 1.75;
          max-width: 360px;
          position: relative;
          z-index: 1;
          margin-bottom: 40px;
        }

        .left-perks {
          display: flex;
          flex-direction: column;
          gap: 14px;
          position: relative;
          z-index: 1;
        }
        .left-perk {
          display: flex;
          align-items: center;
          gap: 12px;
          color: rgba(255,255,255,0.8);
          font-size: 14px;
          font-weight: 500;
        }
        .perk-dot {
          width: 8px;
          height: 8px;
          background: var(--amber);
          border-radius: 50%;
          flex-shrink: 0;
        }

        .auth-right {
          background: var(--cream);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 48px;
        }

        .auth-card {
          background: var(--warm-white);
          border-radius: 24px;
          padding: 48px 44px;
          width: 100%;
          max-width: 440px;
          box-shadow: 0 10px 50px rgba(61,61,234,0.12);
        }

        .auth-tabs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          background: var(--cream);
          border-radius: 14px;
          padding: 4px;
          margin-bottom: 32px;
          border: 1px solid var(--border);
        }
        .auth-tab {
          padding: 10px;
          text-align: center;
          font-size: 14px;
          font-weight: 600;
          color: var(--text-light);
          cursor: pointer;
          border-radius: 11px;
          transition: all 0.2s;
          border: none;
          background: transparent;
          font-family: 'DM Sans', sans-serif;
        }
        .auth-tab.active {
          background: var(--warm-white);
          color: var(--brown);
          box-shadow: 0 2px 10px rgba(61,61,234,0.1);
        }

        .auth-panel { display: none; }
        .auth-panel.active { display: block; }

        .form-heading {
          font-family: 'Playfair Display', serif;
          font-size: 28px;
          font-weight: 900;
          color: var(--brown);
          margin-bottom: 6px;
        }
        .form-subheading {
          font-size: 14px;
          color: var(--text-light);
          margin-bottom: 28px;
          font-weight: 500;
        }

        .form-group { margin-bottom: 18px; }
        .form-group label {
          display: block;
          font-size: 12px;
          font-weight: 600;
          color: var(--text);
          margin-bottom: 7px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .input-wrap { position: relative; }
        .input-wrap input {
          width: 100%;
          padding: 13px 16px;
          border: 1.5px solid var(--border);
          border-radius: 12px;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          color: var(--text);
          background: var(--cream);
          outline: none;
          transition: border-color 0.2s, background 0.2s;
        }
        .input-wrap input:focus { border-color: var(--amber); background: #fff; }
        .input-wrap input::placeholder { color: #c0b0a0; }

        .eye-btn {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: var(--text-light);
          font-size: 18px;
          padding: 0;
          line-height:1;
        }

        .forgot-row {
          display: flex;
          justify-content: flex-end;
          margin-top: 8px;
        }
        .forgot-row a {
          color: var(--amber);
          font-size: 13px;
          font-weight: 700;
          text-decoration: none;
        }
        .forgot-row a:hover { text-decoration: underline; }

        .phone-row {
          display: grid;
          grid-template-columns: 90px 1fr;
          gap: 8px;
        }

        .form-btn {
          width: 100%;
          background: var(--amber);
          color: #fff;
          border: none;
          padding: 14px;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          margin-top: 4px;
          transition: all 0.2s;
          box-shadow: 0 4px 16px rgba(232,137,43,0.38);
          letter-spacing: 0.01em;
        }
        .form-btn:hover { background: var(--amber-dark); transform: translateY(-1px); }

        .form-switch {
          text-align: center;
          margin-top: 22px;
          font-size: 14px;
          color: var(--text-light);
        }
        .form-switch a {
          color: var(--amber);
          font-weight: 700;
          cursor: pointer;
          text-decoration: none;
        }
        .form-switch a:hover { text-decoration: underline; }

        .form-policy {
          text-align: center;
          margin-top: 16px;
          font-size: 12px;
          color: var(--text-light);
          line-height: 1.6;
        }
        .form-policy a { color: var(--amber); text-decoration: underline; }

        .auth-footer {
          text-align: center;
          padding: 20px;
          font-size: 12px;
          color: var(--text-light);
          border-top: 1px solid var(--border);
          flex-shrink: 0;
          background: var(--warm-white);
        }

        @keyframes fadeIn {
          from{opacity:0;transform:translateY(12px)}
          to{opacity:1;transform:translateY(0)}
        }
        .auth-panel.active { animation: fadeIn 0.3s ease; }

        @media (max-width: 860px) {
          .auth-wrap { grid-template-columns: 1fr; }
          .auth-left { display: none; }
          .auth-nav { padding: 0 24px; }
          .auth-right { padding: 40px 24px; }
        }
      `}</style>
    </div>
  );
}
