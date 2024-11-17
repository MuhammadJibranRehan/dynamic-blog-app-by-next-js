'use client';
import { useState, useEffect } from 'react';

const Comments = () => {
  const [comments, setComments] = useState<{ text: string; timestamp: string; likes: number; dislikes: number; flagged: boolean }[]>([]);
  const [newComment, setNewComment] = useState('');
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEditing, setIsEditing] = useState<number | null>(null); // State to track editing
  const [editingComment, setEditingComment] = useState<string>(''); // Comment currently being edited
  const [searchQuery, setSearchQuery] = useState(''); // Search query state

  // Retrieve username and comments from localStorage when the component mounts
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedComments = localStorage.getItem('comments');
    
    if (storedUsername) {
      setUsername(storedUsername);
      setIsLoggedIn(true);
    }

    if (storedComments) {
      setComments(JSON.parse(storedComments));
    }
  }, []);

  // Save comments to localStorage when they change
  useEffect(() => {
    localStorage.setItem('comments', JSON.stringify(comments));
  }, [comments]);

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      localStorage.setItem('username', username); // Store username in localStorage
      setIsLoggedIn(true); // Set the login state
    }
  };

  // Handle Comment Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      const newCommentData = {
        text: newComment,
        timestamp: new Date().toLocaleString(), // Add timestamp when comment is submitted
        likes: 0, // Initialize likes to 0
        dislikes: 0, // Initialize dislikes to 0
        flagged: false, // Flag state set to false
      };
      setComments([...comments, newCommentData]);
      setNewComment('');
    }
  };

  // Handle Edit
  const handleEdit = (index: number) => {
    setIsEditing(index); // Set editing state
    setEditingComment(comments[index].text); // Set the comment to edit
  };

  const handleSaveEdit = () => {
    const updatedComments = [...comments];
    updatedComments[isEditing!] = { 
      text: editingComment, 
      timestamp: new Date().toLocaleString(),
      likes: updatedComments[isEditing!].likes,
      dislikes: updatedComments[isEditing!].dislikes,
      flagged: updatedComments[isEditing!].flagged,
    }; // Update comment with timestamp
    setComments(updatedComments);
    setIsEditing(null); // Clear editing state
    setEditingComment(''); // Clear edited text state
  };

  // Handle Delete
  const handleDelete = (index: number) => {
    const updatedComments = [...comments];
    updatedComments.splice(index, 1); // Remove comment by index
    setComments(updatedComments);
  };

  // Handle Like
  const handleLike = (index: number) => {
    const updatedComments = [...comments];
    updatedComments[index].likes += 1; // Increment like count
    setComments(updatedComments);
  };

  // Handle Dislike
  const handleDislike = (index: number) => {
    const updatedComments = [...comments];
    updatedComments[index].dislikes += 1; // Increment dislike count
    setComments(updatedComments);
  };

  // Handle Flag
  const handleFlag = (index: number) => {
    const updatedComments = [...comments];
    updatedComments[index].flagged = !updatedComments[index].flagged; // Toggle flagged state
    setComments(updatedComments);
  };

  // Handle Search Query
  const filteredComments = comments.filter((comment) =>
    comment.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('username'); // Remove username from localStorage
    setIsLoggedIn(false); // Set the login state to false
    setUsername(''); // Clear the username state
  };

  // Handle Clear All Comments
  const handleClearAll = () => {
    setComments([]); // Clear all comments
    localStorage.removeItem('comments'); // Remove comments from localStorage
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mt-8">
      {/* Login Form */}
      {!isLoggedIn ? (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full p-4 bg-gray-100 text-gray-800 border border-gray-300 rounded-lg"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition-all duration-300"
            >
              Login
            </button>
          </form>
        </div>
      ) : (
        <div>
          <p className="mb-4 text-gray-800">Welcome, {username}!</p>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 transition-all duration-300 mb-6"
          >
            Logout
          </button>

          {/* Search */}
          <input
            type="text"
            placeholder="Search comments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-4 mb-6 bg-gray-100 text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />

          {/* Clear All Comments */}
          <button
            onClick={handleClearAll}
            className="bg-yellow-600 text-white py-2 px-6 rounded-lg hover:bg-yellow-700 transition-all duration-300 mb-6"
          >
            Clear All Comments
          </button>

          {/* Comments List */}
          <ul className="space-y-4 mb-6">
            {filteredComments.map((comment, index) => (
              <li key={index} className={`p-4 bg-gray-50 rounded-lg shadow-sm ${comment.flagged ? 'bg-red-200' : ''}`}>
                {isEditing === index ? (
                  <div className="flex space-x-4">
                    <textarea
                      value={editingComment}
                      onChange={(e) => setEditingComment(e.target.value)}
                      placeholder="Edit your comment..."
                      className="w-full p-4 bg-gray-100 text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                    <button
                      onClick={handleSaveEdit}
                      className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-all duration-300"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div>
                    <p className="text-gray-800">{comment.text}</p>
                    <small className="block text-gray-500">{comment.timestamp}</small>
                    <div className="flex items-center mt-2 space-x-4">
                      <button
                        onClick={() => handleLike(index)}
                        className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all duration-300"
                      >
                        Like ({comment.likes})
                      </button>
                      <button
                        onClick={() => handleDislike(index)}
                        className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-all duration-300"
                      >
                        Dislike ({comment.dislikes})
                      </button>
                      <button
                        onClick={() => handleFlag(index)}
                        className="bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 transition-all duration-300"
                      >
                        {comment.flagged ? 'Unflag' : 'Flag'}
                      </button>
                    </div>
                    <button
                      onClick={() => handleEdit(index)}
                      className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition-all duration-300 mt-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 transition-all duration-300 mt-2"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* Comment Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="w-full p-4 bg-gray-100 text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition-all duration-300"
            >
              Add Comment
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Comments;