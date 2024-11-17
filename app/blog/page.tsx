// app/blog/page.tsx
'use client'; // Make sure this is client-side code

import Link from 'next/link';

const posts = [
  { id: 1, title: 'First Blog Post' },
  { id: 2, title: 'Second Blog Post' },
  { id: 3, title: 'Third Blog Post' },
];

const Blog = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-indigo-600 mb-8">Blog Posts</h1>
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.id} className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <Link href={`/blog/${post.id}`} className="text-2xl font-semibold text-gray-800 hover:text-indigo-600">
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Blog;