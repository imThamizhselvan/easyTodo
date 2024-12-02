import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100">
      <div className="container mx-auto px-4 py-6 sm:py-12">
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8 sm:mb-12"
        >
          <motion.h1 
            className="text-4xl sm:text-6xl font-bold text-purple-600 mb-4 px-2"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            ✨ Easy Todo ✨
          </motion.h1>
          <motion.p 
            className="text-xl sm:text-2xl text-purple-500 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Make your tasks fun and easy to manage!
          </motion.p>
        </motion.div>

        <motion.button
          onClick={() => navigate('/login')}
          className="mx-auto block bg-purple-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-lg sm:text-xl font-semibold shadow-lg"
          whileHover={{ scale: 1.05, backgroundColor: '#9333ea' }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started →
        </motion.button>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 mt-8 sm:mt-16 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <motion.div 
            className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg"
            whileHover={{ y: -10 }}
          >
            <div className="text-3xl sm:text-4xl mb-4">🎯</div>
            <h3 className="text-lg sm:text-xl font-bold text-purple-600 mb-2">Simple Tasks</h3>
            <p className="text-purple-500">Easy to create and manage your daily tasks</p>
          </motion.div>

          <motion.div 
            className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg"
            whileHover={{ y: -10 }}
          >
            <div className="text-3xl sm:text-4xl mb-4">🎨</div>
            <h3 className="text-lg sm:text-xl font-bold text-purple-600 mb-2">Fun Design</h3>
            <p className="text-purple-500">Colorful and engaging interface</p>
          </motion.div>

          <motion.div 
            className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg sm:col-span-2 lg:col-span-1 sm:mx-auto lg:mx-0 w-full lg:w-auto"
            whileHover={{ y: -10 }}
          >
            <div className="text-3xl sm:text-4xl mb-4">🌟</div>
            <h3 className="text-lg sm:text-xl font-bold text-purple-600 mb-2">Achievements</h3>
            <p className="text-purple-500">Earn rewards as you complete tasks</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 