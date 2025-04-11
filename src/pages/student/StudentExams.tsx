
import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import PageHeader from '@/components/PageHeader';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarClock, Clock, BookOpen, AlertCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface Exam {
  id: string;
  title: string;
  courseCode: string;
  courseName: string;
  date: string;
  startTime: string;
  duration: string;
  status: 'upcoming' | 'available' | 'completed' | 'missed';
  score?: number;
  totalPoints: number;
  requiresProctoring: boolean;
}

const StudentExams = () => {
  const [exams, setExams] = useState<Exam[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchExams = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await fetch('/api/exams');
        // const data = await response.json();
        
        // Mock data
        const mockExams: Exam[] = [
          {
            id: '1',
            title: 'Midterm Examination',
            courseCode: 'CS101',
            courseName: 'Introduction to Computer Science',
            date: '2025-04-18',
            startTime: '10:00 AM',
            duration: '2 hours',
            status: 'upcoming',
            totalPoints: 100,
            requiresProctoring: true,
          },
          {
            id: '2',
            title: 'Weekly Quiz 3',
            courseCode: 'CS101',
            courseName: 'Introduction to Computer Science',
            date: '2025-04-12',
            startTime: '2:00 PM',
            duration: '30 minutes',
            status: 'available',
            totalPoints: 20,
            requiresProctoring: false,
          },
          {
            id: '3',
            title: 'Weekly Quiz 2',
            courseCode: 'CS101',
            courseName: 'Introduction to Computer Science',
            date: '2025-04-05',
            startTime: '2:00 PM',
            duration: '30 minutes',
            status: 'completed',
            score: 18,
            totalPoints: 20,
            requiresProctoring: false,
          },
          {
            id: '4',
            title: 'Calculus Midterm',
            courseCode: 'MATH201',
            courseName: 'Calculus II',
            date: '2025-04-20',
            startTime: '1:00 PM',
            duration: '3 hours',
            status: 'upcoming',
            totalPoints: 100,
            requiresProctoring: true,
          },
          {
            id: '5',
            title: 'Physics Quiz 1',
            courseCode: 'PHYS101',
            courseName: 'Physics I',
            date: '2025-04-02',
            startTime: '11:30 AM',
            duration: '45 minutes',
            status: 'missed',
            totalPoints: 25,
            requiresProctoring: false,
          },
          {
            id: '6',
            title: 'Physics Quiz 2',
            courseCode: 'PHYS101',
            courseName: 'Physics I',
            date: '2025-04-16',
            startTime: '11:30 AM',
            duration: '45 minutes',
            status: 'upcoming',
            totalPoints: 25,
            requiresProctoring: false,
          },
        ];
        
        setExams(mockExams);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to load exams',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchExams();
  }, [toast]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <Badge variant="outline" className="text-university-600 border-university-300">Upcoming</Badge>;
      case 'available':
        return <Badge className="bg-green-600">Available Now</Badge>;
      case 'completed':
        return <Badge variant="secondary">Completed</Badge>;
      case 'missed':
        return <Badge variant="destructive">Missed</Badge>;
      default:
        return null;
    }
  };

  const calculateTimeLeft = (date: string, startTime: string) => {
    const examDateTime = new Date(`${date} ${startTime}`);
    const now = new Date();
    const diffTime = examDateTime.getTime() - now.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ${diffHours} hour${diffHours > 1 ? 's' : ''}`;
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ${diffMinutes} minute${diffMinutes > 1 ? 's' : ''}`;
    } else if (diffMinutes > 0) {
      return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''}`;
    } else {
      return 'Starting now';
    }
  };

  return (
    <DashboardLayout>
      <PageHeader 
        title="Exams" 
        description="View and take your online exams"
      />
      
      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="available">Available Now</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <ExamList 
            exams={exams} 
            isLoading={isLoading} 
            formatDate={formatDate}
            getStatusBadge={getStatusBadge}
            calculateTimeLeft={calculateTimeLeft}
          />
        </TabsContent>
        
        <TabsContent value="upcoming">
          <ExamList 
            exams={exams.filter(e => e.status === 'upcoming')} 
            isLoading={isLoading} 
            formatDate={formatDate}
            getStatusBadge={getStatusBadge}
            calculateTimeLeft={calculateTimeLeft}
          />
        </TabsContent>
        
        <TabsContent value="available">
          <ExamList 
            exams={exams.filter(e => e.status === 'available')} 
            isLoading={isLoading} 
            formatDate={formatDate}
            getStatusBadge={getStatusBadge}
            calculateTimeLeft={calculateTimeLeft}
          />
        </TabsContent>
        
        <TabsContent value="completed">
          <ExamList 
            exams={exams.filter(e => e.status === 'completed' || e.status === 'missed')} 
            isLoading={isLoading} 
            formatDate={formatDate}
            getStatusBadge={getStatusBadge}
            calculateTimeLeft={calculateTimeLeft}
          />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

interface ExamListProps {
  exams: Exam[];
  isLoading: boolean;
  formatDate: (date: string) => string;
  getStatusBadge: (status: string) => JSX.Element | null;
  calculateTimeLeft: (date: string, startTime: string) => string;
}

const ExamList = ({ 
  exams, 
  isLoading, 
  formatDate, 
  getStatusBadge, 
  calculateTimeLeft 
}: ExamListProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-2">
              <div className="h-5 bg-muted rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-4 bg-muted rounded w-full mb-4"></div>
              <div className="h-4 bg-muted rounded w-3/4"></div>
            </CardContent>
            <CardFooter>
              <div className="h-9 bg-muted rounded w-full"></div>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  if (exams.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No exams found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {exams.map((exam) => (
        <Card key={exam.id}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">{exam.title}</CardTitle>
                <div className="text-sm text-muted-foreground">
                  {exam.courseCode} - {exam.courseName}
                </div>
              </div>
              {getStatusBadge(exam.status)}
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-x-6 text-sm text-muted-foreground mb-4">
              <span className="flex items-center gap-1">
                <CalendarClock className="h-4 w-4" /> 
                {formatDate(exam.date)}, {exam.startTime}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" /> {exam.duration}
              </span>
              <span className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" /> {exam.totalPoints} Points
              </span>
            </div>
            
            {exam.status === 'upcoming' && (
              <div className="text-sm">
                Time until exam: <span className="font-medium text-university-700">
                  {calculateTimeLeft(exam.date, exam.startTime)}
                </span>
              </div>
            )}
            
            {exam.status === 'completed' && (
              <div className="text-sm">
                Score: <span className="font-medium">{exam.score} / {exam.totalPoints}</span>
              </div>
            )}
            
            {exam.requiresProctoring && (
              <div className="flex items-center gap-1 text-sm text-amber-600 mt-2">
                <AlertCircle className="h-4 w-4" /> 
                This exam requires proctoring
              </div>
            )}
          </CardContent>
          <CardFooter>
            {exam.status === 'available' && (
              <Button className="w-full">Start Exam</Button>
            )}
            
            {exam.status === 'upcoming' && (
              <Button variant="outline" className="w-full">View Details</Button>
            )}
            
            {exam.status === 'completed' && (
              <Button variant="outline" className="w-full">View Results</Button>
            )}
            
            {exam.status === 'missed' && (
              <Button variant="outline" disabled className="w-full">Exam Missed</Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default StudentExams;
