import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, User, Search } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface NavbarProps {
  scrolled: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ scrolled }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const { cartItems } = useCart();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header 
      className={`fixed w-full z-40 transition-all duration-300 ${
        scrolled 
          ? 'bg-white shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <NavLink 
            to="/" 
            className={`text-2xl font-serif font-bold ${scrolled ? 'text-rose-700' : 'text-rose-700'}`}
          >
            ANTO
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `font-medium text-sm tracking-wider transition-colors hover:text-rose-700 ${
                  isActive ? 'text-rose-700' : scrolled ? 'text-gray-800' : 'text-gray-800'
                }`
              }
            >
              HOME
            </NavLink>
            <NavLink 
              to="/about" 
              className={({ isActive }) => 
                `font-medium text-sm tracking-wider transition-colors hover:text-rose-700 ${
                  isActive ? 'text-rose-700' : scrolled ? 'text-gray-800' : 'text-gray-800'
                }`
              }
            >
              ABOUT US
            </NavLink>
            <NavLink 
              to="/shop" 
              className={({ isActive }) => 
                `font-medium text-sm tracking-wider transition-colors hover:text-rose-700 ${
                  isActive ? 'text-rose-700' : scrolled ? 'text-gray-800' : 'text-gray-800'
                }`
              }
            >
              SHOP
            </NavLink>
            <NavLink 
              to="/contact" 
              className={({ isActive }) => 
                `font-medium text-sm tracking-wider transition-colors hover:text-rose-700 ${
                  isActive ? 'text-rose-700' : scrolled ? 'text-gray-800' : 'text-gray-800'
                }`
              }
            >
              CONTACT US
            </NavLink>
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setSearchOpen(!searchOpen)}
              className={`p-2 rounded-full transition-colors ${
                scrolled ? 'hover:bg-gray-100' : 'hover:bg-white/20'
              }`}
            >
              <Search size={20} className={scrolled ? 'text-gray-800' : 'text-gray-800'} />
            </button>
            <NavLink 
              to="/account" 
              className={`p-2 rounded-full transition-colors ${
                scrolled ? 'hover:bg-gray-100' : 'hover:bg-white/20'
              }`}
            >
              <User size={20} className={scrolled ? 'text-gray-800' : 'text-gray-800'} />
            </NavLink>
            <NavLink 
              to="/cart" 
              className={`p-2 rounded-full transition-colors relative ${
                scrolled ? 'hover:bg-gray-100' : 'hover:bg-white/20'
              }`}
            >
              <ShoppingBag size={20} className={scrolled ? 'text-gray-800' : 'text-gray-800'} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-700 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </NavLink>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full"
            >
              {mobileMenuOpen ? (
                <X size={24} className={scrolled ? 'text-gray-800' : 'text-gray-800'} />
              ) : (
                <Menu size={24} className={scrolled ? 'text-gray-800' : 'text-gray-800'} />
              )}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className={`w-full transition-all duration-300 overflow-hidden ${
          searchOpen ? 'h-16 opacity-100 mt-4' : 'h-0 opacity-0'
        }`}>
          <div className="relative">
            <input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-700"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-rose-700">
              <Search size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden fixed inset-0 bg-white z-50 transition-transform duration-300 ${
        mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex justify-end p-4">
          <button onClick={() => setMobileMenuOpen(false)}>
            <X size={24} className="text-gray-800" />
          </button>
        </div>
        <div className="flex flex-col items-center space-y-8 py-8">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `text-xl font-medium ${isActive ? 'text-rose-700' : 'text-gray-800'}`
            }
          >
            HOME
          </NavLink>
          <NavLink 
            to="/about" 
            className={({ isActive }) => 
              `text-xl font-medium ${isActive ? 'text-rose-700' : 'text-gray-800'}`
            }
          >
            ABOUT US
          </NavLink>
          <NavLink 
            to="/shop" 
            className={({ isActive }) => 
              `text-xl font-medium ${isActive ? 'text-rose-700' : 'text-gray-800'}`
            }
          >
            SHOP
          </NavLink>
          <NavLink 
            to="/contact" 
            className={({ isActive }) => 
              `text-xl font-medium ${isActive ? 'text-rose-700' : 'text-gray-800'}`
            }
          >
            CONTACT US
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Navbar;