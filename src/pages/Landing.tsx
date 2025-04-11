
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import { BookOpen, GraduationCap, BookMarked, Users, Trophy } from 'lucide-react';

const features = [
  {
    icon: <BookOpen className="h-10 w-10 text-university-500" />,
    title: 'Comprehensive Courses',
    description: 'Access a wide range of courses designed to meet your educational needs.'
  },
  {
    icon: <GraduationCap className="h-10 w-10 text-university-500" />,
    title: 'Expert Faculty',
    description: 'Learn from industry experts and accomplished academics in their fields.'
  },
  {
    icon: <BookMarked className="h-10 w-10 text-university-500" />,
    title: 'Interactive Learning',
    description: 'Engage with interactive content and real-time feedback.'
  },
  {
    icon: <Users className="h-10 w-10 text-university-500" />,
    title: 'Community Support',
    description: 'Join a vibrant community of learners and educators.'
  },
];

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-university-50 to-university-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-university-900 mb-6">
              Welcome to UniVista
            </h1>
            <p className="text-xl md:text-2xl text-university-700 mb-8">
              Empowering education through innovation and excellence
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/register">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="hidden lg:block absolute top-1/2 left-10 transform -translate-y-1/2">
          <GraduationCap className="h-24 w-24 text-university-200" />
        </div>
        <div className="hidden lg:block absolute top-1/3 right-10 transform -translate-y-1/2">
          <Trophy className="h-16 w-16 text-university-200" />
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-university-900 mb-4">
              Why Choose UniVista
            </h2>
            <p className="text-lg text-university-600 max-w-2xl mx-auto">
              Our platform offers everything you need for a successful learning journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center text-center p-6 bg-white rounded-lg border border-gray-100 shadow-sm transition-all hover:shadow-md"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-university-800">{feature.title}</h3>
                <p className="text-university-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-university-800 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Start Learning?</h2>
            <p className="text-lg text-university-100 mb-8">
              Join thousands of students and professors already using our platform.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/register">
                <Button size="lg" variant="default" className="w-full sm:w-auto bg-white text-university-800 hover:bg-university-100">
                  Sign Up Now
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-university-700">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 bg-university-950 text-university-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Link to="/" className="flex items-center gap-2">
                <GraduationCap size={24} className="text-university-400" />
                <span className="font-bold text-xl text-white">UniVista</span>
              </Link>
            </div>
            <div className="text-sm">
              &copy; {new Date().getFullYear()} UniVista. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
