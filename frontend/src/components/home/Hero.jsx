import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import heroShoe from '../../assets/hero-shoe.png';
import InteractiveCanvas from './InteractiveCanvas';
import CountUp from '../shared/CountUp';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] },
    },
  };

  const imageVariants = {
    hidden: { x: 100, opacity: 0, scale: 0.8 },
    visible: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { 
        duration: 1.2, 
        ease: [0.6, -0.05, 0.01, 0.99],
        delay: 0.5 
      },
    },
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden py-20 bg-slate-950">
      {/* --- Interactive Canvas Effect --- */}
      <InteractiveCanvas />

      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Text Content */}
        <motion.div 
          className="space-y-8 max-w-2xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            variants={itemVariants}
            className="inline-block px-4 py-1.5 bg-blue-600/10 border border-blue-500/20 rounded-full"
          >
            <span className="text-blue-400 text-sm font-bold tracking-wider uppercase">New Arrival 2024</span>
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="text-6xl md:text-8xl font-black leading-[0.9] text-white tracking-tighter"
          >
            Elevate Your <br />
            <span className="bg-gradient-to-r from-blue-500 via-indigo-400 to-cyan-400 bg-clip-text text-transparent italic">
              Every Step.
            </span>
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-slate-400 text-lg md:text-xl max-w-lg leading-relaxed font-medium"
          >
            Experience the perfect fusion of futuristic design and ultimate comfort. Our new collection is engineered for performance and styled for the streets.
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap items-center gap-6"
          >
            <Link to="/products" className="group relative px-10 py-5 bg-blue-600 text-white rounded-2xl font-black transition-all duration-500 overflow-hidden shadow-[0_0_40px_rgba(37,99,235,0.3)] hover:scale-105 active:scale-95">
              <span className="relative z-10 flex items-center gap-2">
                SHOP COLLECTION
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </Link>
            
            <Link to="/products" className="px-10 py-5 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl font-bold transition-all duration-300 backdrop-blur-xl hover:border-white/20 active:scale-95">
              VIEW TRENDS
            </Link>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="flex items-center gap-12 pt-8 border-t border-slate-800"
          >
            <div className="space-y-1">
              <p className="text-3xl font-black text-white">
                <CountUp end={15} suffix="k+" />
              </p>
              <p className="text-slate-500 text-xs uppercase tracking-widest font-bold">Customers</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-black text-white">
                <CountUp end={500} suffix="+" />
              </p>
              <p className="text-slate-500 text-xs uppercase tracking-widest font-bold">Styles</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-black text-white">
                <CountUp end={4.9} decimals={1} suffix="/5" />
              </p>
              <p className="text-slate-500 text-xs uppercase tracking-widest font-bold">Rating</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Hero Image */}
        <motion.div 
          className="relative lg:h-[700px] flex items-center justify-center"
          variants={imageVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="absolute w-[120%] h-[120%] bg-blue-500/10 rounded-full blur-[120px] animate-pulse pointer-events-none" />
          <motion.img 
            src={heroShoe} 
            alt="Premium Sneaker" 
            className="relative z-10 w-full max-w-[650px] object-contain drop-shadow-[0_50px_50px_rgba(0,0,0,0.5)] drop-shadow-blue"
            animate={{ 
              y: [0, -20, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          {/* Floating Badge */}
          <motion.div 
            className="absolute top-1/4 right-0 bg-slate-900/80 backdrop-blur-md border border-slate-700 p-6 rounded-[2rem] shadow-2xl"
            animate={{ 
              y: [0, 15, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <p className="text-blue-500 font-black text-xl">40% OFF</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Limited Edition</p>
          </motion.div>
        </motion.div>
      </div>
      
    </section>
  );
};

export default Hero;
