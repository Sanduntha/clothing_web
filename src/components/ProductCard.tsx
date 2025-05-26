import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  };

  return (
    <div
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden rounded-lg aspect-[3/4] bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {product.isNew && (
            <span className="absolute top-2 left-2 bg-rose-700 text-white text-xs font-medium px-2 py-1 rounded">
              New
            </span>
          )}
          
          {product.discount > 0 && (
            <span className="absolute top-2 right-2 bg-black text-white text-xs font-medium px-2 py-1 rounded">
              {product.discount}% Off
            </span>
          )}
          
          <div className={`absolute bottom-0 left-0 right-0 bg-white bg-opacity-95 py-3 px-4 flex justify-between items-center transition-transform duration-300 ${
            isHovered ? 'translate-y-0' : 'translate-y-full'
          }`}>
            <button
              onClick={handleAddToCart}
              className="flex items-center text-rose-700 font-medium text-sm hover:text-rose-800"
            >
              <ShoppingCart size={16} className="mr-1" />
              Add to Cart
            </button>
            
            <div className="flex space-x-2">
              <button className="text-gray-500 hover:text-rose-700" aria-label="Quick view">
                <Eye size={18} />
              </button>
              <button className="text-gray-500 hover:text-rose-700" aria-label="Add to wishlist">
                <Heart size={18} />
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <h3 className="text-gray-900 font-medium group-hover:text-rose-700 transition-colors">
            {product.name}
          </h3>
          <div className="mt-1 flex items-center">
            {product.oldPrice ? (
              <div className="flex items-center">
                <span className="text-rose-700 font-medium">${product.price.toFixed(2)}</span>
                <span className="ml-2 text-gray-500 line-through text-sm">${product.oldPrice.toFixed(2)}</span>
              </div>
            ) : (
              <span className="text-rose-700 font-medium">${product.price.toFixed(2)}</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;