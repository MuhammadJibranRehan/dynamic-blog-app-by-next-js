// app/page.tsx

import Link from "next/link";

const Home = () => {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-center py-12 px-6">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg mx-auto">
          <h1 className="text-4xl font-bold text-indigo-600 mb-4">Welcome to My Blog!</h1>
          <p className="text-lg text-gray-700 mb-6">
            Stay updated with my latest posts and articles. Dive into the world of knowledge and creativity.
          </p>
          <Link
            href="/blog"
            className="inline-block bg-indigo-600 text-white text-lg font-semibold rounded-lg py-3 px-6 hover:bg-indigo-700 transition-all duration-300"
          >
            View Blog Posts
          </Link>
        </div>
      </div>
    );
  };
  
  export default Home;  