import { useFormContext } from "react-hook-form";
import { motion } from "framer-motion";

export const Input = ({
    label,
    type,
    placeholder,
    name,
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
                <input
                    id={name}
                    type={type}
                    placeholder={placeholder}
                    {...register(name, rules)}
                    className={`
                        w-full px-6 py-4 bg-white/5 border outline-none rounded-[1.25rem] text-white 
                        transition-all duration-500 backdrop-blur-md placeholder:text-slate-600 font-medium
                        ${error 
                            ? 'border-rose-500/40 focus:border-rose-500 shadow-[0_0_25px_rgba(244,63,94,0.15)] bg-rose-500/5' 
                            : 'border-white/10 focus:border-blue-500/50 group-hover:border-white/20 focus:bg-white/10 shadow-none focus:shadow-[0_0_30px_rgba(37,99,235,0.15)]'
                        }
                    `}
                />
                
                {/* Subtle Glow Effect on Focus */}
                <div className={`absolute -inset-[1px] rounded-[1.25rem] pointer-events-none transition-opacity duration-500 opacity-0 group-focus-within:opacity-100 ${error ? 'bg-gradient-to-r from-rose-500/20 to-transparent' : 'bg-gradient-to-r from-blue-500/20 to-transparent'} -z-10`} />
            </div>

            {error && (
                <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-rose-500 text-[10px] font-black uppercase tracking-widest px-1 flex items-center gap-1.5"
                >
                    <span className="w-1 h-1 rounded-full bg-rose-500" />
                    {error.message}
                </motion.p>
            )}
        </div>
    );
};