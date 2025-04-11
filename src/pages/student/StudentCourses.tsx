
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

interface Course {
  id: string;
  code: string;
  title: string;
  instructor: string;
  credits: number;
  status: 'ongoing' | 'upcoming' | 'completed';
  progress: number;
}

const StudentCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await fetch('/api/courses');
        // const data = await response.json();
        
        // Mock data
        const mockCourses: Course[] = [
          {
            id: '1',
            code: 'CS101',
            title: 'Introduction to Computer Science',
            instructor: 'Dr. John Smith',
            credits: 3,
            status: 'ongoing',
            progress: 65,
          },
          {
            id: '2',
            code: 'MATH201',
            title: 'Calculus II',
            instructor: 'Dr. Emily Johnson',
            credits: 4,
            status: 'ongoing',
            progress: 45,
          },
          {
            id: '3',
            code: 'PHYS101',
            title: 'Physics I',
            instructor: 'Dr. Michael Brown',
            credits: 4,
            status: 'ongoing',
            progress: 75,
          },
          {
            id: '4',
            code: 'ENG102',
            title: 'English Composition',
            instructor: 'Prof. Sarah Wilson',
            credits: 3,
            status: 'completed',
            progress: 100,
          },
          {
            id: '5',
            code: 'HIST105',
            title: 'World History',
            instructor: 'Dr. Robert Davis',
            credits: 3,
            status: 'completed',
            progress: 100,
          },
          {
            id: '6',
            code: 'BIO201',
            title: 'Biology II',
            instructor: 'Dr. Lisa Martinez',
            credits: 4,
            status: 'upcoming',
            progress: 0,
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
          course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCourses(filtered);
    }
  }, [searchQuery, courses]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ongoing':
        return <Badge className="bg-university-600">Ongoing</Badge>;
      case 'upcoming':
        return <Badge variant="outline" className="text-university-700 border-university-300">Upcoming</Badge>;
      case 'completed':
        return <Badge variant="secondary">Completed</Badge>;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <PageHeader 
        title="My Courses" 
        description="View and manage your enrolled courses"
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
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-4 bg-muted rounded w-1/4 mb-2"></div>
                <div className="h-6 bg-muted rounded w-3/4"></div>
              </CardHeader>
              <CardContent>
                <div className="h-4 bg-muted rounded w-1/2 mb-4"></div>
                <div className="h-4 bg-muted rounded w-full"></div>
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
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    <CardDescription>{course.code} • {course.credits} Credits</CardDescription>
                  </div>
                  {getStatusBadge(course.status)}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Instructor: {course.instructor}
                </p>
                
                {course.status !== 'upcoming' && (
                  <div className="w-full bg-secondary rounded-full h-2 mb-1">
                    <div 
                      className="bg-university-600 h-2 rounded-full" 
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                )}
                
                <div className="text-xs text-right text-muted-foreground">
                  {course.status === 'upcoming' ? 'Starts Soon' : `${course.progress}% Complete`}
                </div>
              </CardContent>
              <CardFooter>
                <Link to={`/student/courses/${course.id}`} className="w-full">
                  <Button variant="outline" className="w-full">
                    View Course
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

export default StudentCourses;
