
import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import PageHeader from '@/components/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, TrendingUp, GraduationCap } from 'lucide-react';
import { 
  LineChart, Line, BarChart as RechartsBarChart, Bar, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { useToast } from '@/components/ui/use-toast';

interface GradeEntry {
  id: string;
  title: string;
  type: string;
  course: string;
  courseCode: string;
  date: string;
  score: number;
  totalPoints: number;
  grade: string;
  weight: number;
}

interface CourseGPA {
  courseCode: string;
  courseName: string;
  grade: string;
  gpa: number;
  semester: string;
  year: number;
}

const StudentGrades = () => {
  const [gradeEntries, setGradeEntries] = useState<GradeEntry[]>([]);
  const [courseGPAs, setCourseGPAs] = useState<CourseGPA[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSemester, setSelectedSemester] = useState<string>('all');
  const { toast } = useToast();

  useEffect(() => {
    const fetchGradeData = async () => {
      try {
        // In a real app, these would be API calls
        // const gradesResponse = await fetch('/api/grades');
        // const gpaResponse = await fetch('/api/gpa');
        
        // Mock grade entries data
        const mockGradeEntries: GradeEntry[] = [
          {
            id: '1',
            title: 'Quiz 1',
            type: 'Quiz',
            course: 'Introduction to Computer Science',
            courseCode: 'CS101',
            date: '2025-02-15',
            score: 18,
            totalPoints: 20,
            grade: 'A',
            weight: 5,
          },
          {
            id: '2',
            title: 'Midterm Exam',
            type: 'Exam',
            course: 'Introduction to Computer Science',
            courseCode: 'CS101',
            date: '2025-03-10',
            score: 88,
            totalPoints: 100,
            grade: 'B+',
            weight: 30,
          },
          {
            id: '3',
            title: 'Assignment 1',
            type: 'Assignment',
            course: 'Introduction to Computer Science',
            courseCode: 'CS101',
            date: '2025-02-20',
            score: 95,
            totalPoints: 100,
            grade: 'A',
            weight: 15,
          },
          {
            id: '4',
            title: 'Quiz 1',
            type: 'Quiz',
            course: 'Calculus II',
            courseCode: 'MATH201',
            date: '2025-02-12',
            score: 19,
            totalPoints: 20,
            grade: 'A',
            weight: 5,
          },
          {
            id: '5',
            title: 'Assignment 1',
            type: 'Assignment',
            course: 'Calculus II',
            courseCode: 'MATH201',
            date: '2025-02-25',
            score: 89,
            totalPoints: 100,
            grade: 'B+',
            weight: 15,
          },
          {
            id: '6',
            title: 'Midterm Exam',
            type: 'Exam',
            course: 'Calculus II',
            courseCode: 'MATH201',
            date: '2025-03-15',
            score: 78,
            totalPoints: 100,
            grade: 'C+',
            weight: 30,
          },
          {
            id: '7',
            title: 'Lab 1',
            type: 'Lab',
            course: 'Physics I',
            courseCode: 'PHYS101',
            date: '2025-02-10',
            score: 48,
            totalPoints: 50,
            grade: 'A',
            weight: 10,
          },
          {
            id: '8',
            title: 'Lab 2',
            type: 'Lab',
            course: 'Physics I',
            courseCode: 'PHYS101',
            date: '2025-02-24',
            score: 45,
            totalPoints: 50,
            grade: 'A-',
            weight: 10,
          },
          {
            id: '9',
            title: 'Midterm Exam',
            type: 'Exam',
            course: 'Physics I',
            courseCode: 'PHYS101',
            date: '2025-03-05',
            score: 84,
            totalPoints: 100,
            grade: 'B',
            weight: 30,
          },
        ];
        
        // Mock course GPA data
        const mockCourseGPAs: CourseGPA[] = [
          {
            courseCode: 'CS101',
            courseName: 'Introduction to Computer Science',
            grade: 'A-',
            gpa: 3.7,
            semester: 'Spring',
            year: 2025,
          },
          {
            courseCode: 'MATH201',
            courseName: 'Calculus II',
            grade: 'B',
            gpa: 3.0,
            semester: 'Spring',
            year: 2025,
          },
          {
            courseCode: 'PHYS101',
            courseName: 'Physics I',
            grade: 'B+',
            gpa: 3.3,
            semester: 'Spring',
            year: 2025,
          },
          {
            courseCode: 'ENG102',
            courseName: 'English Composition',
            grade: 'A',
            gpa: 4.0,
            semester: 'Fall',
            year: 2024,
          },
          {
            courseCode: 'HIST105',
            courseName: 'World History',
            grade: 'B+',
            gpa: 3.3,
            semester: 'Fall',
            year: 2024,
          },
        ];
        
        setGradeEntries(mockGradeEntries);
        setCourseGPAs(mockCourseGPAs);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to load grade data',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchGradeData();
  }, [toast]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getFilteredCourseGPAs = () => {
    if (selectedSemester === 'all') {
      return courseGPAs;
    }
    const [semester, year] = selectedSemester.split('-');
    return courseGPAs.filter(
      course => course.semester === semester && course.year === parseInt(year)
    );
  };

  const getSemesters = () => {
    const semesters = new Set(
      courseGPAs.map(course => `${course.semester}-${course.year}`)
    );
    return Array.from(semesters);
  };

  const calculateOverallGPA = (courses: CourseGPA[]) => {
    if (courses.length === 0) return 0;
    const totalGPA = courses.reduce((sum, course) => sum + course.gpa, 0);
    return (totalGPA / courses.length).toFixed(2);
  };

  const createGPAChartData = () => {
    const semesters = Array.from(new Set(courseGPAs.map(course => `${course.semester} ${course.year}`)));
    
    return semesters.map(semester => {
      const [semName, yearStr] = semester.split(' ');
      const year = parseInt(yearStr);
      const coursesInSemester = courseGPAs.filter(
        course => course.semester === semName && course.year === year
      );
      
      const gpa = coursesInSemester.length > 0
        ? coursesInSemester.reduce((sum, course) => sum + course.gpa, 0) / coursesInSemester.length
        : 0;
      
      return {
        name: semester,
        gpa: parseFloat(gpa.toFixed(2)),
      };
    });
  };

  const createCourseGPAChartData = (courses: CourseGPA[]) => {
    return courses.map(course => ({
      name: course.courseCode,
      gpa: course.gpa,
    }));
  };

  return (
    <DashboardLayout>
      <PageHeader 
        title="Grades & Academic Performance" 
        description="View your grades and academic progress"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-university-600" />
              Overall GPA
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-center py-4">
              {isLoading ? (
                <div className="h-10 bg-muted rounded w-1/3 mx-auto"></div>
              ) : (
                calculateOverallGPA(courseGPAs)
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-university-600" />
              GPA Trend
            </CardTitle>
            <CardDescription>Your GPA across semesters</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="h-[200px] bg-muted rounded animate-pulse"></div>
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={createGPAChartData()} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 4]} />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="gpa" 
                    stroke="#0284c7" 
                    activeDot={{ r: 8 }} 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="grades">
        <TabsList className="mb-6">
          <TabsTrigger value="grades">Recent Grades</TabsTrigger>
          <TabsTrigger value="courses">Course Grades</TabsTrigger>
        </TabsList>
        
        <TabsContent value="grades">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Assessment Grades</CardTitle>
                <CardDescription>Your recent test, assignment, and quiz scores</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="h-10 bg-muted rounded animate-pulse"></div>
                    ))}
                  </div>
                ) : gradeEntries.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left font-medium p-2">Assessment</th>
                          <th className="text-left font-medium p-2">Course</th>
                          <th className="text-left font-medium p-2">Date</th>
                          <th className="text-right font-medium p-2">Score</th>
                          <th className="text-right font-medium p-2">Grade</th>
                        </tr>
                      </thead>
                      <tbody>
                        {gradeEntries.map((entry) => (
                          <tr key={entry.id} className="border-b last:border-b-0">
                            <td className="p-2">
                              <div className="font-medium">{entry.title}</div>
                              <div className="text-xs text-muted-foreground">{entry.type}</div>
                            </td>
                            <td className="p-2 text-sm">{entry.courseCode}</td>
                            <td className="p-2 text-sm">{formatDate(entry.date)}</td>
                            <td className="p-2 text-right">
                              {entry.score}/{entry.totalPoints}
                            </td>
                            <td className="p-2 text-right font-medium">{entry.grade}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-6">
                    No grade entries available.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="courses">
          <div className="mb-6">
            <Select value={selectedSemester} onValueChange={setSelectedSemester}>
              <SelectTrigger className="w-full sm:w-[300px]">
                <SelectValue placeholder="Select semester" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Semesters</SelectItem>
                {getSemesters().map((semester) => (
                  <SelectItem key={semester} value={semester}>
                    {semester.replace('-', ' ')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <BarChart className="h-5 w-5 text-university-600" />
                  Course GPAs
                </CardTitle>
                <CardDescription>Your GPA by course</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="h-[200px] bg-muted rounded animate-pulse"></div>
                ) : (
                  <ResponsiveContainer width="100%" height={200}>
                    <RechartsBarChart data={createCourseGPAChartData(getFilteredCourseGPAs())}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 4]} />
                      <Tooltip />
                      <Bar dataKey="gpa" fill="#0284c7" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Course Grade Details</CardTitle>
                <CardDescription>Your grades for each course</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="h-10 bg-muted rounded animate-pulse"></div>
                    ))}
                  </div>
                ) : getFilteredCourseGPAs().length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left font-medium p-2">Course</th>
                          <th className="text-left font-medium p-2">Semester</th>
                          <th className="text-center font-medium p-2">Grade</th>
                          <th className="text-right font-medium p-2">GPA</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getFilteredCourseGPAs().map((course) => (
                          <tr key={course.courseCode} className="border-b last:border-b-0">
                            <td className="p-2">
                              <div className="font-medium">{course.courseCode}</div>
                              <div className="text-xs text-muted-foreground">{course.courseName}</div>
                            </td>
                            <td className="p-2 text-sm">{course.semester} {course.year}</td>
                            <td className="p-2 text-center font-medium">{course.grade}</td>
                            <td className="p-2 text-right">{course.gpa.toFixed(1)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-6">
                    No course data available for the selected semester.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default StudentGrades;
