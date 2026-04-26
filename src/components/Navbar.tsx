'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav>
        <Link href="/" className="logo"><span className="paw">🐾</span> Petsy<em>Petz</em></Link>
        <div className="nav-links">
          <Link href="/">Home</Link>
          <a href="#">Adopt</a>
          <a href="#">Contests</a>
          <a href="#">Marketplace</a>
          <a href="#">Pet Pros</a>
          <a href="#">Community</a>
        </div>
        <div className="nav-cta">
          <Link href="/auth" className="btn-outline">Log In</Link>
          <Link href="/auth#signup" className="btn-primary">Join Free</Link>
        </div>
        <button
          className={`hamburger ${isOpen ? 'open' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menu"
        >
          <span></span><span></span><span></span>
        </button>
      </nav>

      <div className={`mobile-menu ${isOpen ? 'open' : ''}`} id="mobile-menu">
        <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
        <a href="#" onClick={() => setIsOpen(false)}>Adopt</a>
        <a href="#" onClick={() => setIsOpen(false)}>Contests</a>
        <a href="#" onClick={() => setIsOpen(false)}>Marketplace</a>
        <a href="#" onClick={() => setIsOpen(false)}>Pet Pros</a>
        <a href="#" onClick={() => setIsOpen(false)}>Community</a>
        <div className="mobile-menu-btns">
          <Link href="/auth" className="btn-outline" style={{ flex: 1 }} onClick={() => setIsOpen(false)}>Log In</Link>
          <Link href="/auth#signup" className="btn-primary" style={{ flex: 1 }} onClick={() => setIsOpen(false)}>Join Free</Link>
        </div>
      </div>
    </>
  );
}
