
import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import PageHeader from '@/components/PageHeader';
import CardStat from '@/components/CardStat';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Calendar, FileText, GraduationCap, BarChart } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const StudentDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    courses: 0,
    assignments: 0,
    upcomingExams: 0,
    completedCourses: 0,
  });
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // In a real application, these would be API calls
        // const statsResponse = await fetch('/api/student/dashboard/stats');
        // const announcementsResponse = await fetch('/api/student/dashboard/announcements');
        // const eventsResponse = await fetch('/api/student/dashboard/events');
        
        // Mock data
        const mockStats = {
          courses: 5,
          assignments: 8,
          upcomingExams: 2,
          completedCourses: 12,
        };
        
        const mockAnnouncements = [
          { id: 1, title: 'Final Exam Schedule Posted', date: '2025-04-10', courseName: 'Introduction to Computer Science' },
          { id: 2, title: 'Holiday Break Reminder', date: '2025-04-05', courseName: 'University Announcements' },
          { id: 3, title: 'Research Opportunity Available', date: '2025-04-01', courseName: 'Advanced Mathematics' },
        ];
        
        const mockEvents = [
          { id: 1, title: 'CS101 Final Exam', date: '2025-04-20', time: '10:00 AM' },
          { id: 2, title: 'Math Assignment Due', date: '2025-04-15', time: '11:59 PM' },
          { id: 3, title: 'Study Group Meeting', date: '2025-04-12', time: '3:00 PM' },
        ];
        
        setStats(mockStats);
        setAnnouncements(mockAnnouncements);
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
        title="Student Dashboard" 
        description="Welcome back! Here's an overview of your academic progress."
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
            title="Enrolled Courses"
            value={stats.courses}
            icon={BookOpen}
          />
          <CardStat
            title="Pending Assignments"
            value={stats.assignments}
            icon={FileText}
          />
          <CardStat
            title="Upcoming Exams"
            value={stats.upcomingExams}
            icon={Calendar}
          />
          <CardStat
            title="Completed Courses"
            value={stats.completedCourses}
            icon={GraduationCap}
          />
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-university-600" />
              Upcoming Events
            </CardTitle>
            <CardDescription>Your schedule for the next few weeks</CardDescription>
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
                      <p className="text-sm text-muted-foreground">{event.time}</p>
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
              Recent Announcements
            </CardTitle>
            <CardDescription>Latest updates from your courses</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="animate-pulse space-y-2">
                    <div className="h-4 bg-muted rounded w-full"></div>
                    <div className="h-3 bg-muted rounded w-3/4"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : announcements.length > 0 ? (
              <div className="space-y-4">
                {announcements.map((announcement) => (
                  <div key={announcement.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                    <h4 className="font-medium">{announcement.title}</h4>
                    <p className="text-sm text-muted-foreground">{announcement.courseName}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDate(announcement.date)}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No recent announcements</p>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
