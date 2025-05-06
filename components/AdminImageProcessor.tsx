"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

export default function AdminImageProcessor() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    processed: number;
    failed: number;
    message: string;
  } | null>(null);

  // Only show in development mode
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  const handleProcessImages = async () => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    setResult(null);
    
    try {
      const response = await fetch('/api/admin/process-images', {
        method: 'POST',
      });
      
      if (!response.ok) {
        throw new Error(`Failed to process images: ${response.status}`);
      }
      
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({
        success: false,
        processed: 0,
        failed: 0,
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto my-8 shadow-md">
      <CardHeader>
        <CardTitle>Image Processor</CardTitle>
        <CardDescription>Process and optimize blog images</CardDescription>
      </CardHeader>
      
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          This tool will download featured images from Notion, optimize them, and save them locally.
        </p>
        
        {result && (
          <Alert 
            className={`my-4 ${result.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            {result.success ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <XCircle className="h-4 w-4 text-red-600" />
            )}
            <AlertTitle>{result.success ? 'Success' : 'Error'}</AlertTitle>
            <AlertDescription className="mt-2">
              {result.message}
              {result.success && (
                <div className="mt-1 text-sm">
                  Processed: {result.processed}, Failed: {result.failed}
                </div>
              )}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
      
      <CardFooter>
        <Button 
          onClick={handleProcessImages} 
          disabled={isProcessing}
          className="w-full"
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : 'Process Images'}
        </Button>
      </CardFooter>
      
      <div className="text-xs text-center mb-2 text-muted-foreground">
        Dev Tools - Only visible in development mode
      </div>
    </Card>
  );
} 