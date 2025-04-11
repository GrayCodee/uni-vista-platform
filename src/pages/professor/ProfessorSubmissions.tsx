import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import PageHeader from '@/components/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Check, FileText, Search, UserCheck, X } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

interface Submission {
  id: string;
  studentName: string;
  studentEmail: string;
  assignmentId: string;
  assignmentTitle: string;
  courseId: string;
  courseCode: string;
  courseName: string;
  submittedAt: string;
  status: 'pending' | 'graded';
  grade?: number;
  totalPoints: number;
  feedback?: string;
}

interface Course {
  id: string;
  code: string;
  title: string;
}

interface Assignment {
  id: string;
  title: string;
  courseId: string;
  courseCode: string;
}

const ProfessorSubmissions = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState<string>('all');
  const [selectedAssignment, setSelectedAssignment] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [gradeValue, setGradeValue] = useState('');
  const [feedbackValue, setFeedbackValue] = useState('');
  const [isGradeDialogOpen, setIsGradeDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real app, these would be API calls
        // const submissionsResponse = await fetch('/api/professor/submissions');
        // const coursesResponse = await fetch('/api/professor/courses');
        // const assignmentsResponse = await fetch('/api/professor/assignments');
        
        // Mock courses data
        const mockCourses: Course[] = [
          { id: '1', code: 'CS101', title: 'Introduction to Computer Science' },
          { id: '2', code: 'MATH201', title: 'Calculus II' },
          { id: '3', code: 'PHYS101', title: 'Physics I' },
        ];
        
        // Mock assignments data
        const mockAssignments: Assignment[] = [
          { id: '1', title: 'Programming Basics - Assignment 1', courseId: '1', courseCode: 'CS101' },
          { id: '2', title: 'Programming Loops - Assignment 2', courseId: '1', courseCode: 'CS101' },
          { id: '3', title: 'Derivative Applications', courseId: '2', courseCode: 'MATH201' },
          { id: '4', title: 'Limits and Continuity', courseId: '2', courseCode: 'MATH201' },
          { id: '5', title: 'Newton\'s Laws of Motion', courseId: '3', courseCode: 'PHYS101' },
          { id: '6', title: 'Energy Conservation', courseId: '3', courseCode: 'PHYS101' },
        ];
        
        // Mock submissions data
        const mockSubmissions: Submission[] = [
          {
            id: '1',
            studentName: 'Alex Johnson',
            studentEmail: 'alex.johnson@university.edu',
            assignmentId: '1',
            assignmentTitle: 'Programming Basics - Assignment 1',
            courseId: '1',
            courseCode: 'CS101',
            courseName: 'Introduction to Computer Science',
            submittedAt: '2025-04-10T14:32:00',
            status: 'pending',
            totalPoints: 100,
          },
          {
            id: '2',
            studentName: 'Sarah Williams',
            studentEmail: 'sarah.williams@university.edu',
            assignmentId: '1',
            assignmentTitle: 'Programming Basics - Assignment 1',
            courseId: '1',
            courseCode: 'CS101',
            courseName: 'Introduction to Computer Science',
            submittedAt: '2025-04-09T16:45:00',
            status: 'pending',
            totalPoints: 100,
          },
          {
            id: '3',
            studentName: 'Michael Brown',
            studentEmail: 'michael.brown@university.edu',
            assignmentId: '1',
            assignmentTitle: 'Programming Basics - Assignment 1',
            courseId: '1',
            courseCode: 'CS101',
            courseName: 'Introduction to Computer Science',
            submittedAt: '2025-04-08T11:20:00',
            status: 'graded',
            grade: 92,
            totalPoints: 100,
            feedback: 'Excellent work on the calculator program. Good use of variables and functions. Consider adding more error handling in future assignments.',
          },
          {
            id: '4',
            studentName: 'Jessica Lee',
            studentEmail: 'jessica.lee@university.edu',
            assignmentId: '3',
            assignmentTitle: 'Derivative Applications',
            courseId: '2',
            courseCode: 'MATH201',
            courseName: 'Calculus II',
            submittedAt: '2025-04-08T09:15:00',
            status: 'pending',
            totalPoints: 50,
          },
          {
            id: '5',
            studentName: 'David Smith',
            studentEmail: 'david.smith@university.edu',
            assignmentId: '3',
            assignmentTitle: 'Derivative Applications',
            courseId: '2',
            courseCode: 'MATH201',
            courseName: 'Calculus II',
            submittedAt: '2025-04-08T13:40:00',
            status: 'graded',
            grade: 45,
            totalPoints: 50,
            feedback: 'Well done on optimization problems. The related rates section could use some improvement in setting up the equations.',
          },
          {
            id: '6',
            studentName: 'Emily Brown',
            studentEmail: 'emily.brown@university.edu',
            assignmentId: '5',
            assignmentTitle: 'Newton\'s Laws of Motion',
            courseId: '3',
            courseCode: 'PHYS101',
            courseName: 'Physics I',
            submittedAt: '2025-04-07T15:55:00',
            status: 'graded',
            grade: 85,
            totalPoints: 100,
            feedback: 'Good application of Newton\'s laws. Work on drawing better free body diagrams and showing your work more clearly.',
          },
          {
            id: '7',
            studentName: 'James Wilson',
            studentEmail: 'james.wilson@university.edu',
            assignmentId: '5',
            assignmentTitle: 'Newton\'s Laws of Motion',
            courseId: '3',
            courseCode: 'PHYS101',
            courseName: 'Physics I',
            submittedAt: '2025-04-08T10:10:00',
            status: 'pending',
            totalPoints: 100,
          },
        ];
        
        setCourses(mockCourses);
        setAssignments(mockAssignments);
        setSubmissions(mockSubmissions);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to load data',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [toast]);

  const formatDate = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return date.toLocaleDateString(undefined, { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getFilteredSubmissions = () => {
    let filtered = [...submissions];
    
    // Filter by course
    if (selectedCourse !== 'all') {
      filtered = filtered.filter(submission => submission.courseId === selectedCourse);
    }
    
    // Filter by assignment
    if (selectedAssignment !== 'all') {
      filtered = filtered.filter(submission => submission.assignmentId === selectedAssignment);
    }
    
    // Filter by search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        submission =>
          submission.studentName.toLowerCase().includes(query) ||
          submission.assignmentTitle.toLowerCase().includes(query) ||
          submission.courseCode.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  };

  const getFilteredAssignments = () => {
    if (selectedCourse === 'all') {
      return assignments;
    }
    return assignments.filter(assignment => assignment.courseId === selectedCourse);
  };

  const handleOpenGradeDialog = (submission: Submission) => {
    setSelectedSubmission(submission);
    setGradeValue(submission.grade?.toString() || '');
    setFeedbackValue(submission.feedback || '');
    setIsGradeDialogOpen(true);
  };

  const handleSubmitGrade = () => {
    if (!selectedSubmission) return;
    
    const gradeNum = parseFloat(gradeValue);
    if (isNaN(gradeNum) || gradeNum < 0 || gradeNum > selectedSubmission.totalPoints) {
      toast({
        title: 'Invalid Grade',
        description: `Please enter a grade between 0 and ${selectedSubmission.totalPoints}`,
        variant: 'destructive',
      });
      return;
    }
    
    // Update the submission with the new grade and feedback
    const updatedSubmissions = submissions.map(submission => 
      submission.id === selectedSubmission.id 
        ? { 
            ...submission, 
            status: 'graded' as const, 
            grade: gradeNum, 
            feedback: feedbackValue 
          } 
        : submission
    );
    
    setSubmissions(updatedSubmissions);
    
    toast({
      title: 'Assignment Graded',
      description: `Grade submitted for ${selectedSubmission.studentName}`,
    });
    
    setIsGradeDialogOpen(false);
  };

  return (
    <DashboardLayout>
      <PageHeader 
        title="Submissions" 
        description="View and grade student assignment submissions"
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
        <div className="lg:col-span-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search by student or assignment..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div>
          <Select value={selectedCourse} onValueChange={setSelectedCourse}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by course" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Courses</SelectItem>
              {courses.map((course) => (
                <SelectItem key={course.id} value={course.id}>
                  {course.code} - {course.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Select 
            value={selectedAssignment} 
            onValueChange={setSelectedAssignment}
            disabled={getFilteredAssignments().length === 0}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by assignment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Assignments</SelectItem>
              {getFilteredAssignments().map((assignment) => (
                <SelectItem key={assignment.id} value={assignment.id}>
                  {assignment.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Submissions</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="graded">Graded</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <SubmissionList 
            submissions={getFilteredSubmissions()} 
            isLoading={isLoading} 
            formatDate={formatDate}
            onGrade={handleOpenGradeDialog}
          />
        </TabsContent>
        
        <TabsContent value="pending">
          <SubmissionList 
            submissions={getFilteredSubmissions().filter(s => s.status === 'pending')} 
            isLoading={isLoading} 
            formatDate={formatDate}
            onGrade={handleOpenGradeDialog}
          />
        </TabsContent>
        
        <TabsContent value="graded">
          <SubmissionList 
            submissions={getFilteredSubmissions().filter(s => s.status === 'graded')} 
            isLoading={isLoading} 
            formatDate={formatDate}
            onGrade={handleOpenGradeDialog}
          />
        </TabsContent>
      </Tabs>
      
      <Dialog open={isGradeDialogOpen} onOpenChange={setIsGradeDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Grade Submission</DialogTitle>
            <DialogDescription>
              {selectedSubmission?.studentName} - {selectedSubmission?.assignmentTitle}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="grade">
                Grade (out of {selectedSubmission?.totalPoints})
              </Label>
              <Input
                id="grade"
                type="number"
                value={gradeValue}
                onChange={(e) => setGradeValue(e.target.value)}
                min={0}
                max={selectedSubmission?.totalPoints}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="feedback">Feedback</Label>
              <Textarea
                id="feedback"
                placeholder="Provide feedback to the student..."
                value={feedbackValue}
                onChange={(e) => setFeedbackValue(e.target.value)}
                rows={5}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsGradeDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitGrade}>
              Submit Grade
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

interface SubmissionListProps {
  submissions: Submission[];
  isLoading: boolean;
  formatDate: (dateTime: string) => string;
  onGrade: (submission: Submission) => void;
}

const SubmissionList = ({ 
  submissions, 
  isLoading, 
  formatDate,
  onGrade
}: SubmissionListProps) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-2">
              <div className="h-5 bg-muted rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-4 bg-muted rounded w-full mb-4"></div>
              <div className="h-4 bg-muted rounded w-3/4"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (submissions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No submissions found matching the selected filters.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {submissions.map((submission) => (
        <Card key={submission.id}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">{submission.studentName}</CardTitle>
                <CardDescription>{submission.studentEmail}</CardDescription>
              </div>
              <div>
                {submission.status === 'pending' ? (
                  <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                    Pending Review
                  </span>
                ) : (
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full flex items-center gap-1">
                    <Check className="h-3 w-3" /> Graded
                  </span>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row justify-between mb-4">
              <div className="space-y-1">
                <div className="text-sm font-medium">{submission.assignmentTitle}</div>
                <div className="text-sm text-muted-foreground">
                  {submission.courseCode} - {submission.courseName}
                </div>
              </div>
              <div className="mt-2 md:mt-0 text-sm text-muted-foreground">
                Submitted: {formatDate(submission.submittedAt)}
              </div>
            </div>
            
            {submission.status === 'graded' && (
              <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Grade:</span>
                  <span className="text-sm font-medium">
                    {submission.grade} / {submission.totalPoints} 
                    ({((submission.grade! / submission.totalPoints) * 100).toFixed(0)}%)
                  </span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div 
                    className="bg-university-600 h-2 rounded-full" 
                    style={{ width: `${(submission.grade! / submission.totalPoints) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}
            
            {submission.status === 'graded' && submission.feedback && (
              <div className="mt-4 text-sm">
                <div className="font-medium mb-1">Feedback:</div>
                <div className="text-muted-foreground bg-muted p-3 rounded">
                  {submission.feedback}
                </div>
              </div>
            )}
            
            <div className="flex justify-end mt-4 space-x-3">
              <Button variant="outline" className="gap-1">
                <FileText className="h-4 w-4" /> View Submission
              </Button>
              
              {submission.status === 'pending' ? (
                <Button 
                  className="gap-1"
                  onClick={() => onGrade(submission)}
                >
                  <UserCheck className="h-4 w-4" /> Grade
                </Button>
              ) : (
                <Button 
                  variant="outline" 
                  className="gap-1"
                  onClick={() => onGrade(submission)}
                >
                  <UserCheck className="h-4 w-4" /> Update Grade
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProfessorSubmissions;
