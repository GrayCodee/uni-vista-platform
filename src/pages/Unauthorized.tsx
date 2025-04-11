
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-md w-full text-center">
        <AlertTriangle className="h-16 w-16 text-destructive mx-auto mb-6" />
        <h1 className="text-3xl font-bold mb-3">Access Denied</h1>
        <p className="text-muted-foreground mb-6">
          You don't have permission to access this page. Please contact support if you believe this is an error.
        </p>
        <div className="flex flex-col space-y-3">
          <Link to="/">
            <Button className="w-full">Return to Home</Button>
          </Link>
          <Link to="/login">
            <Button variant="outline" className="w-full">Login with a Different Account</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
