import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductCard from '../shared/ProductCard';

// Mock data for initial landing page display
const mockProducts = [
  {
    id: 1,
    title: 'Velocity Pro X',
    description: 'High-performance running shoe with carbon fiber plate.',
    price: 189,
    category: 'Running',
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 2,
    title: 'Urban Glide 2.0',
    description: 'Minimalist casual sneaker for all-day comfort.',
    price: 120,
    category: 'Casual',
    imageUrl: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 3,
    title: 'Heritage Oxford',
    description: 'Handcrafted Italian leather formal shoes.',
    price: 250,
    category: 'Formal',
    imageUrl: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 4,
    title: 'Apex Trailblazer',
    description: 'Rugged outdoor shoes for the toughest terrains.',
    price: 145,
    category: 'Sports',
    imageUrl: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 5,
    title: 'Cloud Walkers',
    description: 'Ultra-lightweight walking shoes with memory foam.',
    price: 95,
    category: 'Casual',
    imageUrl: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 6,
    title: 'Bolt Sprint',
    description: 'Aerodynamic track spikes for elite sprinters.',
    price: 210,
    category: 'Running',
    imageUrl: 'https://images.unsplash.com/photo-1512374382149-4332c6c021f1?auto=format&fit=crop&q=80&w=800'
  }
];

const PopularProducts = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="py-24 bg-slate-900">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-black text-white mb-6 tracking-tighter">Trending Now</h2>
          <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full mb-8" />
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Discover our most popular picks this season. From high-performance athletics to sophisticated classics.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {mockProducts.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <Link to="/products" className="inline-block px-12 py-5 bg-transparent border-2 border-slate-700 hover:border-blue-500 text-white rounded-2xl font-black tracking-widest text-xs transition-all duration-500 hover:shadow-[0_0_30px_rgba(37,99,235,0.2)] active:scale-95">
            VIEW ALL COLLECTIONS
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PopularProducts;
