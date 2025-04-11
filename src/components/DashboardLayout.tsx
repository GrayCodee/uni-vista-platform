
import { ReactNode } from 'react';
import DashboardSidebar from './DashboardSidebar';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  if (!user) {
    return null;
  }

  return (
    <div className="flex h-screen">
      <DashboardSidebar role={user.role as 'student' | 'professor'} />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="flex h-14 items-center border-b px-4 lg:px-6">
          <div className="flex-1">
            <h1 className="text-lg font-semibold">
              {user.role === 'student' ? 'Student Portal' : 'Professor Portal'}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden md:inline-block">
              {user.name}
            </span>
            <Button variant="ghost" size="icon" onClick={logout}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
