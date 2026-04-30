import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FormWrapper } from '../../components/reusableComponents/FormWrapper';
import { Input } from '../../components/reusableComponents/Input';
import { Select } from '../../components/reusableComponents/Select';
import { Button } from '../../components/reusableComponents/Button';
import heroShoe from '../../assets/hero-shoe.png';
import { registerUser } from '../../services/api/authServices';
import { useDispatch, useSelector } from 'react-redux';
import { authStart, authFailure, setLoading } from '../../features/auth/authSlice';
import { message } from "antd";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);
  
  const handleSubmit = async (data) => {
    try {
      dispatch(authStart());
      const response = await registerUser(data);
      dispatch(setLoading(false));
      navigate("/signin");
      message.success(`${response.user.name} registered successfully. Please login.`);
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
            scale: [1, 1.2, 1], 
            x: [0, 50, 0],
            y: [0, 30, 0] 
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[150px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2], 
            x: [0, -40, 0],
            y: [0, -20, 0] 
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px]" 
        />
      </div>

      {/* --- Visual Side (Left) --- */}
      <div className="hidden lg:flex flex-col justify-center items-center p-12 bg-slate-900/40 backdrop-blur-3xl border-r border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative z-10"
        >
          <motion.img 
            src={heroShoe} 
            alt="Premium Sneaker" 
            className="w-full max-w-[550px] drop-shadow-[0_50px_60px_rgba(37,99,235,0.25)]"
            animate={{ 
                y: [0, -25, 0],
                rotate: [0, 2, 0]
            }}
            transition={{ 
                duration: 6, 
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
          <h2 className="text-6xl font-black text-white tracking-tighter mb-4 leading-none">
            STEP INTO THE <br />
            <span className="bg-gradient-to-r from-blue-500 via-indigo-400 to-cyan-400 bg-clip-text text-transparent italic">
                FUTURE.
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-sm mx-auto leading-relaxed font-medium">
            Join our elite circle of sneakerheads and experience footwear innovation like never before.
          </p>
        </motion.div>

        {/* Floating Badges */}
        <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-20 left-20 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-xl"
        >
            <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Limited Access</span>
        </motion.div>
      </div>

      {/* --- Form Side (Right) --- */}
      <div className="flex items-center justify-center p-8 lg:p-20 relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md"
        >
          <motion.div variants={itemVariants} className="mb-12 text-center lg:text-left">
            <motion.div 
                whileHover={{ scale: 1.05 }}
                className="inline-block px-3 py-1 bg-blue-600/10 border border-blue-500/20 rounded-lg mb-6"
            >
                <span className="text-blue-400 text-[10px] font-black tracking-[0.2em] uppercase">Join the Movement</span>
            </motion.div>
            <h1 className="text-5xl font-black text-white tracking-tighter mb-4 leading-none">
              CREATE <span className="text-blue-500 italic">ACCOUNT</span>
            </h1>
            <p className="text-slate-500 font-medium text-lg">Your journey to excellence starts here.</p>
          </motion.div>

          <FormWrapper onSubmit={handleSubmit} className="space-y-6">
            <motion.div variants={itemVariants}>
              <Input 
                label="Full Name" 
                name="name" 
                placeholder="Enter your name" 
                rules={{ required: "We'd love to know your name" }}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <Input 
                label="Email Address"
                type="email" 
                name="email" 
                placeholder="name@example.com" 
                rules={{ 
                  required: "Email is required for updates", 
                  pattern: { 
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 
                    message: "Please enter a valid email" 
                  } 
                }}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <Input
                label="Secure Password"
                type="password"
                name="password"
                placeholder="••••••••"
                rules={{ 
                  required: "Password is required for security", 
                  minLength: { value: 6, message: "Password must be at least 6 characters" },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                    message: "Password must contain at least one uppercase letter, one lowercase letter, and one digit"
                  }
                }}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <Select 
                label="Role"
                name="role"
                options={[
                  { value: "User", label: "User" },
                  { value: "Admin", label: "Admin" }
                ]}
                rules={{ required: "Please select your interest" }}
              />
            </motion.div>

            <motion.div variants={itemVariants} className="pt-6">
              <Button 
                type="submit" 
                isLoading={isLoading}
                className="w-full py-5 text-lg tracking-[0.2em] shadow-[0_20px_50px_rgba(37,99,235,0.2)]"
              >
                JOIN THE CLUB
              </Button>
            </motion.div>
          </FormWrapper>

          <motion.p 
            variants={itemVariants}
            className="mt-12 text-center text-slate-500 font-medium"
          >
            Already a member?{" "}
            <Link to="/signin" className="text-blue-400 font-black hover:text-white transition-all duration-300 underline-offset-8 hover:underline decoration-2">
              SIGN IN
            </Link>
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default Signup;


