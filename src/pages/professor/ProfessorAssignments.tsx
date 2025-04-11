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
import { Plus, Upload, Calendar, FileText } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

interface Assignment {
  id: string;
  title: string;
  instructions: string;
  courseId: string;
  courseCode: string;
  courseName: string;
  dueDate: string;
  totalPoints: number;
  status: 'draft' | 'published';
  submissions: number;
}

interface Course {
  id: string;
  code: string;
  title: string;
}

const ProfessorAssignments = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    instructions: '',
    courseId: '',
    dueDate: '',
    totalPoints: '100',
    file: null as File | null,
  });
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real app, these would be API calls
        // const assignmentsResponse = await fetch('/api/professor/assignments');
        // const coursesResponse = await fetch('/api/professor/courses');
        
        // Mock courses data
        const mockCourses: Course[] = [
          { id: '1', code: 'CS101', title: 'Introduction to Computer Science' },
          { id: '2', code: 'MATH201', title: 'Calculus II' },
          { id: '3', code: 'PHYS101', title: 'Physics I' },
        ];
        
        // Mock assignments data
        const mockAssignments: Assignment[] = [
          {
            id: '1',
            title: 'Programming Basics - Assignment 1',
            instructions: 'Create a simple calculator program using variables and conditional statements.',
            courseId: '1',
            courseCode: 'CS101',
            courseName: 'Introduction to Computer Science',
            dueDate: '2025-04-15',
            totalPoints: 100,
            status: 'published',
            submissions: 28,
          },
          {
            id: '2',
            title: 'Programming Loops - Assignment 2',
            instructions: 'Implement various loop constructs to solve numerical problems.',
            courseId: '1',
            courseCode: 'CS101',
            courseName: 'Introduction to Computer Science',
            dueDate: '2025-04-25',
            totalPoints: 100,
            status: 'draft',
            submissions: 0,
          },
          {
            id: '3',
            title: 'Derivative Applications',
            instructions: 'Solve problems using derivative applications for optimization and related rates.',
            courseId: '2',
            courseCode: 'MATH201',
            courseName: 'Calculus II',
            dueDate: '2025-04-20',
            totalPoints: 50,
            status: 'published',
            submissions: 15,
          },
          {
            id: '4',
            title: 'Limits and Continuity',
            instructions: 'Calculate limits and analyze function continuity.',
            courseId: '2',
            courseCode: 'MATH201',
            courseName: 'Calculus II',
            dueDate: '2025-04-10',
            totalPoints: 50,
            status: 'published',
            submissions: 22,
          },
          {
            id: '5',
            title: 'Newton\'s Laws of Motion',
            instructions: 'Solve problems using Newton\'s laws of motion.',
            courseId: '3',
            courseCode: 'PHYS101',
            courseName: 'Physics I',
            dueDate: '2025-04-12',
            totalPoints: 100,
            status: 'published',
            submissions: 30,
          },
          {
            id: '6',
            title: 'Energy Conservation',
            instructions: 'Apply conservation of energy principles to various physical systems.',
            courseId: '3',
            courseCode: 'PHYS101',
            courseName: 'Physics I',
            dueDate: '2025-04-22',
            totalPoints: 100,
            status: 'draft',
            submissions: 0,
          },
        ];
        
        setCourses(mockCourses);
        setAssignments(mockAssignments);
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

  const handleCreateAssignment = async () => {
    if (!newAssignment.title || !newAssignment.courseId || !newAssignment.dueDate) {
      toast({
        title: 'Missing Fields',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }
    
    try {
      // In a real app, this would be an API call with form data for the file
      // const formData = new FormData();
      // formData.append('title', newAssignment.title);
      // formData.append('instructions', newAssignment.instructions);
      // formData.append('courseId', newAssignment.courseId);
      // formData.append('dueDate', newAssignment.dueDate);
      // formData.append('totalPoints', newAssignment.totalPoints);
      // if (newAssignment.file) {
      //   formData.append('file', newAssignment.file);
      // }
      
      // const response = await fetch('/api/courses/assignments', {
      //   method: 'POST',
      //   body: formData,
      // });
      // const data = await response.json();
      
      // Mock response
      const course = courses.find(c => c.id === newAssignment.courseId);
      if (!course) {
        throw new Error('Course not found');
      }
      
      const newId = (assignments.length + 1).toString();
      const createdAssignment: Assignment = {
        id: newId,
        title: newAssignment.title,
        instructions: newAssignment.instructions,
        courseId: newAssignment.courseId,
        courseCode: course.code,
        courseName: course.title,
        dueDate: newAssignment.dueDate,
        totalPoints: parseInt(newAssignment.totalPoints) || 100,
        status: 'draft',
        submissions: 0,
      };
      
      setAssignments([...assignments, createdAssignment]);
      
      toast({
        title: 'Assignment Created',
        description: `${newAssignment.title} has been created as a draft.`,
      });
      
      // Reset form
      setNewAssignment({
        title: '',
        instructions: '',
        courseId: '',
        dueDate: '',
        totalPoints: '100',
        file: null,
      });
      
      setIsDialogOpen(false);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create assignment',
        variant: 'destructive',
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewAssignment({
        ...newAssignment,
        file: e.target.files[0],
      });
    }
  };

  const publishAssignment = (assignmentId: string) => {
    const updatedAssignments = assignments.map(assignment => 
      assignment.id === assignmentId ? { ...assignment, status: 'published' as const } : assignment
    );
    
    setAssignments(updatedAssignments);
    
    toast({
      title: 'Assignment Published',
      description: 'The assignment has been published to students.',
    });
  };

  return (
    <DashboardLayout>
      <PageHeader 
        title="Assignments" 
        description="Create and manage course assignments"
        action={
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-1">
                <Plus className="h-4 w-4" /> Create Assignment
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Create New Assignment</DialogTitle>
                <DialogDescription>
                  Create a new assignment for your students.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="assignmentTitle">Assignment Title*</Label>
                  <Input
                    id="assignmentTitle"
                    placeholder="e.g., Programming Assignment 1"
                    value={newAssignment.title}
                    onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="assignmentInstructions">Instructions*</Label>
                  <Textarea
                    id="assignmentInstructions"
                    placeholder="Enter detailed instructions for the assignment"
                    value={newAssignment.instructions}
                    onChange={(e) => setNewAssignment({ ...newAssignment, instructions: e.target.value })}
                    rows={4}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="assignmentCourse">Course*</Label>
                    <Select 
                      value={newAssignment.courseId} 
                      onValueChange={(value) => setNewAssignment({ ...newAssignment, courseId: value })}
                    >
                      <SelectTrigger id="assignmentCourse">
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
                  <div className="space-y-2">
                    <Label htmlFor="assignmentDueDate">Due Date*</Label>
                    <Input
                      id="assignmentDueDate"
                      type="date"
                      value={newAssignment.dueDate}
                      onChange={(e) => setNewAssignment({ ...newAssignment, dueDate: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="assignmentPoints">Total Points</Label>
                  <Input
                    id="assignmentPoints"
                    type="number"
                    placeholder="100"
                    value={newAssignment.totalPoints}
                    onChange={(e) => setNewAssignment({ ...newAssignment, totalPoints: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="assignmentFile">Supporting Materials (Optional)</Label>
                  <Input
                    id="assignmentFile"
                    type="file"
                    onChange={handleFileChange}
                  />
                  <p className="text-xs text-muted-foreground">
                    Supported formats: PDF, DOCX, ZIP (max 100MB)
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateAssignment} className="gap-1">
                  <Upload className="h-4 w-4" /> Save as Draft
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />
      
      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Assignments</TabsTrigger>
          <TabsTrigger value="published">Published</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <AssignmentList 
            assignments={assignments} 
            isLoading={isLoading} 
            formatDate={formatDate}
            publishAssignment={publishAssignment}
          />
        </TabsContent>
        
        <TabsContent value="published">
          <AssignmentList 
            assignments={assignments.filter(assignment => assignment.status === 'published')} 
            isLoading={isLoading} 
            formatDate={formatDate}
            publishAssignment={publishAssignment}
          />
        </TabsContent>
        
        <TabsContent value="drafts">
          <AssignmentList 
            assignments={assignments.filter(assignment => assignment.status === 'draft')} 
            isLoading={isLoading} 
            formatDate={formatDate}
            publishAssignment={publishAssignment}
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
  publishAssignment: (assignmentId: string) => void;
}

const AssignmentList = ({ 
  assignments, 
  isLoading, 
  formatDate, 
  publishAssignment
}: AssignmentListProps) => {
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

  if (assignments.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No assignments found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {assignments.map((assignment) => (
        <Card key={assignment.id}>
          <CardHeader className="pb-2">
            <div className="flex justify-between">
              <div>
                <CardTitle className="text-lg">{assignment.title}</CardTitle>
                <CardDescription>{assignment.courseCode} - {assignment.courseName}</CardDescription>
              </div>
              <div>
                {assignment.status === 'draft' ? (
                  <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                    Draft
                  </span>
                ) : (
                  <span className="text-xs bg-university-100 text-university-800 px-2 py-1 rounded-full">
                    {assignment.submissions} Submissions
                  </span>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
              {assignment.instructions}
            </p>
            
            <div className="flex flex-wrap gap-x-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" /> Due: {formatDate(assignment.dueDate)}
              </span>
              <span className="flex items-center gap-1">
                <FileText className="h-4 w-4" /> {assignment.totalPoints} Points
              </span>
            </div>
          </CardContent>
          <CardFooter className="flex gap-2">
            {assignment.status === 'draft' ? (
              <>
                <Button 
                  variant="secondary" 
                  className="flex-1"
                  onClick={() => publishAssignment(assignment.id)}
                >
                  Publish
                </Button>
                <Button variant="outline" className="flex-1">
                  Edit
                </Button>
              </>
            ) : (
              <>
                <Button className="flex-1">
                  View Submissions
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

export default ProfessorAssignments;
