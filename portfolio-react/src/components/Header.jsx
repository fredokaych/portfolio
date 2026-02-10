import { useState } from 'react';

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header>
            <nav aria-label="Main navigation">
                <div className="logo">
                    Fred<span className="gradient-text">Okech</span>.
                </div>

                <div
                    className="menu-toggle"
                    id="mobile-menu"
                    role="button"
                    tabIndex="0"
                    aria-expanded={menuOpen}
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>

                <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
                    {['about', 'projects', 'playground', 'contact'].map(link => (
                        <li key={link}>
                            <a
                                href={`#${link}`}
                                onClick={() => setMenuOpen(false)}
                            >
                                {link.charAt(0).toUpperCase() + link.slice(1)}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}
