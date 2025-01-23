export const DEFAULT_BLOG_IMAGE = 'https://placehold.co/600x400/9333ea/ffffff';

export const getImageUrl = (imageUrl: string | undefined): string => {
  if (!imageUrl || imageUrl.includes('via.placeholder.com')) {
    return DEFAULT_BLOG_IMAGE;
  }
  return imageUrl;
};
