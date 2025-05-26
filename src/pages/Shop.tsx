import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { Filter, X, ChevronDown } from 'lucide-react';

const Shop = () => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const categories = ['all', 'women', 'men', 'accessories'];
  const priceRanges = [
    { id: 'all', label: 'All Prices' },
    { id: 'under50', label: 'Under $50' },
    { id: '50to100', label: '$50 - $100' },
    { id: '100to200', label: '$100 - $200' },
    { id: 'over200', label: 'Over $200' }
  ];

  const sortOptions = [
    { id: 'featured', label: 'Featured' },
    { id: 'newest', label: 'Newest' },
    { id: 'priceAsc', label: 'Price: Low to High' },
    { id: 'priceDesc', label: 'Price: High to Low' }
  ];

  useEffect(() => {
    let result = [...products];
    
    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Filter by price
    if (selectedPrice !== 'all') {
      switch(selectedPrice) {
        case 'under50':
          result = result.filter(product => product.price < 50);
          break;
        case '50to100':
          result = result.filter(product => product.price >= 50 && product.price <= 100);
          break;
        case '100to200':
          result = result.filter(product => product.price > 100 && product.price <= 200);
          break;
        case 'over200':
          result = result.filter(product => product.price > 200);
          break;
        default:
          break;
      }
    }
    
    // Sort products
    switch(sortBy) {
      case 'newest':
        result = result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case 'priceAsc':
        result = result.sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        result = result.sort((a, b) => b.price - a.price);
        break;
      default:
        // Featured - use default order
        break;
    }
    
    setFilteredProducts(result);
  }, [selectedCategory, selectedPrice, sortBy]);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-96">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.pexels.com/photos/1884584/pexels-photo-1884584.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
          }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="container mx-auto px-4 h-full flex items-center relative">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
              Shop Collection
            </h1>
            <nav className="text-sm text-white/80">
              <Link to="/" className="hover:text-white">Home</Link>
              <span className="mx-2">/</span>
              <span>Shop</span>
            </nav>
          </div>
        </div>
      </section>

      {/* Shop Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row">
            {/* Mobile Filter Toggle */}
            <div className="md:hidden mb-6">
              <button
                onClick={() => setFiltersOpen(!filtersOpen)}
                className="flex items-center justify-between w-full bg-white px-4 py-3 border border-gray-300 rounded-md"
              >
                <span className="flex items-center">
                  <Filter size={18} className="mr-2" />
                  Filters
                </span>
                {filtersOpen ? (
                  <X size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </button>
            </div>

            {/* Filters Sidebar */}
            <aside className={`w-full md:w-1/4 md:pr-8 ${filtersOpen ? 'block' : 'hidden md:block'}`}>
              <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                <h3 className="text-lg font-medium mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center">
                      <input
                        type="radio"
                        id={`category-${category}`}
                        name="category"
                        checked={selectedCategory === category}
                        onChange={() => setSelectedCategory(category)}
                        className="h-4 w-4 border-gray-300 text-rose-700 focus:ring-rose-700"
                      />
                      <label
                        htmlFor={`category-${category}`}
                        className="ml-2 text-gray-700 capitalize"
                      >
                        {category === 'all' ? 'All Categories' : category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium mb-4">Price Range</h3>
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <div key={range.id} className="flex items-center">
                      <input
                        type="radio"
                        id={`price-${range.id}`}
                        name="price"
                        checked={selectedPrice === range.id}
                        onChange={() => setSelectedPrice(range.id)}
                        className="h-4 w-4 border-gray-300 text-rose-700 focus:ring-rose-700"
                      />
                      <label
                        htmlFor={`price-${range.id}`}
                        className="ml-2 text-gray-700"
                      >
                        {range.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="w-full md:w-3/4">
              {/* Sort and Results Count */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                <p className="text-gray-600 mb-4 sm:mb-0">
                  Showing {filteredProducts.length} products
                </p>
                <div className="flex items-center">
                  <span className="text-gray-600 mr-2">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border-gray-300 rounded-md focus:border-rose-700 focus:ring focus:ring-rose-200 focus:ring-opacity-50"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Products */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-xl text-gray-600">No products found.</p>
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setSelectedPrice('all');
                      setSortBy('featured');
                    }}
                    className="mt-4 text-rose-700 hover:text-rose-800 underline"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Shop;