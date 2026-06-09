import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';
import Link from 'next/link';
import type { ComponentProps } from 'react';

const components = {
  h1: (props: ComponentProps<'h2'>) => <h2 className="text-2xl font-semibold mt-8 mb-3" {...props} />,
  h2: (props: ComponentProps<'h2'>) => <h2 className="text-2xl font-semibold mt-8 mb-3" {...props} />,
  h3: (props: ComponentProps<'h3'>) => <h3 className="text-xl font-semibold mt-6 mb-2" {...props} />,
  p: (props: ComponentProps<'p'>) => <p className="leading-7 my-4 text-foreground/90" {...props} />,
  ul: (props: ComponentProps<'ul'>) => <ul className="list-disc ml-6 my-4 space-y-1" {...props} />,
  ol: (props: ComponentProps<'ol'>) => <ol className="list-decimal ml-6 my-4 space-y-1" {...props} />,
  li: (props: ComponentProps<'li'>) => <li className="leading-7" {...props} />,
  blockquote: (props: ComponentProps<'blockquote'>) => (
    <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic text-muted-foreground my-6" {...props} />
  ),
  hr: () => <hr className="my-8 border-gray-200 dark:border-gray-700" />,
  code: (props: ComponentProps<'code'>) => (
    <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm font-mono" {...props} />
  ),
  pre: (props: ComponentProps<'pre'>) => (
    <pre className="bg-gray-800 dark:bg-gray-900 text-white p-4 rounded-md overflow-x-auto text-sm font-mono my-6" {...props} />
  ),
  a: ({ href = '', ...props }: ComponentProps<'a'>) => {
    const isInternal = href.startsWith('/') || href.startsWith('#');
    if (isInternal) {
      return <Link href={href} className="text-primary hover:underline" {...props} />;
    }
    return <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline" {...props} />;
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
        className="w-full h-auto rounded-md my-6"
      />
    );
  },
};

export function MdxContent({ source }: { source: string }) {
  return (
    <div className="max-w-none">
      <MDXRemote
        source={source}
        components={components}
        options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
      />
    </div>
  );
}
