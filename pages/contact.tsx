import React, { useState } from 'react';
import Layout from '../components/Layout';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setMessage('Message sent successfully! We\'ll get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
        setMessage(data.error || 'Failed to send message');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Failed to send message. Please try again.');
    }

    window.setTimeout(() => {
      setStatus('idle');
      setMessage('');
    }, 5000);
  };

  return (
    <Layout title="Contact Us" description="Get in touch with our team">
      <div className="pt-20 sm:pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-500 mb-6 font-serif">
              Get in Touch
            </h1>
            <p className="text-lg text-secondary-500 max-w-2xl mx-auto">
              Have a question, suggestion, or just want to say hello? We'd love to hear from you.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-primary-500 mb-6">Contact Information</h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                      <i className="bi bi-envelope text-primary-500 text-xl"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary-500">Email</h3>
                      <p className="text-secondary-500">hello@blogcraft.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                      <i className="bi bi-telephone text-primary-500 text-xl"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary-500">Phone</h3>
                      <p className="text-secondary-500">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                      <i className="bi bi-geo-alt text-primary-500 text-xl"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary-500">Address</h3>
                      <p className="text-secondary-500">San Francisco, CA</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-primary-500 mb-6">Follow Us</h2>
                <div className="flex space-x-4">
                  <a href="#" className="w-12 h-12 bg-primary-500 text-white rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors duration-300">
                    <i className="bi bi-twitter"></i>
                  </a>
                  <a href="#" className="w-12 h-12 bg-primary-500 text-white rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors duration-300">
                    <i className="bi bi-facebook"></i>
                  </a>
                  <a href="#" className="w-12 h-12 bg-primary-500 text-white rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors duration-300">
                    <i className="bi bi-instagram"></i>
                  </a>
                  <a href="#" className="w-12 h-12 bg-primary-500 text-white rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors duration-300">
                    <i className="bi bi-linkedin"></i>
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold text-primary-500 mb-6">Send us a Message</h2>
              
              {message && (
                <div className={`p-4 rounded-lg mb-6 ${
                  status === 'success' 
                    ? 'bg-green-100 text-green-800 border border-green-200' 
                    : 'bg-red-100 text-red-800 border border-red-200'
                }`}>
                  {message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-primary-500 text-white px-8 py-4 rounded-lg hover:bg-primary-600 transition-all duration-300 transform hover:scale-105 font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {status === 'loading' ? (
                    <>
                      <i className="bi bi-hourglass-split mr-2"></i>
                      Sending...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-send mr-2"></i>
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
