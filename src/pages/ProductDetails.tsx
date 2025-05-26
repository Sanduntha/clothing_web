import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Truck, RotateCcw, Heart, Share2, Minus, Plus } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../contexts/CartContext';
import FeaturedProducts from '../components/FeaturedProducts';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(
    products.find(p => p.id === parseInt(id || '0')) || products[0]
  );
  
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [activeTab, setActiveTab] = useState('description');
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      const foundProduct = products.find(p => p.id === parseInt(id));
      if (foundProduct) {
        setProduct(foundProduct);
        
        // Reset selections when product changes
        setQuantity(1);
        setSelectedSize('');
        setSelectedColor('');
        setError('');
        
        // Set defaults if available
        if (foundProduct.sizes && foundProduct.sizes.length > 0) {
          setSelectedSize(foundProduct.sizes[0]);
        }
        
        if (foundProduct.colors && foundProduct.colors.length > 0) {
          setSelectedColor(foundProduct.colors[0]);
        }
      }
    }
  }, [id]);

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = () => {
    // Validate selections if needed
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      setError('Please select a size');
      return;
    }
    
    if (product.colors && product.colors.length > 0 && !selectedColor) {
      setError('Please select a color');
      return;
    }
    
    // Clear any errors
    setError('');
    
    // Add to cart
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      color: selectedColor,
      quantity
    });

    // Show success message or redirect
  };

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <Link
          to="/shop"
          className="inline-block bg-rose-700 text-white py-2 px-6 rounded-md font-medium transition-colors hover:bg-rose-800"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-rose-700">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/shop" className="hover:text-rose-700">Shop</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div>
            <div className="mb-4 bg-gray-100 rounded-lg overflow-hidden aspect-square">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((_, index) => (
                <div key={index} className="bg-gray-100 rounded-lg overflow-hidden aspect-square">
                  <img
                    src={product.image}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-serif font-bold mb-2">{product.name}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400 mr-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={16}
                    className={star <= Math.round(product.rating) ? 'fill-current' : ''}
                  />
                ))}
              </div>
              <span className="text-gray-500">({product.reviews} reviews)</span>
            </div>
            
            <div className="text-2xl font-bold text-rose-700 mb-6">${product.price.toFixed(2)}</div>
            
            <p className="text-gray-600 mb-6">{product.description}</p>
            
            {error && (
              <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">
                {error}
              </div>
            )}

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <h3 className="font-medium mb-2">Size:</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`h-10 min-w-[40px] px-3 border rounded-md flex items-center justify-center ${
                        selectedSize === size
                          ? 'border-rose-700 bg-rose-50 text-rose-700'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <h3 className="font-medium mb-2">Color: <span className="text-gray-500 capitalize">{selectedColor}</span></h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`h-8 w-8 rounded-full border-2 ${
                        selectedColor === color ? 'border-gray-900' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: color === 'black' ? '#000' : color === 'white' ? '#fff' : color }}
                      aria-label={`Select ${color} color`}
                    />
                  ))}
                </div>
              </div>
            )}
            
            {/* Quantity and Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex border border-gray-300 rounded-md h-12">
                <button
                  onClick={decrementQuantity}
                  className="w-12 flex items-center justify-center border-r border-gray-300"
                >
                  <Minus size={16} />
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="w-16 text-center focus:outline-none"
                />
                <button
                  onClick={incrementQuantity}
                  className="w-12 flex items-center justify-center border-l border-gray-300"
                >
                  <Plus size={16} />
                </button>
              </div>
              
              <button
                onClick={handleAddToCart}
                className="flex-grow bg-rose-700 text-white h-12 rounded-md font-medium transition-colors hover:bg-rose-800 focus:outline-none focus:ring-2 focus:ring-rose-700 focus:ring-offset-2"
              >
                Add to Cart
              </button>
              
              <button
                className="h-12 w-12 rounded-md border border-gray-300 flex items-center justify-center transition-colors hover:bg-gray-100"
                aria-label="Add to wishlist"
              >
                <Heart size={20} />
              </button>
            </div>
            
            {/* Additional Information */}
            <div className="border-t border-gray-200 pt-6 space-y-4">
              <div className="flex items-start">
                <Truck size={20} className="mr-2 mt-0.5 text-gray-600" />
                <div>
                  <span className="font-medium">Free shipping</span>
                  <p className="text-gray-600 text-sm">
                    Free standard shipping on orders over $100
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <RotateCcw size={20} className="mr-2 mt-0.5 text-gray-600" />
                <div>
                  <span className="font-medium">Easy returns</span>
                  <p className="text-gray-600 text-sm">
                    30-day return policy
                  </p>
                </div>
              </div>
              
              <div className="flex items-center pt-4">
                <span className="text-gray-600 mr-4">Share:</span>
                <div className="flex space-x-2">
                  <a href="#" className="text-gray-500 hover:text-rose-700">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-500 hover:text-rose-700">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-500 hover:text-rose-700">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mb-16">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('description')}
                className={`py-4 text-sm font-medium border-b-2 ${
                  activeTab === 'description'
                    ? 'border-rose-700 text-rose-700'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab('additionalInfo')}
                className={`py-4 text-sm font-medium border-b-2 ${
                  activeTab === 'additionalInfo'
                    ? 'border-rose-700 text-rose-700'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Additional Information
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`py-4 text-sm font-medium border-b-2 ${
                  activeTab === 'reviews'
                    ? 'border-rose-700 text-rose-700'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Reviews ({product.reviews})
              </button>
            </nav>
          </div>

          <div className="py-6">
            {activeTab === 'description' && (
              <div>
                <p className="text-gray-600 mb-4">
                  {product.longDescription || `${product.description} ${product.description}`}
                </p>
                <p className="text-gray-600">
                  Our commitment to quality ensures that each piece is crafted with attention to detail and made to last. This garment is designed to provide both style and comfort, making it a versatile addition to your wardrobe.
                </p>
              </div>
            )}

            {activeTab === 'additionalInfo' && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <th className="py-4 px-6 text-left text-sm font-medium text-gray-500 bg-gray-50 w-1/4">Material</th>
                      <td className="py-4 px-6 text-sm text-gray-700">Cotton, Polyester</td>
                    </tr>
                    <tr>
                      <th className="py-4 px-6 text-left text-sm font-medium text-gray-500 bg-gray-50">Weight</th>
                      <td className="py-4 px-6 text-sm text-gray-700">0.5 kg</td>
                    </tr>
                    <tr>
                      <th className="py-4 px-6 text-left text-sm font-medium text-gray-500 bg-gray-50">Dimensions</th>
                      <td className="py-4 px-6 text-sm text-gray-700">N/A</td>
                    </tr>
                    <tr>
                      <th className="py-4 px-6 text-left text-sm font-medium text-gray-500 bg-gray-50">Country of Origin</th>
                      <td className="py-4 px-6 text-sm text-gray-700">Portugal</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <div className="mb-8">
                  <h3 className="text-xl font-medium mb-4">{product.reviews} Reviews for {product.name}</h3>
                  
                  {/* Sample Reviews */}
                  {[
                    {
                      name: "Sarah Johnson",
                      date: "April 12, 2023",
                      rating: 5,
                      review: "The quality of this product exceeded my expectations. The fabric is soft yet durable, and the fit is perfect. Highly recommend!"
                    },
                    {
                      name: "Michael Brown",
                      date: "March 28, 2023",
                      rating: 4,
                      review: "Great product overall. The color is slightly different from what's shown in the image, but I still love it. Fast shipping too."
                    }
                  ].map((review, index) => (
                    <div key={index} className="border-b border-gray-200 py-6 last:border-0">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">{review.name}</span>
                        <span className="text-gray-500 text-sm">{review.date}</span>
                      </div>
                      <div className="flex text-yellow-400 mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={16}
                            className={star <= review.rating ? 'fill-current' : ''}
                          />
                        ))}
                      </div>
                      <p className="text-gray-600">{review.review}</p>
                    </div>
                  ))}
                </div>
                
                {/* Review Form */}
                <div>
                  <h3 className="text-xl font-medium mb-4">Add a Review</h3>
                  <form>
                    <div className="mb-4">
                      <label className="block text-gray-700 mb-2">
                        Your Rating *
                      </label>
                      <div className="flex text-gray-400">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            className="mr-1 focus:outline-none"
                          >
                            <Star size={24} className="hover:text-yellow-400" />
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="review" className="block text-gray-700 mb-2">
                        Your Review *
                      </label>
                      <textarea
                        id="review"
                        rows={4}
                        required
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-700"
                      ></textarea>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label htmlFor="name" className="block text-gray-700 mb-2">
                          Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          required
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-700"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-gray-700 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          required
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-700"
                        />
                      </div>
                    </div>
                    
                    <button
                      type="submit"
                      className="bg-rose-700 text-white py-3 px-6 rounded-md font-medium transition-colors hover:bg-rose-800 focus:outline-none focus:ring-2 focus:ring-rose-700 focus:ring-offset-2"
                    >
                      Submit Review
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div>
          <h2 className="text-2xl font-serif font-bold mb-8">You May Also Like</h2>
          <FeaturedProducts products={relatedProducts} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;