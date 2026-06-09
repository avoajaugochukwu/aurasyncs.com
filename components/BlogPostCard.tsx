"use client"; // Mark this as a Client Component

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

// Define the expected props for the card
interface BlogPostCardProps {
  post: {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    formattedDate: string;
    readingTime: string;
    tags: string[];
    author: string;
    featuredImage?: string | null;
  };
  /** Prioritize loading for above-the-fold cards only. */
  priority?: boolean;
}

export function BlogPostCard({ post, priority = false }: BlogPostCardProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const imageSrc = post.featuredImage || 'https://placehold.co/600x400';

  return (
    <Link href={`/blog/${post.slug}`} className="block h-full">
      <Card className="overflow-hidden h-full flex flex-col group hover:shadow-md transition-all duration-300">
        <div className="block h-48 overflow-hidden relative">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <span className="animate-pulse">Loading...</span>
            </div>
          )}
          <Image
            src={imageSrc}
            alt={`Featured image for ${post.title}`}
            width={600}
            height={400}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
            priority={priority}
            loading={priority ? undefined : 'lazy'}
            onLoad={() => setIsLoading(false)}
            onError={(e) => {
              e.currentTarget.src = 'https://placehold.co/600x400';
              setIsLoading(false);
            }}
          />
        </div>

        <div className="p-5 flex flex-col flex-grow">
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.slice(0, 3).map(tag => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
            {post.title}
          </h3>

          <p className="text-muted-foreground text-sm mb-3 line-clamp-3">
            {post.excerpt}
          </p>

          <div className="text-xs text-muted-foreground mt-auto flex justify-between">
            <span>{post.formattedDate}</span>
            <span>{post.readingTime}</span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
