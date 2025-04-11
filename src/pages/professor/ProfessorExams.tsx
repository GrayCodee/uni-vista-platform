import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Calendar, Clock, BookOpen, AlertTriangle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

interface Exam {
  id: string;
  title: string;
  description: string;
  courseId: string;
  courseCode: string;
  courseName: string;
  date: string;
  startTime: string;
  duration: string;
  totalPoints: number;
  requiresProctoring: boolean;
  status: 'draft' | 'scheduled' | 'active' | 'completed';
  submissions?: number;
}

interface Course {
  id: string;
  code: string;
  title: string;
}

const ProfessorExams = () => {
  const [exams, setExams] = useState<Exam[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newExam, setNewExam] = useState({
    title: '',
    description: '',
    courseId: '',
    date: '',
    startTime: '',
    duration: '60',
    totalPoints: '100',
    requiresProctoring: false,
  });
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real app, these would be API calls
        // const examsResponse = await fetch('/api/professor/exams');
        // const coursesResponse = await fetch('/api/professor/courses');
        
        // Mock courses data
        const mockCourses: Course[] = [
          { id: '1', code: 'CS101', title: 'Introduction to Computer Science' },
          { id: '2', code: 'MATH201', title: 'Calculus II' },
          { id: '3', code: 'PHYS101', title: 'Physics I' },
        ];
        
        // Mock exams data
        const mockExams: Exam[] = [
          {
            id: '1',
            title: 'Midterm Examination',
            description: 'Comprehensive examination covering all topics from weeks 1-6.',
            courseId: '1',
            courseCode: 'CS101',
            courseName: 'Introduction to Computer Science',
            date: '2025-04-18',
            startTime: '10:00',
            duration: '120 minutes',
            totalPoints: 100,
            requiresProctoring: true,
            status: 'scheduled',
          },
          {
            id: '2',
            title: 'Weekly Quiz 3',
            description: 'Quiz covering loops and conditional statements.',
            courseId: '1',
            courseCode: 'CS101',
            courseName: 'Introduction to Computer Science',
            date: '2025-04-12',
            startTime: '14:00',
            duration: '30 minutes',
            totalPoints: 20,
            requiresProctoring: false,
            status: 'scheduled',
          },
          {
            id: '3',
            title: 'Weekly Quiz 2',
            description: 'Quiz covering variables and data types.',
            courseId: '1',
            courseCode: 'CS101',
            courseName: 'Introduction to Computer Science',
            date: '2025-04-05',
            startTime: '14:00',
            duration: '30 minutes',
            totalPoints: 20,
            requiresProctoring: false,
            status: 'completed',
            submissions: 42,
          },
          {
            id: '4',
            title: 'Calculus Midterm',
            description: 'Examination covering limits, continuity, and derivatives.',
            courseId: '2',
            courseCode: 'MATH201',
            courseName: 'Calculus II',
            date: '2025-04-20',
            startTime: '13:00',
            duration: '180 minutes',
            totalPoints: 100,
            requiresProctoring: true,
            status: 'scheduled',
          },
          {
            id: '5',
            title: 'Physics Quiz 1',
            description: 'Quiz covering Newton\'s laws of motion.',
            courseId: '3',
            courseCode: 'PHYS101',
            courseName: 'Physics I',
            date: '2025-04-02',
            startTime: '11:30',
            duration: '45 minutes',
            totalPoints: 25,
            requiresProctoring: false,
            status: 'completed',
            submissions: 38,
          },
          {
            id: '6',
            title: 'Final Exam',
            description: 'Comprehensive examination covering the entire course.',
            courseId: '1',
            courseCode: 'CS101',
            courseName: 'Introduction to Computer Science',
            date: '2025-05-15',
            startTime: '09:00',
            duration: '180 minutes',
            totalPoints: 150,
            requiresProctoring: true,
            status: 'draft',
          },
        ];
        
        setCourses(mockCourses);
        setExams(mockExams);
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

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const time = new Date();
    time.setHours(parseInt(hours), parseInt(minutes), 0);
    
    return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleCreateExam = async () => {
    if (!newExam.title || !newExam.courseId || !newExam.date || !newExam.startTime) {
      toast({
        title: 'Missing Fields',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }
    
    try {
      // In a real app, this would be an API call
      // const response = await fetch('/api/courses/exams', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(newExam),
      // });
      // const data = await response.json();
      
      // Mock response
      const course = courses.find(c => c.id === newExam.courseId);
      if (!course) {
        throw new Error('Course not found');
      }
      
      const newId = (exams.length + 1).toString();
      const createdExam: Exam = {
        id: newId,
        title: newExam.title,
        description: newExam.description,
        courseId: newExam.courseId,
        courseCode: course.code,
        courseName: course.title,
        date: newExam.date,
        startTime: newExam.startTime,
        duration: `${newExam.duration} minutes`,
        totalPoints: parseInt(newExam.totalPoints) || 100,
        requiresProctoring: newExam.requiresProctoring,
        status: 'draft',
      };
      
      setExams([...exams, createdExam]);
      
      toast({
        title: 'Exam Created',
        description: `${newExam.title} has been created as a draft.`,
      });
      
      // Reset form
      setNewExam({
        title: '',
        description: '',
        courseId: '',
        date: '',
        startTime: '',
        duration: '60',
        totalPoints: '100',
        requiresProctoring: false,
      });
      
      setIsDialogOpen(false);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create exam',
        variant: 'destructive',
      });
    }
  };

  const publishExam = (examId: string) => {
    const updatedExams = exams.map(exam => 
      exam.id === examId ? { ...exam, status: 'scheduled' as const } : exam
    );
    
    setExams(updatedExams);
    
    toast({
      title: 'Exam Scheduled',
      description: 'The exam has been scheduled and published to students.',
    });
  };

  return (
    <DashboardLayout>
      <PageHeader 
        title="Exams" 
        description="Create and manage course examinations"
        action={
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-1">
                <Plus className="h-4 w-4" /> Create Exam
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Create New Exam</DialogTitle>
                <DialogDescription>
                  Schedule a new exam or quiz for your course.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="examTitle">Exam Title*</Label>
                  <Input
                    id="examTitle"
                    placeholder="e.g., Midterm Examination"
                    value={newExam.title}
                    onChange={(e) => setNewExam({ ...newExam, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="examDescription">Description</Label>
                  <Textarea
                    id="examDescription"
                    placeholder="Enter exam description and scope"
                    value={newExam.description}
                    onChange={(e) => setNewExam({ ...newExam, description: e.target.value })}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="examCourse">Course*</Label>
                  <Select 
                    value={newExam.courseId} 
                    onValueChange={(value) => setNewExam({ ...newExam, courseId: value })}
                  >
                    <SelectTrigger id="examCourse">
                      <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.map((course) => (
                        <SelectItem key={course.id} value={course.id}>
                          {course.code} - {course.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="examDate">Exam Date*</Label>
                    <Input
                      id="examDate"
                      type="date"
                      value={newExam.date}
                      onChange={(e) => setNewExam({ ...newExam, date: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="examTime">Start Time*</Label>
                    <Input
                      id="examTime"
                      type="time"
                      value={newExam.startTime}
                      onChange={(e) => setNewExam({ ...newExam, startTime: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="examDuration">Duration (minutes)</Label>
                    <Input
                      id="examDuration"
                      type="number"
                      placeholder="60"
                      value={newExam.duration}
                      onChange={(e) => setNewExam({ ...newExam, duration: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="examPoints">Total Points</Label>
                    <Input
                      id="examPoints"
                      type="number"
                      placeholder="100"
                      value={newExam.totalPoints}
                      onChange={(e) => setNewExam({ ...newExam, totalPoints: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="examProctoring" 
                    checked={newExam.requiresProctoring}
                    onCheckedChange={(checked) => 
                      setNewExam({ ...newExam, requiresProctoring: checked as boolean })
                    }
                  />
                  <Label htmlFor="examProctoring">
                    Require proctoring for this exam
                  </Label>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateExam}>
                  Create as Draft
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />
      
      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Exams</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <ExamList 
            exams={exams} 
            isLoading={isLoading} 
            formatDate={formatDate}
            formatTime={formatTime}
            publishExam={publishExam}
          />
        </TabsContent>
        
        <TabsContent value="upcoming">
          <ExamList 
            exams={exams.filter(exam => exam.status === 'scheduled' || exam.status === 'active')} 
            isLoading={isLoading} 
            formatDate={formatDate}
            formatTime={formatTime}
            publishExam={publishExam}
          />
        </TabsContent>
        
        <TabsContent value="completed">
          <ExamList 
            exams={exams.filter(exam => exam.status === 'completed')} 
            isLoading={isLoading} 
            formatDate={formatDate}
            formatTime={formatTime}
            publishExam={publishExam}
          />
        </TabsContent>
        
        <TabsContent value="drafts">
          <ExamList 
            exams={exams.filter(exam => exam.status === 'draft')} 
            isLoading={isLoading} 
            formatDate={formatDate}
            formatTime={formatTime}
            publishExam={publishExam}
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
  formatTime: (time: string) => string;
  publishExam: (examId: string) => void;
}

const ExamList = ({ 
  exams, 
  isLoading, 
  formatDate, 
  formatTime,
  publishExam
}: ExamListProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {exams.map((exam) => (
        <Card key={exam.id}>
          <CardHeader className="pb-2">
            <div className="flex justify-between">
              <div>
                <CardTitle className="text-lg">{exam.title}</CardTitle>
                <CardDescription>{exam.courseCode} - {exam.courseName}</CardDescription>
              </div>
              <div>
                {exam.status === 'draft' && (
                  <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                    Draft
                  </span>
                )}
                {exam.status === 'scheduled' && (
                  <span className="text-xs bg-university-100 text-university-800 px-2 py-1 rounded-full">
                    Scheduled
                  </span>
                )}
                {exam.status === 'active' && (
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    In Progress
                  </span>
                )}
                {exam.status === 'completed' && (
                  <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">
                    Completed
                  </span>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {exam.description}
            </p>
            
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" /> {formatDate(exam.date)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" /> {formatTime(exam.startTime)}
              </span>
              <span className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" /> {exam.totalPoints} Points
              </span>
            </div>
            
            {exam.requiresProctoring && (
              <div className="flex items-center gap-1 text-amber-600 mt-3 text-sm">
                <AlertTriangle className="h-4 w-4" />
                Proctoring required
              </div>
            )}
            
            {exam.status === 'completed' && exam.submissions !== undefined && (
              <div className="mt-3 text-sm">
                <span className="font-medium">{exam.submissions} submissions</span>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex gap-2">
            {exam.status === 'draft' ? (
              <>
                <Button 
                  variant="secondary" 
                  className="flex-1"
                  onClick={() => publishExam(exam.id)}
                >
                  Schedule & Publish
                </Button>
                <Button variant="outline" className="flex-1">
                  Edit
                </Button>
              </>
            ) : exam.status === 'completed' ? (
              <>
                <Button className="flex-1">
                  View Results
                </Button>
                <Button variant="outline" className="flex-1">
                  Details
                </Button>
              </>
            ) : (
              <>
                <Button className="flex-1">
                  Manage
                </Button>
                <Button variant="outline" className="flex-1">
                  Edit
                </Button>
              </>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ProfessorExams;
