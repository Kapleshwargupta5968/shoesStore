import React from 'react';
import { motion } from 'framer-motion';

const Newsletter = () => {
  return (
    <section className="py-24 bg-slate-950 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative rounded-[3rem] overflow-hidden"
        >
          {/* Background Decorative Elements */}
          <div className="absolute inset-0 bg-blue-600/10 pointer-events-none" />
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px]" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px]" />

          <div className="relative z-10 px-8 py-20 text-center max-w-4xl mx-auto backdrop-blur-3xl border border-white/10 rounded-[3rem]">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-blue-400 font-black tracking-[0.4em] uppercase text-xs mb-6 block"
            >
              Stay in the loop
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-6xl font-black text-white mb-8 tracking-tighter"
            >
              JOIN THE <br />
              <span className="text-transparent stroke-text">FUTURE CLUB.</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-slate-400 text-lg mb-12 max-w-xl mx-auto leading-relaxed"
            >
              Get early access to exclusive drops, members-only offers, and the latest news in footwear innovation.
            </motion.p>

            <motion.form 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
              onSubmit={(e) => e.preventDefault()}
            >
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-8 py-5 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-blue-500/50 transition-colors backdrop-blur-md placeholder:text-slate-500 font-medium"
              />
              <button className="px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black transition-all duration-300 shadow-xl shadow-blue-600/20 active:scale-95 whitespace-nowrap">
                JOIN NOW
              </button>
            </motion.form>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-slate-600 text-xs mt-8"
            >
              By joining, you agree to our Terms and Privacy Policy. No spam, just excellence.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
