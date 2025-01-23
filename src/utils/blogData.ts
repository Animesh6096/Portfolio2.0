export interface BlogPost {
  _id: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  image: string;
  readTime: string;
  createdAt: string;
}

export const demoBlogs: BlogPost[] = [
  {
    _id: '1',
    title: 'Understanding Visual Speech Recognition',
    category: 'Machine Learning',
    excerpt: 'A deep dive into the challenges and solutions in lip reading technology, exploring current research and advancements in VSR systems.',
    content: `Visual Speech Recognition (VSR) has emerged as a groundbreaking technology in the field of human-computer interaction. This article explores the fundamental concepts, challenges, and recent advancements in VSR systems.

    Understanding the Basics:
    VSR, also known as lipreading, involves the interpretation of speech by analyzing visual information from the speaker's facial movements, particularly around the mouth area. Traditional approaches relied heavily on hand-crafted features, but modern deep learning techniques have revolutionized this field.

    Key Challenges:
    1. Variable Lighting Conditions: Environmental factors can significantly impact system performance
    2. Speaker Variations: Different speaking styles and facial characteristics
    3. Multi-lingual Support: Adapting to various language-specific mouth movements
    4. Temporal Dependencies: Capturing the sequential nature of speech

    Recent Advancements:
    Modern VSR systems utilize advanced architectures like:
    - Convolutional Neural Networks (CNNs) for spatial feature extraction
    - Long Short-Term Memory (LSTM) networks for temporal modeling
    - Transformer-based architectures for improved attention mechanisms

    Future Directions:
    The field is moving towards more robust, multi-modal systems that combine:
    - Audio-visual fusion techniques
    - Self-supervised learning approaches
    - Cross-lingual adaptation methods`,
    image: 'https://placehold.co/600x400/9333ea/ffffff',
    readTime: '8 min read',
    createdAt: '2024-03-15'
  },
  {
    _id: '2',
    title: 'Building Modern Web Applications',
    category: 'Web Development',
    excerpt: 'Best practices for creating responsive and accessible web interfaces using modern frameworks and tools.',
    content: `Modern web development has evolved significantly with the advent of new frameworks, tools, and best practices. This article explores the essential aspects of building contemporary web applications.

    Core Principles:
    1. Responsive Design
    - Mobile-first approach
    - Flexible grid systems
    - Adaptive imagery
    - Dynamic typography

    2. Accessibility
    - ARIA landmarks and roles
    - Keyboard navigation
    - Screen reader compatibility
    - Color contrast considerations

    Modern Architecture:
    The current landscape favors:
    - Component-based development
    - State management solutions
    - Server-side rendering
    - Static site generation

    Performance Optimization:
    Key factors include:
    - Code splitting and lazy loading
    - Asset optimization
    - Caching strategies
    - Network performance

    Development Workflow:
    Essential tools and practices:
    - Version control (Git)
    - CI/CD pipelines
    - Automated testing
    - Code quality tools`,
    image: 'https://placehold.co/600x400/9333ea/ffffff',
    readTime: '6 min read',
    createdAt: '2024-03-10'
  }
];
