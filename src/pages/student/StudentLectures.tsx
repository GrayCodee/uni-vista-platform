
import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import PageHeader from '@/components/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play, Download, Clock, FileText } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface Lecture {
  id: string;
  title: string;
  courseCode: string;
  courseName: string;
  instructor: string;
  date: string;
  duration: string;
  type: 'video' | 'notes' | 'slides';
  watched?: boolean;
}

const StudentLectures = () => {
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState<string>('all');
  const { toast } = useToast();

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await fetch('/api/courses/lectures');
        // const data = await response.json();
        
        // Mock data
        const mockLectures: Lecture[] = [
          {
            id: '1',
            title: 'Introduction to Programming Concepts',
            courseCode: 'CS101',
            courseName: 'Introduction to Computer Science',
            instructor: 'Dr. John Smith',
            date: '2025-04-05',
            duration: '45 min',
            type: 'video',
            watched: true,
          },
          {
            id: '2',
            title: 'Variables and Data Types',
            courseCode: 'CS101',
            courseName: 'Introduction to Computer Science',
            instructor: 'Dr. John Smith',
            date: '2025-04-07',
            duration: '50 min',
            type: 'video',
            watched: true,
          },
          {
            id: '3',
            title: 'Control Flow and Loops',
            courseCode: 'CS101',
            courseName: 'Introduction to Computer Science',
            instructor: 'Dr. John Smith',
            date: '2025-04-10',
            duration: '55 min',
            type: 'video',
            watched: false,
          },
          {
            id: '4',
            title: 'Limits and Continuity',
            courseCode: 'MATH201',
            courseName: 'Calculus II',
            instructor: 'Dr. Emily Johnson',
            date: '2025-04-03',
            duration: '60 min',
            type: 'video',
            watched: true,
          },
          {
            id: '5',
            title: 'Derivatives and Applications',
            courseCode: 'MATH201',
            courseName: 'Calculus II',
            instructor: 'Dr. Emily Johnson',
            date: '2025-04-06',
            duration: '50 min',
            type: 'video',
            watched: true,
          },
          {
            id: '6',
            title: 'Integrals Introduction',
            courseCode: 'MATH201',
            courseName: 'Calculus II',
            instructor: 'Dr. Emily Johnson',
            date: '2025-04-08',
            duration: '65 min',
            type: 'video',
            watched: false,
          },
          {
            id: '7',
            title: 'Force and Motion',
            courseCode: 'PHYS101',
            courseName: 'Physics I',
            instructor: 'Dr. Michael Brown',
            date: '2025-04-04',
            duration: '55 min',
            type: 'video',
            watched: true,
          },
          {
            id: '8',
            title: 'Energy and Work',
            courseCode: 'PHYS101',
            courseName: 'Physics I',
            instructor: 'Dr. Michael Brown',
            date: '2025-04-09',
            duration: '50 min',
            type: 'video',
            watched: false,
          },
        ];
        
        setLectures(mockLectures);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to load lectures',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchLectures();
  }, [toast]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getFilteredLectures = () => {
    if (selectedCourse === 'all') {
      return lectures;
    }
    return lectures.filter(lecture => lecture.courseCode === selectedCourse);
  };

  const getUniqueCourses = () => {
    const courseCodes = new Set(lectures.map(lecture => lecture.courseCode));
    return Array.from(courseCodes).map(code => {
      const course = lectures.find(lecture => lecture.courseCode === code);
      return {
        code,
        name: course?.courseName || '',
      };
    });
  };

  return (
    <DashboardLayout>
      <PageHeader 
        title="Lectures" 
        description="Access your course lectures and materials"
      />
      
      <div className="mb-6">
        <Select value={selectedCourse} onValueChange={setSelectedCourse}>
          <SelectTrigger className="w-full sm:w-[300px]">
            <SelectValue placeholder="Filter by course" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Courses</SelectItem>
            {getUniqueCourses().map(course => (
              <SelectItem key={course.code} value={course.code}>
                {course.code} - {course.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Lectures</TabsTrigger>
          <TabsTrigger value="unwatched">Unwatched</TabsTrigger>
          <TabsTrigger value="watched">Watched</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <LectureList 
            lectures={getFilteredLectures()} 
            isLoading={isLoading} 
            formatDate={formatDate}
          />
        </TabsContent>
        
        <TabsContent value="unwatched">
          <LectureList 
            lectures={getFilteredLectures().filter(lecture => !lecture.watched)} 
            isLoading={isLoading} 
            formatDate={formatDate}
          />
        </TabsContent>
        
        <TabsContent value="watched">
          <LectureList 
            lectures={getFilteredLectures().filter(lecture => lecture.watched)} 
            isLoading={isLoading} 
            formatDate={formatDate}
          />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

interface LectureListProps {
  lectures: Lecture[];
  isLoading: boolean;
  formatDate: (date: string) => string;
}

const LectureList = ({ lectures, isLoading, formatDate }: LectureListProps) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-2">
              <div className="h-5 bg-muted rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-4 bg-muted rounded w-full mb-4"></div>
              <div className="flex justify-between">
                <div className="h-9 bg-muted rounded w-1/4"></div>
                <div className="h-9 bg-muted rounded w-1/4"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (lectures.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No lectures found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {lectures.map((lecture) => (
        <Card key={lecture.id}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">{lecture.title}</CardTitle>
                <CardDescription>{lecture.courseCode} - {lecture.courseName}</CardDescription>
              </div>
              {lecture.watched && (
                <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">
                  Watched
                </span>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground mb-4 flex flex-wrap gap-x-6">
              <span className="flex items-center gap-1">
                <FileText className="h-4 w-4" /> {lecture.instructor}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" /> {lecture.duration}
              </span>
              <span>{formatDate(lecture.date)}</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button size="sm" className="gap-1">
                <Play className="h-4 w-4" /> Watch Lecture
              </Button>
              <Button size="sm" variant="outline" className="gap-1">
                <Download className="h-4 w-4" /> Download
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StudentLectures;
