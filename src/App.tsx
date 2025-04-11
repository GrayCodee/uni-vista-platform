
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

// Pages
import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import NotFound from "@/pages/NotFound";
import Unauthorized from "@/pages/Unauthorized";

// Student Dashboard Pages
import StudentDashboard from "@/pages/student/StudentDashboard";
import StudentCourses from "@/pages/student/StudentCourses";
import StudentLectures from "@/pages/student/StudentLectures";
import StudentAssignments from "@/pages/student/StudentAssignments";
import StudentExams from "@/pages/student/StudentExams";
import StudentGrades from "@/pages/student/StudentGrades";

// Professor Dashboard Pages
import ProfessorDashboard from "@/pages/professor/ProfessorDashboard";
import ProfessorCourses from "@/pages/professor/ProfessorCourses";
import ProfessorLectures from "@/pages/professor/ProfessorLectures";
import ProfessorAssignments from "@/pages/professor/ProfessorAssignments";
import ProfessorExams from "@/pages/professor/ProfessorExams";
import ProfessorSubmissions from "@/pages/professor/ProfessorSubmissions";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            
            {/* Student Routes */}
            <Route
              path="/student/dashboard"
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <StudentDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/courses"
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <StudentCourses />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/lectures"
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <StudentLectures />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/assignments"
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <StudentAssignments />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/exams"
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <StudentExams />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/grades"
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <StudentGrades />
                </ProtectedRoute>
              }
            />
            
            {/* Professor Routes */}
            <Route
              path="/professor/dashboard"
              element={
                <ProtectedRoute allowedRoles={['professor']}>
                  <ProfessorDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/professor/courses"
              element={
                <ProtectedRoute allowedRoles={['professor']}>
                  <ProfessorCourses />
                </ProtectedRoute>
              }
            />
            <Route
              path="/professor/lectures"
              element={
                <ProtectedRoute allowedRoles={['professor']}>
                  <ProfessorLectures />
                </ProtectedRoute>
              }
            />
            <Route
              path="/professor/assignments"
              element={
                <ProtectedRoute allowedRoles={['professor']}>
                  <ProfessorAssignments />
                </ProtectedRoute>
              }
            />
            <Route
              path="/professor/exams"
              element={
                <ProtectedRoute allowedRoles={['professor']}>
                  <ProfessorExams />
                </ProtectedRoute>
              }
            />
            <Route
              path="/professor/submissions"
              element={
                <ProtectedRoute allowedRoles={['professor']}>
                  <ProfessorSubmissions />
                </ProtectedRoute>
              }
            />
            
            {/* Catch-all Not Found Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
