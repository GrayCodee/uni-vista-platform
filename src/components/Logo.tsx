
import { GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Logo = ({ showText = true, size = 'md' }: { showText?: boolean; size?: 'sm' | 'md' | 'lg' }) => {
  const iconSize = {
    sm: 20,
    md: 24,
    lg: 32,
  }[size];

  const textSize = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  }[size];

  return (
    <Link to="/" className="flex items-center gap-2">
      <GraduationCap size={iconSize} className="text-university-600" />
      {showText && (
        <span className={`font-bold ${textSize} text-university-800`}>UniVista</span>
      )}
    </Link>
  );
};

export default Logo;
