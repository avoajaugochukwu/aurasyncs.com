import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';
import Link from 'next/link';
import type { ComponentProps } from 'react';

// Styling comes from the `.prose-body` rules in globals.css (warm reading system);
// these overrides only handle headings demotion, links, and Next/Image.
const components = {
  // MDX h1 in a post body becomes an h2 (the page <h1> is the article title).
  h1: (props: ComponentProps<'h2'>) => <h2 {...props} />,
  a: ({ href = '', ...props }: ComponentProps<'a'>) => {
    const isInternal = href.startsWith('/') || href.startsWith('#');
    if (isInternal) {
      return <Link href={href} {...props} />;
    }
    return <a href={href} target="_blank" rel="noopener noreferrer" {...props} />;
  },
  img: ({ src, alt }: ComponentProps<'img'>) => {
    if (!src || typeof src !== 'string') return null;
    return (
      <Image
        src={src}
        alt={alt || 'Affirmation illustration'}
        width={1200}
        height={800}
        sizes="(max-width: 768px) 100vw, 768px"
      />
    );
  },
};

export function MdxContent({ source }: { source: string }) {
  return (
    <div className="prose-body">
      <MDXRemote
        source={source}
        components={components}
        options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
      />
    </div>
  );
}
