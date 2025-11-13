import React, { useState } from 'react';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setMessage('Successfully subscribed to our newsletter!');
        setEmail('');
        window.setTimeout(() => {
          setStatus('idle');
          setMessage('');
        }, 5000);
      } else {
        setStatus('error');
        setMessage(data.error || 'Failed to subscribe');
        window.setTimeout(() => {
          setStatus('idle');
          setMessage('');
        }, 5000);
      }
    } catch (error) {
      setStatus('error');
      setMessage('Failed to subscribe. Please try again.');
      window.setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-r from-primary-500 to-primary-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-serif">
              Stay in the Loop
            </h2>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              Get the latest articles, insights, and exclusive content delivered straight to your inbox.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-xl border-0 focus:ring-4 focus:ring-accent-500/50 focus:outline-none text-primary-500 placeholder-secondary-500"
                required
                disabled={status === 'loading'}
              />
              <button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className="bg-accent-500 text-white px-8 py-4 rounded-xl hover:bg-accent-600 transition-all duration-300 transform hover:scale-105 font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {status === 'loading' ? (
                  <>
                    <i className="bi bi-hourglass-split mr-2"></i>
                    Subscribing...
                  </>
                ) : status === 'success' ? (
                  <>
                    <i className="bi bi-check-circle mr-2"></i>
                    Subscribed!
                  </>
                ) : (
                  <>
                    <i className="bi bi-envelope mr-2"></i>
                    Subscribe
                  </>
                )}
              </button>
            </div>
            
            {message && (
              <div className={`mt-4 p-3 rounded-lg ${
                status === 'success' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {message}
              </div>
            )}
          </form>

          <div className="flex items-center justify-center space-x-6 text-primary-100">
            <div className="flex items-center">
              <i className="bi bi-shield-check mr-2"></i>
              <span className="text-sm">No spam, ever</span>
            </div>
            <div className="flex items-center">
              <i className="bi bi-x-circle mr-2"></i>
              <span className="text-sm">Unsubscribe anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
