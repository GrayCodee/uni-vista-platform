
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import Logo from './Logo';
import { 
  BarChart, 
  BookOpen, 
  CalendarClock, 
  ChevronLeft, 
  ChevronRight, 
  FileText, 
  GraduationCap, 
  Home, 
  LayoutDashboard, 
  PenLine, 
  School, 
  Upload, 
  Users
} from 'lucide-react';

type SidebarProps = {
  role: 'student' | 'professor';
};

const studentNavItems = [
  {
    title: 'Dashboard',
    href: '/student/dashboard',
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: 'Courses',
    href: '/student/courses',
    icon: <BookOpen className="h-5 w-5" />,
  },
  {
    title: 'Lectures',
    href: '/student/lectures',
    icon: <School className="h-5 w-5" />,
  },
  {
    title: 'Assignments',
    href: '/student/assignments',
    icon: <FileText className="h-5 w-5" />,
  },
  {
    title: 'Exams',
    href: '/student/exams',
    icon: <PenLine className="h-5 w-5" />,
  },
  {
    title: 'Grades',
    href: '/student/grades',
    icon: <BarChart className="h-5 w-5" />,
  },
];

const professorNavItems = [
  {
    title: 'Dashboard',
    href: '/professor/dashboard',
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: 'My Courses',
    href: '/professor/courses',
    icon: <BookOpen className="h-5 w-5" />,
  },
  {
    title: 'Upload Lectures',
    href: '/professor/lectures',
    icon: <Upload className="h-5 w-5" />,
  },
  {
    title: 'Assignments',
    href: '/professor/assignments',
    icon: <FileText className="h-5 w-5" />,
  },
  {
    title: 'Exams',
    href: '/professor/exams',
    icon: <PenLine className="h-5 w-5" />,
  },
  {
    title: 'View Submissions',
    href: '/professor/submissions',
    icon: <Users className="h-5 w-5" />,
  },
];

export function DashboardSidebar({ role }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  
  const navItems = role === 'student' ? studentNavItems : professorNavItems;

  return (
    <div className={cn(
      "flex flex-col border-r bg-card h-screen relative",
      collapsed ? "w-[72px]" : "w-64"
    )}>
      <div className="flex h-14 items-center border-b px-4">
        {collapsed ? (
          <GraduationCap className="text-university-600 h-6 w-6 mx-auto" />
        ) : (
          <Logo />
        )}
      </div>
      
      <ScrollArea className="flex-1 p-2">
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                location.pathname === item.href
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              {item.icon}
              {!collapsed && <span>{item.title}</span>}
            </Link>
          ))}
        </nav>
      </ScrollArea>
      
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-[-12px] top-16 h-6 w-6 rounded-full border shadow-sm flex items-center justify-center bg-background z-10"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
      </Button>
    </div>
  );
}

export default DashboardSidebar;
