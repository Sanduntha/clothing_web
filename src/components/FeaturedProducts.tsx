import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';
import { Product } from '../types';

interface FeaturedProductsProps {
  products: Product[];
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const productsPerView = { mobile: 1, tablet: 2, desktop: 4 };
  
  const totalSlides = products.length - productsPerView.desktop;
  
  const nextSlide = () => {
    if (currentIndex < totalSlides) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  
  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="relative">
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / productsPerView.desktop)}%)`,
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="w-full sm:w-1/2 lg:w-1/4 flex-shrink-0 px-4"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
      
      {products.length > productsPerView.desktop && (
        <div className="flex justify-center mt-8 space-x-2">
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className={`w-10 h-10 rounded-full flex items-center justify-center border ${
              currentIndex === 0
                ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                : 'border-gray-300 text-gray-600 hover:border-rose-700 hover:text-rose-700'
            }`}
            aria-label="Previous products"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextSlide}
            disabled={currentIndex >= totalSlides}
            className={`w-10 h-10 rounded-full flex items-center justify-center border ${
              currentIndex >= totalSlides
                ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                : 'border-gray-300 text-gray-600 hover:border-rose-700 hover:text-rose-700'
            }`}
            aria-label="Next products"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default FeaturedProducts;