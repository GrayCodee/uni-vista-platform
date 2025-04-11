
import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import PageHeader from '@/components/PageHeader';
import CardStat from '@/components/CardStat';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Users, Clock, FileText, Check, BarChart } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const ProfessorDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    courses: 0,
    students: 0,
    pendingSubmissions: 0,
    upcomingExams: 0,
  });
  const [recentSubmissions, setRecentSubmissions] = useState<any[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // In a real application, these would be API calls
        // const statsResponse = await fetch('/api/professor/dashboard/stats');
        // const submissionsResponse = await fetch('/api/professor/dashboard/submissions');
        // const eventsResponse = await fetch('/api/professor/dashboard/events');
        
        // Mock data
        const mockStats = {
          courses: 3,
          students: 87,
          pendingSubmissions: 14,
          upcomingExams: 2,
        };
        
        const mockSubmissions = [
          { id: 1, student: 'Alex Johnson', assignmentTitle: 'Programming Assignment 1', course: 'CS101', date: '2025-04-10' },
          { id: 2, student: 'Sarah Williams', assignmentTitle: 'Programming Assignment 1', course: 'CS101', date: '2025-04-09' },
          { id: 3, student: 'David Smith', assignmentTitle: 'Calculus Problem Set 2', course: 'MATH201', date: '2025-04-08' },
          { id: 4, student: 'Emily Brown', assignmentTitle: 'Physics Lab Report 1', course: 'PHYS101', date: '2025-04-08' },
        ];
        
        const mockEvents = [
          { id: 1, title: 'CS101 Lecture', date: '2025-04-15', time: '10:00 AM', location: 'Room 305' },
          { id: 2, title: 'MATH201 Midterm Exam', date: '2025-04-20', time: '2:00 PM', location: 'Hall B' },
          { id: 3, title: 'Department Meeting', date: '2025-04-12', time: '3:00 PM', location: 'Conference Room' },
        ];
        
        setStats(mockStats);
        setRecentSubmissions(mockSubmissions);
        setUpcomingEvents(mockEvents);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to load dashboard data',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [toast]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <DashboardLayout>
      <PageHeader 
        title="Professor Dashboard" 
        description="Welcome back! Here's an overview of your teaching activities."
      />
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="h-24 animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-8 bg-muted rounded w-1/4 mt-2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <CardStat
            title="Active Courses"
            value={stats.courses}
            icon={BookOpen}
          />
          <CardStat
            title="Enrolled Students"
            value={stats.students}
            icon={Users}
          />
          <CardStat
            title="Pending Submissions"
            value={stats.pendingSubmissions}
            icon={FileText}
          />
          <CardStat
            title="Upcoming Exams"
            value={stats.upcomingExams}
            icon={Clock}
          />
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-university-600" />
              Upcoming Schedule
            </CardTitle>
            <CardDescription>Your teaching and administrative events</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex gap-4 animate-pulse">
                    <div className="h-12 w-12 bg-muted rounded"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                      <div className="h-3 bg-muted rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : upcomingEvents.length > 0 ? (
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-start gap-4 border-b pb-4 last:border-b-0 last:pb-0">
                    <div className="min-w-[3rem] text-center">
                      <div className="text-2xl font-bold text-university-600">
                        {new Date(event.date).getDate()}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(event.date).toLocaleString('default', { month: 'short' })}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium">{event.title}</h4>
                      <p className="text-sm text-muted-foreground">{event.time} • {event.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No upcoming events</p>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5 text-university-600" />
              Recent Submissions
            </CardTitle>
            <CardDescription>Latest assignment submissions from students</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="animate-pulse space-y-2">
                    <div className="h-4 bg-muted rounded w-full"></div>
                    <div className="h-3 bg-muted rounded w-3/4"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : recentSubmissions.length > 0 ? (
              <div className="space-y-4">
                {recentSubmissions.map((submission) => (
                  <div key={submission.id} className="flex items-start gap-3 border-b pb-4 last:border-b-0 last:pb-0">
                    <div className="bg-secondary rounded-full p-2 mt-1">
                      <Check className="h-4 w-4 text-university-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">{submission.student}</h4>
                      <p className="text-sm">{submission.assignmentTitle}</p>
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>{submission.course}</span>
                        <span>{formatDate(submission.date)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No recent submissions</p>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ProfessorDashboard;
