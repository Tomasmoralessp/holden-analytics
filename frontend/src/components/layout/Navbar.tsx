
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '@/components/ui/Logo';
import CustomButton from '@/components/ui/CustomButton';
import { cn } from '@/lib/utils';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header
      className={cn(
        'fixed w-full top-0 z-50 transition-all duration-300 py-4 px-6 md:px-10',
        {
          'bg-white/80 backdrop-blur-md shadow-sm': scrolled,
          'bg-transparent': !scrolled
        }
      )}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <Logo animated size="md" />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="#features"
              className="text-holden-dark hover:text-holden-cyan transition-colors font-medium"
            >
              Características
            </Link>
            <Link
              to="#benefits"
              className="text-holden-dark hover:text-holden-cyan transition-colors font-medium"
            >
              Beneficios
            </Link>
            <Link
              to="#about"
              className="text-holden-dark hover:text-holden-cyan transition-colors font-medium"
            >
              Acerca de
            </Link>
            <CustomButton variant="primary" size="default">
              Solicitar Demo
            </CustomButton>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center text-holden-dark"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white rounded-xl shadow-lg mt-4 py-4 px-6 absolute left-4 right-4 transition-all duration-300 ease-in-out animate-fade-in">
            <nav className="flex flex-col space-y-4">
              <Link
                to="#features"
                className="text-holden-dark hover:text-holden-cyan transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Características
              </Link>
              <Link
                to="#benefits"
                className="text-holden-dark hover:text-holden-cyan transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Beneficios
              </Link>
              <Link
                to="#about"
                className="text-holden-dark hover:text-holden-cyan transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Acerca de
              </Link>
              <CustomButton variant="primary" size="default" className="w-full mt-2">
                Solicitar Demo
              </CustomButton>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
