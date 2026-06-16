import React from 'react';
import { MapPin, Calendar, Star } from 'lucide-react';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="aspect-w-16 aspect-h-9">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {product.name}
            </h3>
            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
              {product.description}
            </p>
          </div>
          <div className="flex items-center space-x-1 space-x-reverse">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600">4.8</span>
          </div>
        </div>

        <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-500 mb-3">
          <MapPin className="w-4 h-4" />
          <span>{product.location}</span>
          <Calendar className="w-4 h-4 mr-2" />
          <span>تم الحصاد {new Date(product.harvestDate).toLocaleDateString('ar-EG')}</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-primary-600">
              {product.price.toLocaleString('ar-EG')}
            </span>
            <span className="text-gray-500 mr-1">جنيه/{product.unit}</span>
          </div>
          <div className="text-sm text-gray-500">
            متوفر: {product.quantity} {product.unit}
          </div>
        </div>

        <button className="w-full mt-4 bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
          إضافة للسلة
        </button>
      </div>
    </div>
  );
};

export default ProductCard;