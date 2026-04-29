import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="group relative bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20 hover:border-blue-500/50">
      {/* Product Image */}
      <div className="aspect-square overflow-hidden bg-slate-900 flex items-center justify-center p-6">
        <img 
          src={product.imageUrl} 
          alt={product.title}
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
        />
        {/* Quick Add Overlay */}
        <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-full font-semibold transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg hover:bg-blue-500 active:scale-95">
                Quick Add
            </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-blue-500 font-bold mb-1 block">
              {product.category}
            </span>
            <Link to={`/product/${product.id}`}>
              <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                {product.title}
              </h3>
            </Link>
          </div>
          <p className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            ${product.price}
          </p>
        </div>
        
        <p className="text-slate-400 text-sm line-clamp-2 mb-4">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className={`w-4 h-4 ${star <= 4 ? 'text-yellow-400' : 'text-slate-600'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ))}
                <span className="text-xs text-slate-500 ml-1">(4.0)</span>
            </div>
            <button className="text-slate-300 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
