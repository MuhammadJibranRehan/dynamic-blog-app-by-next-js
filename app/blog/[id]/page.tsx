// app/blog/[id]/page.tsx
'use client'; // Make it a client component

import { useParams } from 'next/navigation';
import Comments from '@/components/comments';

const BlogPost = () => {
  const { id } = useParams(); // Get the dynamic route parameter (ID)

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-indigo-600 mb-4">Blog Post #{id}</h1>
        <p className="text-lg text-gray-800 mb-6">
          This is the content of the blog post with ID: {id}. 
          <br />
          Add your blog content here. You can include rich text, images, and more.
        </p>
        
        {/* Comments section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-black mb-4">Comments</h2>
          <Comments />
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
