/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchPages } from '@/lib/notion';
import { localImageService } from './services/local-image.service';

export type ProcessImagesResult = {
  success: boolean;
  processed: number;
  failed: number;
  message: string;
};

/**
 * Process all featured images for blog posts
 * @returns Promise with processing results
 */
export async function processAllBlogImages(): Promise<ProcessImagesResult> {
  try {
    // Fetch all posts
    const pages = await fetchPages();
    
    if (!pages || pages.length === 0) {
      return {
        success: false,
        processed: 0,
        failed: 0,
        message: 'No posts found'
      };
    }
    
    console.log(`Processing images for ${pages.length} posts...`);
    
    // Map to the format needed for processFeaturedImagesForPosts
    const postsForProcessing = pages.map((page: any) => {
      return {
        slug: page.properties.Slug?.rich_text[0]?.plain_text || page.id,
        title: page.properties.Title?.title[0]?.plain_text || 'Untitled Post',
        featuredImage: page.properties["Featured Image"]?.files || []
      };
    });
    
    // Process all featured images using local service
    const result = await localImageService.processFeaturedImagesForPosts(postsForProcessing);
    
    // Count processed images
    const processedCount = Object.keys(result).length;
    const failedCount = postsForProcessing.filter(p => p.featuredImage.length > 0).length - processedCount;
    
    return {
      success: true,
      processed: processedCount,
      failed: failedCount,
      message: `Successfully processed ${processedCount} images. ${failedCount} failed.`
    };
  } catch (error) {
    console.error('Error processing blog images:', error);
    return {
      success: false,
      processed: 0,
      failed: 0,
      message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
} 