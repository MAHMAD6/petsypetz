'use client';

export default function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="logo"><span className="paw">🐾</span> Petsy<em>Petz</em></div>
          <p>Connecting pet owners and pet lovers worldwide to share, participate in pet contests, and meet pet professionals.</p>
          <div className="footer-socials">
            <a className="social-btn" href="#">📘</a>
            <a className="social-btn" href="#">📸</a>
            <a className="social-btn" href="#">🐦</a>
            <a className="social-btn" href="#">▶️</a>
            <a className="social-btn" href="#">💼</a>
          </div>
        </div>
        <div className="footer-col">
          <h4>Platform</h4>
          <a href="#">Adopt a Pet</a>
          <a href="#">Contests</a>
          <a href="#">Marketplace</a>
          <a href="#">Community</a>
          <a href="#">Pet Pros</a>
        </div>
        <div className="footer-col">
          <h4>Company</h4>
          <a href="#">About Us</a>
          <a href="#">Blog</a>
          <a href="#">Careers</a>
          <a href="#">Press Kit</a>
          <a href="#">Contact</a>
        </div>
        <div className="footer-col">
          <h4>Support</h4>
          <a href="#">Help Center</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Cookie Policy</a>
          <a href="#">Report Abuse</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 PetsyPetz. All rights reserved. Made with ❤️ for pet lovers.</span>
        <div style={{ display: 'flex', gap: '24px' }}>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Cookies</a>
        </div>
      </div>
    </footer>
  );
}
