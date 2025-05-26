import { useState } from 'react';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Simulate form submission
      setTimeout(() => {
        setSubmitted(true);
        setEmail('');
      }, 500);
    }
  };

  return (
    <section className="bg-rose-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Join Our Newsletter
          </h2>
          <p className="text-gray-600 mb-8">
            Subscribe to our newsletter and be the first to know about new collections, 
            special offers and exclusive events.
          </p>
          
          {submitted ? (
            <div className="bg-green-100 text-green-700 p-4 rounded-md">
              Thank you for subscribing to our newsletter!
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="flex-grow p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-700"
              />
              <button
                type="submit"
                className="bg-rose-700 text-white py-3 px-6 rounded-md font-medium transition-colors hover:bg-rose-800 focus:outline-none focus:ring-2 focus:ring-rose-700 focus:ring-offset-2"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;