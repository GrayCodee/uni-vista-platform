
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Search, Plus, Users, Clock, BookOpen } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface Course {
  id: string;
  code: string;
  title: string;
  description: string;
  studentCount: number;
  lectureCount: number;
  assignmentCount: number;
  nextLecture?: string;
}

const ProfessorCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newCourse, setNewCourse] = useState({
    code: '',
    title: '',
    description: '',
  });
  const { toast } = useToast();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await fetch('/api/professor/courses');
        // const data = await response.json();
        
        // Mock data
        const mockCourses: Course[] = [
          {
            id: '1',
            code: 'CS101',
            title: 'Introduction to Computer Science',
            description: 'An introductory course covering fundamental concepts of computer science and programming.',
            studentCount: 45,
            lectureCount: 8,
            assignmentCount: 3,
            nextLecture: '2025-04-15 10:00 AM',
          },
          {
            id: '2',
            code: 'MATH201',
            title: 'Calculus II',
            description: 'A continuation of Calculus I, covering integration, applications of integration, and infinite series.',
            studentCount: 32,
            lectureCount: 10,
            assignmentCount: 5,
            nextLecture: '2025-04-14 1:00 PM',
          },
          {
            id: '3',
            code: 'PHYS101',
            title: 'Physics I',
            description: 'An introduction to classical mechanics, including kinematics, dynamics, and conservation laws.',
            studentCount: 38,
            lectureCount: 7,
            assignmentCount: 4,
            nextLecture: '2025-04-16 11:30 AM',
          },
        ];
        
        setCourses(mockCourses);
        setFilteredCourses(mockCourses);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to load courses',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCourses();
  }, [toast]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredCourses(courses);
    } else {
      const filtered = courses.filter(
        (course) =>
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.code.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCourses(filtered);
    }
  }, [searchQuery, courses]);

  const handleCreateCourse = async () => {
    if (!newCourse.code || !newCourse.title) {
      toast({
        title: 'Missing Fields',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }
    
    try {
      // In a real app, this would be an API call
      // const response = await fetch('/api/professor/courses', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(newCourse),
      // });
      // const data = await response.json();
      
      // Mock response
      const newId = (courses.length + 1).toString();
      const createdCourse: Course = {
        id: newId,
        code: newCourse.code,
        title: newCourse.title,
        description: newCourse.description,
        studentCount: 0,
        lectureCount: 0,
        assignmentCount: 0,
      };
      
      setCourses([...courses, createdCourse]);
      
      toast({
        title: 'Course Created',
        description: `${newCourse.code} - ${newCourse.title} has been created successfully.`,
      });
      
      // Reset form
      setNewCourse({
        code: '',
        title: '',
        description: '',
      });
      
      setIsDialogOpen(false);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create course',
        variant: 'destructive',
      });
    }
  };

  const formatDateTime = (dateTimeString?: string) => {
    if (!dateTimeString) return 'No scheduled lectures';
    
    const dateTime = new Date(dateTimeString);
    const options: Intl.DateTimeFormatOptions = { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit'
    };
    
    return dateTime.toLocaleString(undefined, options);
  };

  return (
    <DashboardLayout>
      <PageHeader 
        title="My Courses" 
        description="Manage your courses and teaching materials"
        action={
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-1">
                <Plus className="h-4 w-4" /> Create Course
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Course</DialogTitle>
                <DialogDescription>
                  Add a new course to your teaching schedule.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="courseCode">Course Code*</Label>
                  <Input
                    id="courseCode"
                    placeholder="e.g., CS101"
                    value={newCourse.code}
                    onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="courseTitle">Course Title*</Label>
                  <Input
                    id="courseTitle"
                    placeholder="e.g., Introduction to Computer Science"
                    value={newCourse.title}
                    onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="courseDescription">Description</Label>
                  <Textarea
                    id="courseDescription"
                    placeholder="Enter course description"
                    value={newCourse.description}
                    onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateCourse}>
                  Create Course
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />
      
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-4 bg-muted rounded w-1/4 mb-2"></div>
                <div className="h-6 bg-muted rounded w-3/4"></div>
              </CardHeader>
              <CardContent>
                <div className="h-4 bg-muted rounded w-full mb-4"></div>
                <div className="h-4 bg-muted rounded w-2/3"></div>
              </CardContent>
              <CardFooter>
                <div className="h-9 bg-muted rounded w-full"></div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{course.title}</CardTitle>
                <CardDescription>{course.code}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {course.description}
                </p>
                
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{course.studentCount} Students</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <BookOpen className="h-4 w-4" />
                    <span>{course.lectureCount} Lectures</span>
                  </div>
                </div>
                
                <div className="mt-4 text-sm">
                  <div className="flex items-center gap-1 text-university-700">
                    <Clock className="h-4 w-4" />
                    <span>Next: {formatDateTime(course.nextLecture)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link to={`/professor/courses/${course.id}`} className="w-full">
                  <Button variant="outline" className="w-full">
                    Manage Course
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No courses found matching your search.</p>
        </div>
      )}
    </DashboardLayout>
  );
};

export default ProfessorCourses;
