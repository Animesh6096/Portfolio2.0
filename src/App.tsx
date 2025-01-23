import { useEffect, useState } from 'react';
// Update the imports to include Facebook icon
import { Github, Linkedin, Facebook, Code, BookOpen, Briefcase, Camera, Heart, Phone, Mail, Plus } from 'lucide-react';
import LoadingScreen from './components/LoadingScreen';
import BackToTop from './components/BackToTop';
import { Link } from 'react-router-dom';
import Background3D from './components/Background3D';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    // Handle initial loading
    const loadTimer = setTimeout(() => {
      setIsLoading(false);
      // Show content immediately after loading
      requestAnimationFrame(() => {
        setContentVisible(true);
      });
    }, 600);

    return () => clearTimeout(loadTimer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.intersectionRatio > 0) {
            entry.target.classList.add('visible');
          } else {
            entry.target.classList.remove('visible');
          }
        });
      }, { 
        threshold: [0, 0.1],
        rootMargin: '50px 0px -10% 0px'
      });

      document.querySelectorAll('.animate-on-scroll').forEach((element) => {
        observer.observe(element);
      });

      return () => observer.disconnect();
    }
  }, [isLoading]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Background3D />
      {/* Reduce the opacity of the grid background to make 3D more visible */}
      <div className="grid-background opacity-20">
        {/* Static Background Layer */}
        <div className="grid-background">
          {/* Main glows */}
          <div className="purple-glow -z-30 top-0 left-0 w-[800px] h-[800px] opacity-70"></div>
          <div className="purple-glow -z-30 bottom-0 right-0 w-[800px] h-[800px] opacity-70"></div>
          <div className="purple-glow -z-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] opacity-60"></div>
          
          {/* Additional glows */}
          <div className="purple-glow -z-30 top-1/4 right-1/4 w-[600px] h-[600px] opacity-50"></div>
          <div className="purple-glow -z-30 bottom-1/4 left-1/4 w-[600px] h-[600px] opacity-50"></div>
        </div>
      </div>

      <div className="gradient-overlay opacity-80 -z-20"></div>
      <div className="vignette opacity-80 -z-10"></div>

      {/* Content Layer */}
      <div className="relative min-h-screen bg-transparent">
        <BackToTop />
        
        {/* Main Content */}
        <div className={`relative z-10 container mx-auto px-4 sm:px-8 py-12 sm:py-20 max-w-7xl ${contentVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
          {/* Header Section */}
          <div className="text-center mb-20 animate-on-scroll">
            <div className="relative w-32 h-32 mx-auto mb-6">
              <div className="profile-ring absolute -inset-3"></div>
              <div className="absolute -inset-1 rounded-full bg-purple-500/10 blur-md"></div>
              <div className="relative z-10 w-full h-full rounded-full overflow-hidden border-4 border-purple-400/50">
                <img
                  src="src/IMG_6463 (1) (1).jpg"
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-2 animate-gradient">
              Animesh Bhattacharjee
            </h1>
            <p className="text-xl text-gray-300 mb-4">Computer Science Student @ BRAC University</p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 text-gray-300">
              <a
                href="tel:+8801781836541"
                className="w-64 h-12 flex items-center justify-center gap-2 rounded-lg bg-white/5 backdrop-blur-sm border border-purple-400/20 hover:border-purple-400/40 transition-colors group"
              >
                <Phone className="w-5 h-5 text-purple-400 group-hover:text-purple-300" />
                <span className="text-purple-400 group-hover:text-purple-300 text-sm">  +880 178 183 6541  </span>
              </a>
              <a
                href="mailto:banimesh2002@gmail.com"
                className="w-64 h-12 flex items-center justify-center gap-2 rounded-lg bg-white/5 backdrop-blur-sm border border-purple-400/20 hover:border-purple-400/40 transition-colors group"
              >
                <Mail className="w-5 h-5 text-purple-400 group-hover:text-purple-300" />
                <span className="text-purple-400 group-hover:text-purple-300 text-sm">banimesh2002@gmail.com</span>
              </a>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              <a href="https://github.com/Animesh6096" className="text-purple-400 hover:text-purple-300 transition-colors">
                <Github className="w-6 h-6" />
              </a>
              <a href="https://linkedin.com/in/animesh-bhattacharjee-jhalok/" className="text-purple-400 hover:text-purple-300 transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="https://www.facebook.com/animesh.bhattacharjee.6096" className="text-purple-400 hover:text-purple-300 transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* About Section */}
          <div className="mb-20 animate-on-scroll delay-200">
            <h2 className="text-3xl font-semibold mb-6 bg-gradient-to-r from-purple-300 to-purple-500 text-transparent bg-clip-text">Profile</h2>
            <p className="text-gray-300 leading-relaxed">
              A Computer Science student at BRAC University, driven by the transformative power of technology. My studies equip me with
              the skills to make a real impact. Thriving in both technical and creative roles at Nyntax as a QA Manager, I honed my ability to
              ensure flawless user experiences through rigorous testing. Alongside my technical expertise, my teaching experience has
              strengthened my ability to communicate complex ideas effectively. This, along with my insatiable curiosity, fuels my
              fascination with machine learning.
            </p>
          </div>

          {/* Skills Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 animate-on-scroll delay-300">
            <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-purple-400/20 card-zoom">
              <Code className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-purple-300 to-purple-500 text-transparent bg-clip-text">Development</h3>
              <p className="text-gray-300">Django, React, Flask (Learning)</p>
            </div>
            <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-purple-400/20 card-zoom">
              <BookOpen className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-purple-300 to-purple-500 text-transparent bg-clip-text">Programming</h3>
              <p className="text-gray-300">Python, C, Javascript<br />MySQL, TensorFlow, MediaPipe</p>
            </div>
            <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-purple-400/20 card-zoom">
              <Camera className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-purple-300 to-purple-500 text-transparent bg-clip-text">Design</h3>
              <p className="text-gray-300">Adobe Illustrator<br />Adobe Photoshop</p>
            </div>
          </div>

          {/* Professional Experience Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-semibold mb-8 bg-gradient-to-r from-purple-300 to-purple-500 text-transparent bg-clip-text flex items-center gap-3 animate-on-scroll delay-400">
              <Briefcase className="w-8 h-8 text-purple-400" />
              Professional Experience
            </h2>
            <div className="space-y-8">
              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl card-zoom animate-on-scroll delay-400">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-purple-300 to-purple-500 text-transparent bg-clip-text">Quality Assurance and Content Manager</h3>
                    <p className="text-gray-400">
                      <a 
                        href="https://nyntax.com" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="hover:text-purple-300 transition-colors"
                      >
                        NYNTAX
                      </a>
                    </p>
                  </div>
                  <span className="text-gray-400">February 2023 - Present</span>
                </div>
                <ul className="text-gray-300 list-disc list-inside space-y-2">
                  <li>Conduct comprehensive testing for mobile apps and websites, identifying and documenting bugs for prompt resolution</li>
                  <li>Offer valuable design enhancement suggestions to optimize user experience</li>
                  <li>Apply Photoshop and Illustrator skills to edit and enhance images for app and website content</li>
                </ul>
              </div>
              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl card-zoom animate-on-scroll delay-500">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-purple-300 to-purple-500 text-transparent bg-clip-text">Teaching & Mentorship</h3>
                    <p className="text-gray-400">Pangeree Coaching & Limon Education Care</p>
                  </div>
                  <span className="text-gray-400">Sirajganj</span>
                </div>
                <ul className="text-gray-300 list-disc list-inside space-y-2">
                  <li>Taught Physics to classes 9 and 10 for six months, focusing on simplifying concepts and improving results</li>
                  <li>Currently mentoring students with a collaborative and personalized teaching approach</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Education Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-semibold mb-8 bg-gradient-to-r from-purple-300 to-purple-500 text-transparent bg-clip-text animate-on-scroll delay-400">Education</h2>
            <div className="space-y-8">
              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl card-zoom animate-on-scroll delay-500">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-purple-300 to-purple-500 text-transparent bg-clip-text">Bachelor of Science in Computer Science</h3>
                    <p className="text-gray-400">BRAC University, Dhaka</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400">Graduating September 2025</p>
                    <p className="text-purple-400">CGPA: 3.54</p>
                  </div>
                </div>
                <p className="text-gray-300 mt-4">
                  Relevent coursework: Digital Logic Design, OOP, Data Structure, Algorithms, Database Management System,
                  Operating System, Image Processing, Computer Vision and more.
                </p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl card-zoom animate-on-scroll delay-600">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-purple-300 to-purple-500 text-transparent bg-clip-text">Higher Secondary School</h3>
                    <p className="text-gray-400">Notre Dame College, Dhaka</p>
                  </div>
                  <p className="text-purple-400">GPA: 5.00</p>
                </div>
              </div>
            </div>
          </div>

          {/* Research Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-semibold mb-8 bg-gradient-to-r from-purple-300 to-purple-500 text-transparent bg-clip-text flex items-center gap-3 animate-on-scroll delay-400">
              <Code className="w-8 h-8 text-purple-400" />
              Research
            </h2>
            <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm card-zoom animate-on-scroll delay-500">
              <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-purple-300 to-purple-500 text-transparent bg-clip-text">Adaptive Self-Supervision for Cross-Language Generalization</h3>
              <p className="text-gray-400 mb-4">CSE400: Thesis - Multilingual Conformer-Based Visual Speech Recognition</p>
              <p className="text-gray-300 mb-4">
                Developing a language-agnostic system for real-time multilingual lip reading, addressing challenges in
                language dependency and adaptability in low-resource settings. The research focuses on:
              </p>
              <ul className="text-gray-300 list-disc list-inside space-y-2 mb-4">
                <li>Implementing self-supervised learning techniques for improved cross-language generalization</li>
                <li>Utilizing Conformer architecture for enhanced temporal and spatial feature extraction</li>
                <li>Developing adaptive training strategies for multilingual scenarios</li>
                <li>Creating a robust evaluation framework for low-resource languages</li>
              </ul>
              <div className="flex gap-4">
                <a href="https://github.com/yourusername/thesis-project" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors">
                  <Github className="w-5 h-5" />
                  <span>View Repository</span>
                </a>
              </div>
            </div>
          </div>

          {/* Projects Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-semibold mb-8 bg-gradient-to-r from-purple-300 to-purple-500 text-transparent bg-clip-text animate-on-scroll delay-600">Academic Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {/* Animal Detection Project - Listed First */}
              <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm card-zoom animate-on-scroll delay-700">
                <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-purple-300 to-purple-500 text-transparent bg-clip-text">Animal Detection Project</h3>
                <ul className="text-gray-300 list-disc list-inside space-y-2 mb-4">
                  <li>Worked in a team of five members to build a machine learning model</li>
                  <li>Implemented computer vision techniques for animal detection</li>
                  <li>Used TensorFlow and OpenCV for image processing and model training</li>
                </ul>
                <div className="flex gap-4">
                  <a 
                    href="https://github.com/Animesh6096/Animal-Detection" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    <Github className="w-5 h-5" />
                    <span>View Repository</span>
                  </a>
                </div>
              </div>

              {/* Hire Me Project */}
              <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm card-zoom animate-on-scroll delay-700">
                <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-purple-300 to-purple-500 text-transparent bg-clip-text">Hire Me - Job Portal</h3>
                <ul className="text-gray-300 list-disc list-inside space-y-2 mb-4">
                  <li>Developed a full-stack recruiting platform connecting job seekers and recruiters</li>
                  <li>Built RESTful API backend using Flask and frontend using React</li>
                  <li>Implemented job search, posting, and application tracking features</li>
                  <li>Integrated real-time messaging system for recruiter-candidate communication</li>
                </ul>
                <div className="flex gap-4">
                  <a 
                    href="https://github.com/Animesh6096/Hire_me" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    <Github className="w-5 h-5" />
                    <span>View Repository</span>
                  </a>
                </div>
              </div>

              {/* ReadVenture Project */}
              <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm card-zoom animate-on-scroll delay-700">
                <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-purple-300 to-purple-500 text-transparent bg-clip-text">ReadVenture</h3>
                <ul className="text-gray-300 list-disc list-inside space-y-2 mb-4">
                  <li>Built a book swapping platform with a team of five members</li>
                  <li>Designed schema, ER, EER diagram and implemented database management</li>
                  <li>Built a web interface using Django</li>
                </ul>
                <div className="flex gap-4">
                  <a 
                    href="https://github.com/Animesh6096/ReadVenture-Old" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    <Github className="w-5 h-5" />
                    <span>View Repository</span>
                  </a>
                </div>
              </div>
              
              {/* LipRead Project */}
              <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm card-zoom animate-on-scroll delay-800">
                <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-purple-300 to-purple-500 text-transparent bg-clip-text">LipRead CSE439</h3>
                <ul className="text-gray-300 list-disc list-inside space-y-2 mb-4">
                  <li>Used LipNet architecture to train a model for lip movement reading</li>
                  <li>Curated the GRID Corpus Dataset for training and validation</li>
                  <li>Built an interface using tkinter for video input and predictions</li>
                </ul>
                <div className="flex gap-4">
                  <a 
                    href="https://github.com/Animesh6096/Lipread-CSE439" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    <Github className="w-5 h-5" />
                    <span>View Repository</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Blog Section */}
          <div className="mb-20">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-semibold bg-gradient-to-r from-purple-300 to-purple-500 text-transparent bg-clip-text flex items-center gap-3 animate-on-scroll delay-400">
                <BookOpen className="w-8 h-8 text-purple-400" />
                Technical Blog
              </h2>
              <Link
                to="/blog/admin"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 transition-colors text-purple-300"
              >
                <span>Create Post</span>
                <Plus className="w-5 h-5" />
              </Link>
            </div>
            
            {/* Blog Preview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Link 
                to="/blog/1" 
                className="p-6 rounded-xl bg-white/5 backdrop-blur-sm card-zoom animate-on-scroll delay-500 group"
              >
                <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-purple-300 to-purple-500 text-transparent bg-clip-text">
                  Understanding Visual Speech Recognition
                </h3>
                <p className="text-gray-400 mb-4">
                  A deep dive into the challenges and solutions in lip reading technology
                </p>
                <div className="inline-flex items-center gap-2 text-purple-400 group-hover:text-purple-300 transition-colors">
                  <span>Read More</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>

              <Link 
                to="/blog/2" 
                className="p-6 rounded-xl bg-white/5 backdrop-blur-sm card-zoom animate-on-scroll delay-600 group"
              >
                <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-purple-300 to-purple-500 text-transparent bg-clip-text">
                  Building Modern Web Applications
                </h3>
                <p className="text-gray-400 mb-4">
                  Best practices for creating responsive and accessible web interfaces
                </p>
                <div className="inline-flex items-center gap-2 text-purple-400 group-hover:text-purple-300 transition-colors">
                  <span>Read More</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            </div>

            {/* See More Button */}
            <div className="text-center animate-on-scroll delay-700">
              <Link
                to="/blog"
                className="inline-block px-6 py-3 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 transition-colors text-purple-300 font-medium"
              >
                See More Posts →
              </Link>
            </div>
          </div>

          {/* Certifications Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-semibold mb-8 bg-gradient-to-r from-purple-300 to-purple-500 text-transparent bg-clip-text flex items-center gap-3 animate-on-scroll delay-400">
              <Code className="w-8 h-8 text-purple-400" />
              Certifications & Courses
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm card-zoom animate-on-scroll delay-500">
                <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-purple-300 to-purple-500 text-transparent bg-clip-text">Machine Learning A-Z™</h3>
                <p className="text-gray-400">Udemy</p>
                <p className="text-gray-300 mt-2">Comprehensive course covering machine learning algorithms, data preprocessing, and model evaluation techniques</p>
              </div>
              <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm card-zoom animate-on-scroll delay-500">
                <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-purple-300 to-purple-500 text-transparent bg-clip-text">App Development</h3>
                <p className="text-gray-400">BRAC University TARC</p>
                <p className="text-gray-300 mt-2">Completed intensive training in Figma design, Dart programming, and Flutter app development using Android Studio</p>
              </div>
            </div>
          </div>

          {/* Activities Section */}
          <div className="mb-20"></div>
          {/* Activities Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-semibold mb-8 bg-gradient-to-r from-purple-300 to-purple-500 text-transparent bg-clip-text flex items-center gap-3 animate-on-scroll delay-400">
              <Heart className="w-8 h-8 text-purple-400" />
              Activities
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm card-zoom animate-on-scroll delay-500">
                <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-purple-300 to-purple-500 text-transparent bg-clip-text">Executive of Marketing and Design</h3>
                <p className="text-gray-400">BRAC University Art and Photography Society</p>
              </div>
              <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm card-zoom animate-on-scroll delay-600">
                <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-purple-300 to-purple-500 text-transparent bg-clip-text">Volunteer</h3>
                <p className="text-gray-400">OCA (Office of Co-curricular Activities)<br />BRAC University</p>
                <p className="text-gray-400">April, 2023 - Present</p>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="text-center mt-32">
            <h2 className="text-3xl font-semibold mb-6 bg-gradient-to-r from-purple-300 to-purple-500 text-transparent bg-clip-text animate-on-scroll delay-400">Get In Touch</h2>
            <p className="text-gray-300 mb-8 text-lg animate-on-scroll delay-500">
              Interested in collaboration? Let's connect and discuss opportunities!
            </p>
            <a 
              href="mailto:banimesh2002@gmail.com" 
              className="inline-block px-10 py-4 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 hover:opacity-90 transition-opacity text-white font-semibold shadow-lg shadow-purple-500/25 text-lg animate-on-scroll delay-600"
            >
              Contact Me
            </a>
          </div>

        </div>
      </div>
    </>
  );
}

export default App;