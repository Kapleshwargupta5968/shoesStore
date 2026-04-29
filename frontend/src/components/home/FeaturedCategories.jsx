import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import runningImg from '../../assets/category-running.png';
import casualImg from '../../assets/category-casual.png';
import formalImg from '../../assets/category-formal.png';

const categories = [
  {
    id: 1,
    title: 'Running Performance',
    description: 'Engineered for speed and endurance.',
    image: runningImg,
    color: 'from-blue-600/20',
    tag: 'Popular',
    path: '/products?category=running'
  },
  {
    id: 2,
    title: 'Casual Lifestyle',
    description: 'Everyday comfort without compromising style.',
    image: casualImg,
    color: 'from-emerald-600/20',
    tag: 'New',
    path: '/products?category=casual'
  },
  {
    id: 3,
    title: 'Luxury Formal',
    description: 'Sophistication for your professional journey.',
    image: formalImg,
    color: 'from-amber-600/20',
    tag: 'Exclusive',
    path: '/products?category=formal'
  }
];

const FeaturedCategories = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="py-24 bg-slate-900/50 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
        >
          <div>
            <h2 className="text-5xl font-black text-white mb-4 tracking-tighter">Shop by Category</h2>
            <p className="text-slate-400 max-w-md text-lg">
              Find the perfect pair tailored to your lifestyle and activity.
            </p>
          </div>
          <Link to="/products" className="text-blue-500 font-black hover:text-blue-400 transition-colors flex items-center gap-2 group tracking-widest text-sm uppercase">
            Explore All 
            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-8"
        >
          {categories.map((cat) => (
            <motion.div key={cat.id} variants={itemVariants}>
              <Link to={cat.path} className="group relative h-[500px] rounded-[2.5rem] overflow-hidden cursor-pointer block">
                {/* Background Image */}
                <img 
                  src={cat.image} 
                  alt={cat.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                
                {/* Overlay Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} to-transparent opacity-60`} />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 p-10 w-full">
                  <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[10px] font-black text-white uppercase tracking-[0.3em] mb-6">
                    {cat.tag}
                  </span>
                  <h3 className="text-3xl font-black text-white mb-3 group-hover:text-blue-400 transition-colors tracking-tight">
                    {cat.title}
                  </h3>
                  <p className="text-slate-300 text-sm mb-8 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                    {cat.description}
                  </p>
                  <div className="flex items-center gap-3 text-white font-black text-xs tracking-widest uppercase">
                    <span>Explore</span>
                    <div className="w-10 h-[2px] bg-blue-500 group-hover:w-16 transition-all duration-500" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
