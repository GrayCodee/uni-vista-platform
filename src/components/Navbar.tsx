
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import Logo from './Logo';
import { Menu, Moon, Sun, Globe } from 'lucide-react';
import { useState } from 'react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { language, changeLanguage, t } = useLanguage();
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
                  {t('welcomeBack').replace('{0}', user?.name || '')}
                </span>
                <Link to={user?.role === 'student' ? '/student/dashboard' : '/professor/dashboard'}>
                  <Button variant="ghost">{t('dashboard')}</Button>
                </Link>
                <Button variant="outline" onClick={logout}>{t('logout')}</Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost">{t('login')}</Button>
                </Link>
                <Link to="/register">
                  <Button>{t('register')}</Button>
                </Link>
              </>
            )}
            
            {/* Theme Toggle */}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Globe className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => changeLanguage('en')}>
                  {t('english')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage('ar')}>
                  {t('arabic')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Theme Toggle (Mobile) */}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme}
              className="text-foreground"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            
            {/* Language Selector (Mobile) */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-foreground">
                  <Globe className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => changeLanguage('en')}>
                  {t('english')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage('ar')}>
                  {t('arabic')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
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
                    {t('welcomeBack').replace('{0}', user?.name || '')}
                  </span>
                  <Link 
                    to={user?.role === 'student' ? '/student/dashboard' : '/professor/dashboard'}
                    className="px-2 py-1 text-sm text-university-700 hover:text-university-900"
                    onClick={toggleMobileMenu}
                  >
                    {t('dashboard')}
                  </Link>
                  <Button variant="outline" className="justify-start" onClick={() => {
                    toggleMobileMenu();
                    logout();
                  }}>
                    {t('logout')}
                  </Button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="px-2 py-1 text-sm text-university-700 hover:text-university-900"
                    onClick={toggleMobileMenu}
                  >
                    {t('login')}
                  </Link>
                  <Link 
                    to="/register" 
                    className="px-2 py-1 text-sm text-university-700 hover:text-university-900"
                    onClick={toggleMobileMenu}
                  >
                    {t('register')}
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
