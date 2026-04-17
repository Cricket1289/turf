import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="glass sticky top-0 z-50 py-4 px-6 md:px-12 flex justify-between items-center border-b border-primary/20">
      <Link to="/" className="flex items-center gap-3 group">
        <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden">
           <img 
             src="/src/assets/logo.png" 
             alt="Ottobon Logo" 
             className="w-full h-full object-cover rounded-full scale-[1.02]" 
             onError={(e) => e.target.src = "https://via.placeholder.com/32?text=B"} 
           />
        </div>
        <span className="font-sports text-2xl md:text-3xl font-black bg-gradient-to-r from-white to-primary bg-clip-text text-transparent italic tracking-widest uppercase pr-2">
          OTTOBON
        </span>
      </Link>
      
      <div className="hidden md:flex items-center gap-8 font-medium">
        <Link to="/" className="hover:text-neon transition-colors">Home</Link>
        <a href="#rules" className="hover:text-neon transition-colors">Rules</a>
        <Link to="/register" className="btn-primary py-2 px-6">Register</Link>
      </div>

      <div className="md:hidden">
        {/* Mobile menu toggle would go here */}
        <Link to="/register" className="btn-primary py-1.5 px-4 text-sm">Join Now</Link>
      </div>
    </nav>
  );
};

export default Navbar;
