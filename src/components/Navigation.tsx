import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { title: 'Profile', id: 'profile' },
    { title: 'Skills', id: 'skills' },
    { title: 'Experience', id: 'experience' },
    { title: 'Education', id: 'education' },
    { title: 'Research', id: 'research' },
    { title: 'Projects', id: 'projects' },
    { title: 'Blog', id: 'blog' },
    { title: 'Certifications', id: 'certifications' },
    { title: 'Activities', id: 'activities' },
    { title: 'Contact', id: 'contact' }
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Add offset for mobile devices to account for the header
      const offset = window.innerWidth < 640 ? 80 : 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsOpen(false);
    }
  };

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-purple-400/20 hover:bg-white/20 transition-colors sm:top-6 sm:right-6"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-6 h-6 text-purple-400" /> : <Menu className="w-6 h-6 text-purple-400" />}
      </button>

      {/* Navigation Menu - Updated for compact desktop and mobile */}
      <div
        className={`fixed top-0 right-0 h-screen w-64 sm:w-72 bg-black/95 backdrop-blur-lg z-40 transform transition-transform duration-300 ease-in-out shadow-xl ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col pt-20 px-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="py-3 px-4 text-left text-purple-300 hover:text-purple-200 hover:bg-white/5 rounded-lg transition-colors text-lg sm:text-base"
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>

      {/* Overlay - only visible on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 sm:bg-transparent sm:backdrop-blur-none"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Navigation;
