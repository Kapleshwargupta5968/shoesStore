import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FormWrapper } from '../../components/reusableComponents/FormWrapper';
import { Input } from '../../components/reusableComponents/Input';
import { Button } from '../../components/reusableComponents/Button';
import signinShoe from '../../assets/category-running.png';
import { loginUser } from '../../services/api/authServices';
import { useDispatch, useSelector } from 'react-redux';
import { authStart, authSuccess, authFailure } from '../../features/auth/authSlice';
import { message } from "antd";

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  const handleSubmit = async (data) => {
    try {
      dispatch(authStart());
      const response = await loginUser(data);
      dispatch(authSuccess(response));
      navigate("/dashboard");
      message.success(`Welcome back! ${response?.user?.name}`);
    } catch (error) {
      const errorMsg = error?.response?.data?.message || "Something went wrong";
      dispatch(authFailure(errorMsg));
      message.error(errorMsg);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.1, 
        delayChildren: 0.2 
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section className="min-h-screen grid lg:grid-cols-2 bg-slate-950 overflow-hidden relative">
      {/* --- Animated Background Blobs --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1.2, 1.3, 1.2], 
            x: [0, -30, 0],
            y: [0, 50, 0] 
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/4 -left-1/4 w-[700px] h-[700px] bg-indigo-600/10 rounded-full blur-[150px]" 
        />
      </div>

      {/* --- Form Side (Left) --- */}
      <div className="flex items-center justify-center p-8 lg:p-20 relative z-10 order-2 lg:order-1">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md"
        >
          <motion.div variants={itemVariants} className="mb-12 text-center lg:text-left">
            <motion.div 
                whileHover={{ scale: 1.05 }}
                className="inline-block px-3 py-1 bg-indigo-600/10 border border-indigo-500/20 rounded-lg mb-6"
            >
                <span className="text-indigo-400 text-[10px] font-black tracking-[0.2em] uppercase">Welcome Back</span>
            </motion.div>
            <h1 className="text-5xl font-black text-white tracking-tighter mb-4 leading-none">
              SIGN <span className="text-indigo-500 italic">IN</span>
            </h1>
            <p className="text-slate-500 font-medium text-lg">Great to see you again. Ready for more?</p>
          </motion.div>

          <FormWrapper onSubmit={handleSubmit} className="space-y-6">
            <motion.div variants={itemVariants}>
              <Input 
                label="Email Address"
                type="email" 
                name="email" 
                placeholder="name@example.com" 
                rules={{ 
                  required: "We need your email to find you", 
                  pattern: { 
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 
                    message: "Please enter a valid email" 
                  } 
                }}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="relative">
                <Input
                  label="Password"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  rules={{ 
                    required: "Password is required", 
                    minLength: { value: 8, message: "Password must be at least 8 characters" } 
                  }}
                />
                <Link to="/forgot-password" size="sm" className="absolute top-0 right-1 text-[10px] font-bold text-indigo-500 hover:text-white transition-colors uppercase tracking-widest">
                  Forgot?
                </Link>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-6">
              <Button 
                type="submit" 
                variant="primary" 
                isLoading={isLoading}
                className="w-full py-5 text-lg tracking-[0.2em] bg-indigo-600 shadow-[0_20px_50px_rgba(79,70,229,0.2)] hover:bg-indigo-500"
              >
                SIGN IN
              </Button>
            </motion.div>
          </FormWrapper>

          <motion.p 
            variants={itemVariants}
            className="mt-12 text-center text-slate-500 font-medium"
          >
            New to the club?{" "}
            <Link to="/signup" className="text-indigo-400 font-black hover:text-white transition-all duration-300 underline-offset-8 hover:underline decoration-2">
              CREATE ACCOUNT
            </Link>
          </motion.p>
        </motion.div>
      </div>

      {/* --- Visual Side (Right) --- */}
      <div className="hidden lg:flex flex-col justify-center items-center p-12 bg-slate-900/40 backdrop-blur-3xl border-l border-white/5 relative overflow-hidden order-1 lg:order-2">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(79,70,229,0.05)_0%,_transparent_70%)]" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative z-10"
        >
          <motion.img 
            src={signinShoe} 
            alt="Running Sneaker" 
            className="w-full max-w-[500px] drop-shadow-[0_50px_60px_rgba(79,70,229,0.25)]"
            animate={{ 
                y: [0, 20, 0],
                rotate: [0, -2, 0]
            }}
            transition={{ 
                duration: 5, 
                repeat: Infinity, 
                ease: "easeInOut" 
            }}
          />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center mt-12 relative z-10"
        >
          <h2 className="text-6xl font-black text-white tracking-tighter mb-4 leading-none uppercase text-center lg:text-left">
            Keep <br />
            <span className="bg-gradient-to-r from-indigo-500 via-purple-400 to-pink-400 bg-clip-text text-transparent italic">
                Moving.
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-sm mx-auto lg:mx-0 leading-relaxed font-medium">
            Your goals don't wait. Sign in to track your orders and access your personalized collection.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Signin;

