import { DEFAULT_BLOG_IMAGE } from '../utils/blogUtils';

export interface BlogPost {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  image: string;
  readTime: string;
  createdAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
}

export interface BlogQueryParams {
  page?: number;
  limit?: number;
  category?: string;
  tag?: string;
  search?: string;
}

// Demo data with detailed content
const demoBlogPosts: BlogPost[] = [
  {
    _id: '1',
    title: 'Understanding Visual Speech Recognition',
    excerpt: 'A deep dive into the challenges and solutions in lip reading technology, exploring how AI models can understand human speech through visual cues.',
    content: `
      <h2>The Evolution of Visual Speech Recognition</h2>
      <p>Visual speech recognition, also known as lip reading, has come a long way from being a human skill to becoming an AI-powered technology. With the advancement of deep learning and computer vision, we can now create systems that understand speech by analyzing lip movements with remarkable accuracy.</p>

      <h3>Key Challenges in Visual Speech Recognition</h3>
      <ul>
        <li>Variable lighting conditions affecting visual input quality</li>
        <li>Diverse speaking styles and accents</li>
        <li>Multi-view lip reading scenarios</li>
        <li>Real-time processing requirements</li>
      </ul>

      <h3>Technical Implementation</h3>
      <p>Modern visual speech recognition systems typically employ deep learning architectures like:</p>
      <ul>
        <li>Convolutional Neural Networks (CNNs) for feature extraction</li>
        <li>Recurrent Neural Networks (RNNs) for temporal modeling</li>
        <li>Attention mechanisms for focusing on relevant visual features</li>
      </ul>

      <h2>Future Directions</h2>
      <p>The field is rapidly evolving with new approaches like:</p>
      <ul>
        <li>Multi-modal fusion with audio inputs</li>
        <li>Self-supervised learning techniques</li>
        <li>Cross-language generalization</li>
      </ul>

      <p>As we continue to advance in this field, the applications of visual speech recognition will expand beyond accessibility tools to encompass security, silent communication, and human-computer interaction.</p>
    `,
    category: 'AI & Machine Learning',
    tags: ['AI', 'Computer Vision', 'Deep Learning', 'Speech Recognition'],
    image: '/images/blog/visual-speech.jpg',
    readTime: '8 min read',
    createdAt: new Date('2024-01-15').toISOString(),
  },
  {
    _id: '2',
    title: 'Building Modern Web Applications with React and TypeScript',
    excerpt: 'Explore best practices for creating robust, type-safe web applications using React and TypeScript, with a focus on performance and maintainability.',
    content: `
      <h2>Why TypeScript with React?</h2>
      <p>TypeScript has become an essential tool in modern web development, especially when building large-scale React applications. Let's explore the key benefits and implementation strategies.</p>

      <h3>Key Benefits</h3>
      <ul>
        <li>Type safety and better IDE support</li>
        <li>Enhanced code maintainability</li>
        <li>Better team collaboration</li>
        <li>Reduced runtime errors</li>
      </ul>

      <h3>Implementation Example</h3>
      <pre><code>
interface UserProps {
  name: string;
  age: number;
  email: string;
}

const UserProfile: React.FC<UserProps> = ({ name, age, email }) => {
  return (
    <div>
      <h1>{name}</h1>
      <p>Age: {age}</p>
      <p>Email: {email}</p>
    </div>
  );
};
      </code></pre>

      <h2>Performance Optimization</h2>
      <p>When building React applications, performance is crucial. Here are some key techniques:</p>
      <ul>
        <li>Implement proper code splitting</li>
        <li>Use React.memo for component memoization</li>
        <li>Optimize state management</li>
        <li>Implement efficient rendering strategies</li>
      </ul>

      <p>Remember to always measure performance impacts before implementing optimizations!</p>
    `,
    category: 'Web Development',
    tags: ['React', 'TypeScript', 'Web Development', 'Performance'],
    image: '/images/blog/react-ts.jpg',
    readTime: '10 min read',
    createdAt: new Date('2024-01-10').toISOString(),
  },
  {
    _id: '3',
    title: 'Creating Immersive 3D Experiences with Three.js',
    excerpt: 'Learn how to build engaging 3D graphics and animations for the web using Three.js, from basic scenes to complex interactive experiences.',
    content: `
      <h2>Getting Started with Three.js</h2>
      <p>Three.js is a powerful JavaScript library that makes it possible to create stunning 3D graphics in the browser. Let's explore how to create engaging 3D experiences.</p>

      <h3>Basic Setup</h3>
      <pre><code>
import * as THREE from 'three';

// Create scene
const scene = new THREE.Scene();

// Add camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Initialize renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
      </code></pre>

      <h3>Key Concepts</h3>
      <ul>
        <li>Scene setup and management</li>
        <li>Camera types and positioning</li>
        <li>Lighting and materials</li>
        <li>Animation and interaction</li>
      </ul>

      <h2>Advanced Techniques</h2>
      <p>Once you've mastered the basics, you can explore:</p>
      <ul>
        <li>Custom shaders</li>
        <li>Post-processing effects</li>
        <li>Physics simulations</li>
        <li>VR/AR integration</li>
      </ul>

      <p>The possibilities with Three.js are endless, limited only by your imagination!</p>
    `,
    category: 'Web Development',
    tags: ['3D Graphics', 'JavaScript', 'WebGL', 'Three.js'],
    image: '/images/blog/threejs.jpg',
    readTime: '12 min read',
    createdAt: new Date('2024-01-05').toISOString(),
  },
  {
    _id: '4',
    title: 'Implementing Machine Learning Models for Production',
    excerpt: 'A comprehensive guide to deploying and maintaining machine learning models in production environments, focusing on scalability and reliability.',
    content: `
      <h2>Machine Learning in Production</h2>
      <p>Deploying machine learning models to production involves much more than just training a model. Let's explore the key considerations and best practices.</p>

      <h3>Key Components</h3>
      <ul>
        <li>Model versioning and tracking</li>
        <li>Scalable inference infrastructure</li>
        <li>Monitoring and logging</li>
        <li>Performance optimization</li>
      </ul>

      <h3>Implementation Architecture</h3>
      <pre><code>
# Example FastAPI implementation
from fastapi import FastAPI
from pydantic import BaseModel
import joblib

app = FastAPI()
model = joblib.load('model.pkl')

class PredictionRequest(BaseModel):
    features: List[float]

@app.post("/predict")
async def predict(request: PredictionRequest):
    prediction = model.predict([request.features])
    return {"prediction": prediction[0]}
      </code></pre>

      <h2>Monitoring and Maintenance</h2>
      <p>Continuous monitoring is crucial for production ML systems:</p>
      <ul>
        <li>Model performance metrics</li>
        <li>Data drift detection</li>
        <li>System health monitoring</li>
        <li>Automated retraining pipelines</li>
      </ul>

      <p>Remember: A model in production is never truly "finished" - it requires continuous attention and maintenance!</p>
    `,
    category: 'AI & Machine Learning',
    tags: ['Machine Learning', 'DevOps', 'Python', 'Production'],
    image: '/images/blog/ml-prod.jpg',
    readTime: '15 min read',
    createdAt: new Date('2024-01-01').toISOString(),
  }
];

export const getAllCategories = async (): Promise<string[]> => {
  const categories = new Set(demoBlogPosts.map(post => post.category));
  return Array.from(categories);
};

export const getAllTags = async (): Promise<string[]> => {
  const tags = new Set(demoBlogPosts.flatMap(post => post.tags));
  return Array.from(tags);
};

export const getBlogPosts = async (params: BlogQueryParams = {}): Promise<PaginatedResponse<BlogPost>> => {
  const {
    page = 1,
    limit = 6,
    category,
    tag,
    search,
  } = params;

  let filteredPosts = [...demoBlogPosts];

  // Apply filters
  if (category) {
    filteredPosts = filteredPosts.filter(post => post.category === category);
  }

  if (tag) {
    filteredPosts = filteredPosts.filter(post => post.tags.includes(tag));
  }

  if (search) {
    const searchLower = search.toLowerCase();
    filteredPosts = filteredPosts.filter(post => 
      post.title.toLowerCase().includes(searchLower) ||
      post.excerpt.toLowerCase().includes(searchLower) ||
      post.content.toLowerCase().includes(searchLower) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
  }

  // Sort by date
  filteredPosts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  // Calculate pagination
  const totalItems = filteredPosts.length;
  const totalPages = Math.ceil(totalItems / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

  return {
    data: paginatedPosts,
    totalPages,
    currentPage: page,
    totalItems,
  };
};

export const createBlogPost = async (postData: Omit<BlogPost, '_id' | 'createdAt'>) => {
  const data = {
    ...postData,
    image: postData.image || DEFAULT_BLOG_IMAGE,
    readTime: postData.readTime || '5 min read',
    tags: postData.tags || [],
    createdAt: new Date().toISOString(),
  };
  demoBlogPosts.push({ _id: (demoBlogPosts.length + 1).toString(), ...data });
  return data;
};
