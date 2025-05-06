/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// For TypeScript type safety
export type ImageMetadata = {
  src: string;
  alt: string;
};

/**
 * Service for processing and storing images locally
 */
export class LocalImageService {
  private blogImagesDir: string;
  
  constructor() {
    // Path to public blog images directory
    this.blogImagesDir = path.join(process.cwd(), 'public', 'blog');
    
    // Ensure directory exists
    this.ensureDirectoryExists();
  }
  
  /**
   * Ensure the blog images directory exists
   */
  private ensureDirectoryExists(): void {
    if (!fs.existsSync(this.blogImagesDir)) {
      fs.mkdirSync(this.blogImagesDir, { recursive: true });
      console.log(`Created directory: ${this.blogImagesDir}`);
    }
  }
  
  /**
   * Get a safe filename from a slug
   */
  getSafeFilename(slug: string): string {
    return slug
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') + '.webp';
  }
  
  /**
   * Get the URL for a blog image
   */
  getImageUrl(slug: string): string {
    return `/blog/${this.getSafeFilename(slug)}`;
  }
  
  /**
   * Process and save an image locally
   */
  async processAndSaveImage(
    slug: string,
    imageUrl: string,
    title: string
  ): Promise<ImageMetadata | null> {
    try {
      const safeFilename = this.getSafeFilename(slug);
      const outputPath = path.join(this.blogImagesDir, safeFilename);
      
      console.log(`Processing image for "${slug}" from ${imageUrl}`);
      
      // Fetch the image
      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.status}`);
      }
      
      // Get image as array buffer
      const imageBuffer = await response.arrayBuffer();
      
      // Process with sharp - resize and convert to webp
      await sharp(Buffer.from(imageBuffer))
        .resize(1200, 800, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(outputPath);
      
      console.log(`Saved image to ${outputPath}`);
      
      // Return metadata
      return {
        src: this.getImageUrl(slug),
        alt: title || slug
      };
    } catch (error) {
      console.error(`Failed to process image for "${slug}":`, error);
      return null;
    }
  }
  
  /**
   * Extract featured image details from Notion's property
   */
  private extractFeaturedImageDetails(featuredImageProperty: any[]): { url: string, fileName: string } | null {
    if (!featuredImageProperty || featuredImageProperty.length === 0) {
      return null;
    }

    const image = featuredImageProperty[0];
    if (!image || !image.file || !image.file.url) {
      return null;
    }

    return {
      url: image.file.url,
      fileName: image.name
    };
  }
  
  /**
   * Process featured images for multiple posts
   */
  async processFeaturedImagesForPosts(
    posts: Array<{
      slug: string;
      title: string;
      featuredImage: any[];
    }>
  ): Promise<Record<string, ImageMetadata>> {
    const results: Record<string, ImageMetadata> = {};
    const errors: Array<{slug: string, error: any}> = [];
    
    for (const post of posts) {
      try {
        const imageDetails = this.extractFeaturedImageDetails(post.featuredImage);
        
        if (!imageDetails) {
          console.log(`No featured image found for post "${post.slug}"`);
          continue;
        }
        
        const imageMetadata = await this.processAndSaveImage(
          post.slug,
          imageDetails.url,
          post.title
        );
        
        if (imageMetadata) {
          results[post.slug] = imageMetadata;
        }
      } catch (error) {
        console.error(`Error processing featured image for "${post.slug}":`, error);
        errors.push({slug: post.slug, error});
      }
    }
    
    if (errors.length > 0) {
      console.error(`Failed to process ${errors.length} images:`, errors.map(e => e.slug).join(', '));
    }
    
    return results;
  }
}

// Export singleton instance
export const localImageService = new LocalImageService(); 