import React from 'react';
import { motion } from 'framer-motion';

export const Button = ({ 
    children, 
    type = "button", 
    variant = "primary", 
    className = "", 
    isLoading = false,
    ...props 
}) => {
    const variants = {
        primary: "bg-blue-600 text-white shadow-[0_0_40px_rgba(37,99,235,0.3)] hover:bg-blue-500 hover:shadow-blue-500/40",
        secondary: "bg-white/5 text-white border border-white/10 hover:bg-white/10 backdrop-blur-xl",
        outline: "bg-transparent text-white border-2 border-blue-600 hover:bg-blue-600/10",
        ghost: "bg-transparent text-slate-400 hover:text-white hover:bg-white/5",
        danger: "bg-rose-600 text-white shadow-[0_0_40px_rgba(244,63,94,0.3)] hover:bg-rose-500 hover:shadow-rose-500/40"
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type={type}
            disabled={isLoading}
            className={`
                relative px-10 py-4.5 rounded-[1.25rem] font-black transition-all duration-300 
                flex items-center justify-center gap-2 overflow-hidden group
                disabled:opacity-50 disabled:cursor-not-allowed
                ${variants[variant]}
                ${className}
            `}
            {...props}
        >
            {/* Glossy Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            
            {isLoading ? (
                <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Processing...</span>
                </div>
            ) : children}
        </motion.button>
    );
};
