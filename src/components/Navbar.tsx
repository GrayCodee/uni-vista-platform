
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import Logo from './Logo';
import { Menu } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Logo />
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-muted-foreground">
                  Welcome, {user?.name}
                </span>
                <Link to={user?.role === 'student' ? '/student/dashboard' : '/professor/dashboard'}>
                  <Button variant="ghost">Dashboard</Button>
                </Link>
                <Button variant="outline" onClick={logout}>Logout</Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link to="/register">
                  <Button>Register</Button>
                </Link>
              </>
            )}
          </nav>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 pb-4 border-t">
            <div className="flex flex-col space-y-2">
              {isAuthenticated ? (
                <>
                  <span className="text-sm text-muted-foreground px-2 py-1">
                    Welcome, {user?.name}
                  </span>
                  <Link 
                    to={user?.role === 'student' ? '/student/dashboard' : '/professor/dashboard'}
                    className="px-2 py-1 text-sm text-university-700 hover:text-university-900"
                    onClick={toggleMobileMenu}
                  >
                    Dashboard
                  </Link>
                  <Button variant="outline" className="justify-start" onClick={() => {
                    toggleMobileMenu();
                    logout();
                  }}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="px-2 py-1 text-sm text-university-700 hover:text-university-900"
                    onClick={toggleMobileMenu}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="px-2 py-1 text-sm text-university-700 hover:text-university-900"
                    onClick={toggleMobileMenu}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
