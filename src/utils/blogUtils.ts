// Default blog image path (using your existing profile image as fallback)
export const DEFAULT_BLOG_IMAGE = `${import.meta.env.BASE_URL}images/profile.jpg`;

// Blog image paths
export const BLOG_IMAGES = {
  visualSpeech: `${import.meta.env.BASE_URL}images/blog/visual-speech.jpg`,
  reactTs: `${import.meta.env.BASE_URL}images/blog/react-ts.jpg`,
  threeJs: `${import.meta.env.BASE_URL}images/blog/threejs.jpg`,
  mlProd: `${import.meta.env.BASE_URL}images/blog/ml-prod.jpg`,
};

// Helper function to get blog image URL with fallback
export const getBlogImageUrl = (imagePath: string): string => {
  if (!imagePath || imagePath.startsWith('http')) {
    return imagePath || DEFAULT_BLOG_IMAGE;
  }
  return `${import.meta.env.BASE_URL}${imagePath.startsWith('/') ? imagePath.slice(1) : imagePath}`;
};
