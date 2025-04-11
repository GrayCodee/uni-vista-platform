
import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import PageHeader from '@/components/PageHeader';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Calendar, Clock, Upload } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface Assignment {
  id: string;
  title: string;
  courseCode: string;
  courseName: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded' | 'late';
  points?: number;
  totalPoints: number;
  description: string;
}

const StudentAssignments = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await fetch('/api/assignments');
        // const data = await response.json();
        
        // Mock data
        const mockAssignments: Assignment[] = [
          {
            id: '1',
            title: 'Programming Basics - Assignment 1',
            courseCode: 'CS101',
            courseName: 'Introduction to Computer Science',
            dueDate: '2025-04-15',
            status: 'pending',
            totalPoints: 100,
            description: 'Create a simple calculator program using variables and conditional statements.',
          },
          {
            id: '2',
            title: 'Programming Loops - Assignment 2',
            courseCode: 'CS101',
            courseName: 'Introduction to Computer Science',
            dueDate: '2025-04-05',
            status: 'submitted',
            totalPoints: 100,
            description: 'Implement various loop constructs to solve numerical problems.',
          },
          {
            id: '3',
            title: 'Derivative Applications',
            courseCode: 'MATH201',
            courseName: 'Calculus II',
            dueDate: '2025-04-12',
            status: 'pending',
            totalPoints: 50,
            description: 'Solve problems using derivative applications for optimization and related rates.',
          },
          {
            id: '4',
            title: 'Limits and Continuity',
            courseCode: 'MATH201',
            courseName: 'Calculus II',
            dueDate: '2025-04-01',
            status: 'graded',
            points: 48,
            totalPoints: 50,
            description: 'Calculate limits and analyze function continuity.',
          },
          {
            id: '5',
            title: 'Newtons Laws of Motion',
            courseCode: 'PHYS101',
            courseName: 'Physics I',
            dueDate: '2025-04-03',
            status: 'graded',
            points: 85,
            totalPoints: 100,
            description: 'Solve problems using Newton\'s laws of motion.',
          },
          {
            id: '6',
            title: 'Energy Conservation',
            courseCode: 'PHYS101',
            courseName: 'Physics I',
            dueDate: '2025-04-10',
            status: 'late',
            totalPoints: 100,
            description: 'Apply conservation of energy principles to various physical systems.',
          },
        ];
        
        setAssignments(mockAssignments);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to load assignments',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAssignments();
  }, [toast]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  const getStatusBadge = (status: string, dueDate: string) => {
    if (status === 'pending' && isOverdue(dueDate)) {
      return <Badge variant="destructive">Overdue</Badge>;
    }
    
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="text-university-600 border-university-300">Pending</Badge>;
      case 'submitted':
        return <Badge variant="secondary">Submitted</Badge>;
      case 'graded':
        return <Badge className="bg-green-600">Graded</Badge>;
      case 'late':
        return <Badge variant="destructive">Late</Badge>;
      default:
        return null;
    }
  };

  const calculateDaysLeft = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return 'Past due';
    } else if (diffDays === 0) {
      return 'Due today';
    } else if (diffDays === 1) {
      return 'Due tomorrow';
    } else {
      return `${diffDays} days left`;
    }
  };

  return (
    <DashboardLayout>
      <PageHeader 
        title="Assignments" 
        description="View and submit your course assignments"
      />
      
      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="submitted">Submitted</TabsTrigger>
          <TabsTrigger value="graded">Graded</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <AssignmentList 
            assignments={assignments} 
            isLoading={isLoading} 
            formatDate={formatDate}
            getStatusBadge={getStatusBadge}
            calculateDaysLeft={calculateDaysLeft}
          />
        </TabsContent>
        
        <TabsContent value="pending">
          <AssignmentList 
            assignments={assignments.filter(a => a.status === 'pending')} 
            isLoading={isLoading} 
            formatDate={formatDate}
            getStatusBadge={getStatusBadge}
            calculateDaysLeft={calculateDaysLeft}
          />
        </TabsContent>
        
        <TabsContent value="submitted">
          <AssignmentList 
            assignments={assignments.filter(a => a.status === 'submitted' || a.status === 'late')} 
            isLoading={isLoading} 
            formatDate={formatDate}
            getStatusBadge={getStatusBadge}
            calculateDaysLeft={calculateDaysLeft}
          />
        </TabsContent>
        
        <TabsContent value="graded">
          <AssignmentList 
            assignments={assignments.filter(a => a.status === 'graded')} 
            isLoading={isLoading} 
            formatDate={formatDate}
            getStatusBadge={getStatusBadge}
            calculateDaysLeft={calculateDaysLeft}
          />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

interface AssignmentListProps {
  assignments: Assignment[];
  isLoading: boolean;
  formatDate: (date: string) => string;
  getStatusBadge: (status: string, dueDate: string) => JSX.Element | null;
  calculateDaysLeft: (dueDate: string) => string;
}

const AssignmentList = ({ 
  assignments, 
  isLoading, 
  formatDate, 
  getStatusBadge, 
  calculateDaysLeft 
}: AssignmentListProps) => {
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

  if (assignments.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No assignments found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {assignments.map((assignment) => (
        <Card key={assignment.id}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">{assignment.title}</CardTitle>
                <div className="text-sm text-muted-foreground">
                  {assignment.courseCode} - {assignment.courseName}
                </div>
              </div>
              {getStatusBadge(assignment.status, assignment.dueDate)}
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4">
              {assignment.description}
            </p>
            
            <div className="flex flex-wrap gap-x-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" /> Due: {formatDate(assignment.dueDate)}
              </span>
              {assignment.status === 'pending' && (
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" /> {calculateDaysLeft(assignment.dueDate)}
                </span>
              )}
              {assignment.status === 'graded' && (
                <span>
                  Score: {assignment.points} / {assignment.totalPoints}
                </span>
              )}
            </div>
          </CardContent>
          <CardFooter>
            {(assignment.status === 'pending' || assignment.status === 'late') && (
              <Button className="w-full gap-1">
                <Upload className="h-4 w-4" /> Submit Assignment
              </Button>
            )}
            
            {assignment.status === 'submitted' && (
              <Button variant="outline" className="w-full">View Submission</Button>
            )}
            
            {assignment.status === 'graded' && (
              <Button variant="outline" className="w-full">View Feedback</Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default StudentAssignments;
