import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Salad, UserCircle } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Salad className="h-8 w-8 text-green-500" />
            <span className="text-xl font-bold text-gray-800">NutriPlan AI</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors hover:text-green-500 ${
                location.pathname === '/' ? 'text-green-500' : 'text-gray-700'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/form" 
              className={`text-sm font-medium transition-colors hover:text-green-500 ${
                location.pathname === '/form' ? 'text-green-500' : 'text-gray-700'
              }`}
            >
              Get Recommendations
            </Link>
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors">
              <div className="flex items-center space-x-2">
                <UserCircle size={16} />
                <span>Sign In</span>
              </div>
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 mt-2 bg-white rounded-lg shadow-lg absolute left-4 right-4 top-16 transition-all duration-200 transform origin-top">
            <nav className="flex flex-col space-y-4 p-4">
              <Link 
                to="/" 
                className={`text-sm font-medium transition-colors hover:text-green-500 ${
                  location.pathname === '/' ? 'text-green-500' : 'text-gray-700'
                }`}
              >
                Home
              </Link>
              <Link 
                to="/form" 
                className={`text-sm font-medium transition-colors hover:text-green-500 ${
                  location.pathname === '/form' ? 'text-green-500' : 'text-gray-700'
                }`}
              >
                Get Recommendations
              </Link>
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors">
                <div className="flex items-center justify-center space-x-2">
                  <UserCircle size={16} />
                  <span>Sign In</span>
                </div>
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;