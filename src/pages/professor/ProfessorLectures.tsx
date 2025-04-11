
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
import { Plus, Upload, FileText, Video, Calendar, Clock } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

interface Lecture {
  id: string;
  title: string;
  description: string;
  courseId: string;
  courseCode: string;
  courseName: string;
  date: string;
  duration: string;
  type: 'video' | 'notes' | 'slides';
  status: 'draft' | 'published';
}

interface Course {
  id: string;
  code: string;
  title: string;
}

const ProfessorLectures = () => {
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [lectureType, setLectureType] = useState<'video' | 'notes' | 'slides'>('video');
  const [newLecture, setNewLecture] = useState({
    title: '',
    description: '',
    courseId: '',
    date: '',
    duration: '',
    file: null as File | null,
  });
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real app, these would be API calls
        // const lecturesResponse = await fetch('/api/professor/lectures');
        // const coursesResponse = await fetch('/api/professor/courses');
        
        // Mock courses data
        const mockCourses: Course[] = [
          { id: '1', code: 'CS101', title: 'Introduction to Computer Science' },
          { id: '2', code: 'MATH201', title: 'Calculus II' },
          { id: '3', code: 'PHYS101', title: 'Physics I' },
        ];
        
        // Mock lectures data
        const mockLectures: Lecture[] = [
          {
            id: '1',
            title: 'Introduction to Programming Concepts',
            description: 'Overview of fundamental programming concepts and paradigms.',
            courseId: '1',
            courseCode: 'CS101',
            courseName: 'Introduction to Computer Science',
            date: '2025-04-05',
            duration: '45 min',
            type: 'video',
            status: 'published',
          },
          {
            id: '2',
            title: 'Variables and Data Types',
            description: 'Exploring different variable types and data structures in programming.',
            courseId: '1',
            courseCode: 'CS101',
            courseName: 'Introduction to Computer Science',
            date: '2025-04-12',
            duration: '50 min',
            type: 'video',
            status: 'published',
          },
          {
            id: '3',
            title: 'Control Flow and Loops',
            description: 'Understanding control structures and loop mechanisms.',
            courseId: '1',
            courseCode: 'CS101',
            courseName: 'Introduction to Computer Science',
            date: '2025-04-19',
            duration: '45 min',
            type: 'video',
            status: 'draft',
          },
          {
            id: '4',
            title: 'Limits and Continuity',
            description: 'Exploring the concepts of limits and continuity in calculus.',
            courseId: '2',
            courseCode: 'MATH201',
            courseName: 'Calculus II',
            date: '2025-04-03',
            duration: '60 min',
            type: 'slides',
            status: 'published',
          },
          {
            id: '5',
            title: 'Derivatives and Applications',
            description: 'Applications of derivatives in real-world problems.',
            courseId: '2',
            courseCode: 'MATH201',
            courseName: 'Calculus II',
            date: '2025-04-10',
            duration: '55 min',
            type: 'slides',
            status: 'published',
          },
          {
            id: '6',
            title: 'Force and Motion',
            description: 'Newton\'s laws of motion and their applications.',
            courseId: '3',
            courseCode: 'PHYS101',
            courseName: 'Physics I',
            date: '2025-04-04',
            duration: '50 min',
            type: 'notes',
            status: 'published',
          },
          {
            id: '7',
            title: 'Energy and Work',
            description: 'Concepts of energy, work, and their conservation principles.',
            courseId: '3',
            courseCode: 'PHYS101',
            courseName: 'Physics I',
            date: '2025-04-11',
            duration: '45 min',
            type: 'video',
            status: 'draft',
          },
        ];
        
        setCourses(mockCourses);
        setLectures(mockLectures);
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

  const handleCreateLecture = async () => {
    if (!newLecture.title || !newLecture.courseId || !newLecture.date) {
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
      // formData.append('title', newLecture.title);
      // formData.append('description', newLecture.description);
      // formData.append('courseId', newLecture.courseId);
      // formData.append('date', newLecture.date);
      // formData.append('duration', newLecture.duration);
      // formData.append('type', lectureType);
      // if (newLecture.file) {
      //   formData.append('file', newLecture.file);
      // }
      
      // const response = await fetch('/api/courses/lectures', {
      //   method: 'POST',
      //   body: formData,
      // });
      // const data = await response.json();
      
      // Mock response
      const course = courses.find(c => c.id === newLecture.courseId);
      if (!course) {
        throw new Error('Course not found');
      }
      
      const newId = (lectures.length + 1).toString();
      const createdLecture: Lecture = {
        id: newId,
        title: newLecture.title,
        description: newLecture.description,
        courseId: newLecture.courseId,
        courseCode: course.code,
        courseName: course.title,
        date: newLecture.date,
        duration: newLecture.duration || '45 min',
        type: lectureType,
        status: 'draft',
      };
      
      setLectures([...lectures, createdLecture]);
      
      toast({
        title: 'Lecture Created',
        description: `${newLecture.title} has been created as a draft.`,
      });
      
      // Reset form
      setNewLecture({
        title: '',
        description: '',
        courseId: '',
        date: '',
        duration: '',
        file: null,
      });
      
      setIsDialogOpen(false);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create lecture',
        variant: 'destructive',
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewLecture({
        ...newLecture,
        file: e.target.files[0],
      });
    }
  };

  const publishLecture = (lectureId: string) => {
    const updatedLectures = lectures.map(lecture => 
      lecture.id === lectureId ? { ...lecture, status: 'published' } : lecture
    );
    
    setLectures(updatedLectures);
    
    toast({
      title: 'Lecture Published',
      description: 'The lecture has been published to students.',
    });
  };

  const getLectureTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'slides':
        return <FileText className="h-4 w-4" />;
      case 'notes':
        return <FileText className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <DashboardLayout>
      <PageHeader 
        title="Upload Lectures" 
        description="Upload and manage course lectures and materials"
        action={
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-1">
                <Plus className="h-4 w-4" /> Upload Lecture
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Upload New Lecture</DialogTitle>
                <DialogDescription>
                  Add a new lecture or educational material to your course.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="lectureTitle">Lecture Title*</Label>
                  <Input
                    id="lectureTitle"
                    placeholder="e.g., Introduction to Variables"
                    value={newLecture.title}
                    onChange={(e) => setNewLecture({ ...newLecture, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lectureDescription">Description</Label>
                  <Textarea
                    id="lectureDescription"
                    placeholder="Enter lecture description"
                    value={newLecture.description}
                    onChange={(e) => setNewLecture({ ...newLecture, description: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="lectureCourse">Course*</Label>
                    <Select 
                      value={newLecture.courseId} 
                      onValueChange={(value) => setNewLecture({ ...newLecture, courseId: value })}
                    >
                      <SelectTrigger id="lectureCourse">
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
                    <Label htmlFor="lectureType">Material Type</Label>
                    <Select 
                      value={lectureType} 
                      onValueChange={(value: 'video' | 'notes' | 'slides') => setLectureType(value)}
                    >
                      <SelectTrigger id="lectureType">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="video">Video Lecture</SelectItem>
                        <SelectItem value="slides">Presentation Slides</SelectItem>
                        <SelectItem value="notes">Lecture Notes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="lectureDate">Lecture Date*</Label>
                    <Input
                      id="lectureDate"
                      type="date"
                      value={newLecture.date}
                      onChange={(e) => setNewLecture({ ...newLecture, date: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lectureDuration">Duration</Label>
                    <Input
                      id="lectureDuration"
                      placeholder="e.g., 45 min"
                      value={newLecture.duration}
                      onChange={(e) => setNewLecture({ ...newLecture, duration: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lectureFile">Upload File</Label>
                  <Input
                    id="lectureFile"
                    type="file"
                    onChange={handleFileChange}
                  />
                  <p className="text-xs text-muted-foreground">
                    Supported formats: PDF, PPTX, MP4, DOC (max 500MB)
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateLecture} className="gap-1">
                  <Upload className="h-4 w-4" /> Upload as Draft
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />
      
      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Lectures</TabsTrigger>
          <TabsTrigger value="published">Published</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <LectureList 
            lectures={lectures} 
            isLoading={isLoading} 
            formatDate={formatDate}
            getLectureTypeIcon={getLectureTypeIcon}
            publishLecture={publishLecture}
          />
        </TabsContent>
        
        <TabsContent value="published">
          <LectureList 
            lectures={lectures.filter(lecture => lecture.status === 'published')} 
            isLoading={isLoading} 
            formatDate={formatDate}
            getLectureTypeIcon={getLectureTypeIcon}
            publishLecture={publishLecture}
          />
        </TabsContent>
        
        <TabsContent value="drafts">
          <LectureList 
            lectures={lectures.filter(lecture => lecture.status === 'draft')} 
            isLoading={isLoading} 
            formatDate={formatDate}
            getLectureTypeIcon={getLectureTypeIcon}
            publishLecture={publishLecture}
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
  getLectureTypeIcon: (type: string) => JSX.Element;
  publishLecture: (lectureId: string) => void;
}

const LectureList = ({ 
  lectures, 
  isLoading, 
  formatDate, 
  getLectureTypeIcon,
  publishLecture
}: LectureListProps) => {
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

  if (lectures.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No lectures found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {lectures.map((lecture) => (
        <Card key={lecture.id}>
          <CardHeader className="pb-2">
            <div className="flex justify-between">
              <div>
                <CardTitle className="text-lg">{lecture.title}</CardTitle>
                <CardDescription>{lecture.courseCode} - {lecture.courseName}</CardDescription>
              </div>
              <div>
                {lecture.status === 'draft' && (
                  <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                    Draft
                  </span>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              {lecture.description}
            </p>
            
            <div className="flex flex-wrap gap-x-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                {getLectureTypeIcon(lecture.type)}
                {lecture.type.charAt(0).toUpperCase() + lecture.type.slice(1)}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" /> {formatDate(lecture.date)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" /> {lecture.duration}
              </span>
            </div>
          </CardContent>
          <CardFooter className="flex gap-2">
            {lecture.status === 'draft' ? (
              <>
                <Button 
                  variant="secondary" 
                  className="flex-1"
                  onClick={() => publishLecture(lecture.id)}
                >
                  Publish
                </Button>
                <Button variant="outline" className="flex-1">
                  Edit
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" className="flex-1">
                  View
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

export default ProfessorLectures;
