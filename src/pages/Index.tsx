
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Navigate to the landing page
    navigate('/', { replace: true });
  }, [navigate]);

  return null;
};

export default Index;
