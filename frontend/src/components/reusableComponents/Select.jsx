import React from 'react';
import { useFormContext } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";

export const Select = ({
    label,
    name,
    options = [],
    rules = {},
    className = ""
}) => {
    const { register, formState: { errors } } = useFormContext();
    const error = errors[name];

    return (
        <div className={`flex flex-col gap-2.5 w-full ${className}`}>
            {label && (
                <label 
                    htmlFor={name}
                    className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 px-1"
                >
                    {label}
                </label>
            )}
            
            <div className="relative group">
                <select
                    id={name}
                    {...register(name, rules)}
                    className={`
                        w-full px-6 py-4 bg-white/5 border outline-none rounded-[1.25rem] text-white 
                        transition-all duration-500 backdrop-blur-md font-medium appearance-none cursor-pointer
                        ${error 
                            ? 'border-rose-500/40 focus:border-rose-500 shadow-[0_0_25px_rgba(244,63,94,0.15)]' 
                            : 'border-white/10 focus:border-blue-500/50 group-hover:border-white/20 focus:bg-white/10 shadow-none focus:shadow-[0_0_30px_rgba(37,99,235,0.15)]'
                        }
                    `}
                >
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value} className="bg-slate-900 text-white">
                            {opt.label}
                        </option>
                    ))}
                </select>
                
                {/* Custom Arrow */}
                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 group-focus-within:text-blue-500 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {error && (
                    <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-rose-500 text-[10px] font-black uppercase tracking-widest px-1 flex items-center gap-1.5"
                    >
                        <span className="w-1 h-1 rounded-full bg-rose-500" />
                        {error.message}
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    );
};

