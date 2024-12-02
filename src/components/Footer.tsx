import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <motion.footer 
      className="text-center py-4 mt-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <p className="text-purple-600 flex items-center justify-center gap-2">
        Made with 
        <motion.span
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <Heart className="w-4 h-4 text-red-500 fill-current" />
        </motion.span>
        by Thamil Murugesan
      </p>
    </motion.footer>
  );
} 