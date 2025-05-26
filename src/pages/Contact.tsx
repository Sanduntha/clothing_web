import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setFormSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1000);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-96">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.pexels.com/photos/4049672/pexels-photo-4049672.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
          }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="container mx-auto px-4 h-full flex items-center relative">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
              Contact Us
            </h1>
            <nav className="text-sm text-white/80">
              <Link to="/" className="hover:text-white">Home</Link>
              <span className="mx-2">/</span>
              <span>Contact Us</span>
            </nav>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin size={24} className="text-rose-700" />
              </div>
              <h3 className="text-xl font-serif font-bold mb-2">Visit Us</h3>
              <p className="text-gray-600">
                123 Fashion Street<br />
                New York, NY 10001<br />
                United States
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone size={24} className="text-rose-700" />
              </div>
              <h3 className="text-xl font-serif font-bold mb-2">Call Us</h3>
              <p className="text-gray-600">
                +1 (123) 456-7890<br />
                Monday - Friday: 9am - 6pm<br />
                Saturday: 10am - 4pm
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail size={24} className="text-rose-700" />
              </div>
              <h3 className="text-xl font-serif font-bold mb-2">Email Us</h3>
              <p className="text-gray-600">
                info@anto.com<br />
                support@anto.com<br />
                sales@anto.com
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-serif font-bold mb-6">Send Us a Message</h2>
              {formSubmitted ? (
                <div className="bg-green-100 text-green-700 p-6 rounded-lg">
                  <h3 className="font-bold text-lg mb-2">Thank You!</h3>
                  <p>Your message has been sent. We'll get back to you as soon as possible.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-gray-700 mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-700"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-gray-700 mb-2">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-700"
                      />
                    </div>
                  </div>
                  <div className="mb-6">
                    <label htmlFor="subject" className="block text-gray-700 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-700"
                    />
                  </div>
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-gray-700 mb-2">
                      Your Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-700"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="bg-rose-700 text-white py-3 px-8 rounded-md font-medium transition-colors hover:bg-rose-800 focus:outline-none focus:ring-2 focus:ring-rose-700 focus:ring-offset-2"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>

            {/* Map */}
            <div>
              <h2 className="text-3xl font-serif font-bold mb-6">Find Us</h2>
              <div className="h-[400px] bg-gray-200 rounded-lg overflow-hidden relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215053273677!2d-73.9911958!3d40.749196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a53c91a935%3A0xc8a84512a0aed2!2sGarment%20District%2C%20New%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sus!4v1651159918135!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="ANTO Store Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto">
            {[
              {
                question: "What are your shipping options?",
                answer: "We offer standard shipping (5-7 business days), express shipping (2-3 business days), and next-day delivery options. Shipping costs vary based on location and chosen method."
              },
              {
                question: "What is your return policy?",
                answer: "We offer a 30-day return policy for unused items in their original packaging. Returns are free for orders over $50. For more details, please visit our Returns page."
              },
              {
                question: "Do you ship internationally?",
                answer: "Yes, we ship to most countries worldwide. International shipping typically takes 7-14 business days depending on the destination."
              },
              {
                question: "How can I track my order?",
                answer: "Once your order ships, you'll receive a confirmation email with tracking information. You can also track your order by logging into your account on our website."
              }
            ].map((faq, index) => (
              <div key={index} className="mb-6">
                <h3 className="text-xl font-serif font-bold mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;