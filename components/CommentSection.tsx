import React, { useState, useEffect } from 'react';

interface Comment {
  id: string;
  postId: string;
  author: string;
  email: string;
  content: string;
  date: string;
  approved: boolean;
}

interface CommentSectionProps {
  postId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    author: '',
    email: '',
    content: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/comments/${postId}`);
      const data = await response.json();
      
      if (data.success) {
        setComments(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');

    try {
      const response = await fetch(`/api/comments/${postId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setMessage('Comment submitted successfully! It will appear after approval.');
        setFormData({ author: '', email: '', content: '' });
        setShowForm(false);
        window.setTimeout(() => setMessage(''), 5000);
      } else {
        setMessage(data.error || 'Failed to submit comment');
      }
    } catch (error) {
      setMessage('Failed to submit comment');
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded mb-4"></div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-100 p-4 rounded-lg">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-16 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="mt-12 pt-8 border-t border-gray-200">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-bold text-primary-500">
          Comments ({comments.length})
        </h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition-colors duration-300"
        >
          <i className="bi bi-chat-dots mr-2"></i>
          Add Comment
        </button>
      </div>

      {message && (
        <div className={`p-4 rounded-lg mb-6 ${
          message.includes('successfully') 
            ? 'bg-green-100 text-green-800 border border-green-200' 
            : 'bg-red-100 text-red-800 border border-red-200'
        }`}>
          {message}
        </div>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg mb-8">
          <h4 className="text-lg font-semibold text-primary-500 mb-4">Leave a Comment</h4>
          
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
                Name *
              </label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              Comment *
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Share your thoughts..."
            />
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Your email will not be published. Comments are moderated.
            </p>
            <div className="space-x-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <i className="bi bi-hourglass-split mr-2"></i>
                    Submitting...
                  </>
                ) : (
                  <>
                    <i className="bi bi-send mr-2"></i>
                    Submit Comment
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      )}

      <div className="space-y-6">
        {comments.length === 0 ? (
          <div className="text-center py-12">
            <i className="bi bi-chat-square-text text-4xl text-gray-400 mb-4"></i>
            <p className="text-gray-600">No comments yet. Be the first to share your thoughts!</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <i className="bi bi-person-fill text-primary-500"></i>
                  </div>
                  <div>
                    <h5 className="font-semibold text-primary-500">{comment.author}</h5>
                    <p className="text-sm text-gray-500">{formatDate(comment.date)}</p>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">{comment.content}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default CommentSection;
