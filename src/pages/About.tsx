import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-96">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.pexels.com/photos/3965545/pexels-photo-3965545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
          }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="container mx-auto px-4 h-full flex items-center relative">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
              About ANTO
            </h1>
            <nav className="text-sm text-white/80">
              <Link to="/" className="hover:text-white">Home</Link>
              <span className="mx-2">/</span>
              <span>About Us</span>
            </nav>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-serif font-bold mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded in 2015, ANTO began with a simple vision: to create clothing that combines 
                timeless elegance with contemporary design for the modern individual.
              </p>
              <p className="text-gray-600 mb-4">
                What started as a small passion project has evolved into a brand known for its 
                commitment to quality, sustainability, and exceptional design. Each piece in our 
                collection is thoughtfully crafted to stand the test of time, both in durability 
                and style.
              </p>
              <p className="text-gray-600">
                Our team of talented designers draws inspiration from global fashion trends while 
                maintaining our distinct aesthetic that has become synonymous with the ANTO name.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/6567607/pexels-photo-6567607.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="ANTO studio"
                className="rounded-lg shadow-lg w-full"
              />
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-rose-700"></div>
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-rose-200"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-rose-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-serif font-bold mb-4">Quality</h3>
              <p className="text-gray-600">
                We're committed to creating garments of exceptional quality using premium materials and 
                expert craftsmanship. Each piece is designed to last, reducing waste and promoting 
                a more sustainable approach to fashion.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-rose-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="text-xl font-serif font-bold mb-4">Sustainability</h3>
              <p className="text-gray-600">
                Environmental responsibility is at the heart of everything we do. From sourcing 
                eco-friendly materials to implementing ethical production processes, we strive 
                to minimize our environmental footprint at every step.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-rose-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <h3 className="text-xl font-serif font-bold mb-4">Inclusivity</h3>
              <p className="text-gray-600">
                We believe fashion should be for everyone. Our designs embrace diversity and 
                celebrate individuality, ensuring that everyone can find pieces that make them 
                feel confident and stylish.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                name: "Emma Parker",
                role: "Founder & Creative Director",
                image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              },
              {
                name: "David Chen",
                role: "Head of Design",
                image: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              },
              {
                name: "Sophia Rodriguez",
                role: "Marketing Director",
                image: "https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              },
              {
                name: "Michael Thompson",
                role: "Production Manager",
                image: "https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              }
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6 overflow-hidden rounded-full aspect-square mx-auto w-56">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <h3 className="text-xl font-serif font-bold mb-1">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-rose-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold mb-6">
            Experience the ANTO Difference
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Discover our latest collection and see for yourself why our customers love ANTO.
          </p>
          <Link
            to="/shop"
            className="inline-block bg-white text-rose-700 py-3 px-8 rounded-md font-medium transition-colors hover:bg-gray-100"
          >
            Shop Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;