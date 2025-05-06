import { processAllBlogImages } from '@/lib/image-processor';
import { NextResponse } from 'next/server';


export async function POST() {
  // Check if this is a development environment
  const isDev = process.env.NODE_ENV === 'development';
  
  if (!isDev) {
    return NextResponse.json(
      { error: 'This endpoint is only available in development environment' },
      { status: 403 }
    );
  }
  
  try {
    const result = await processAllBlogImages();
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error processing images:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        processed: 0,
        failed: 0
      },
      { status: 500 }
    );
  }
} 