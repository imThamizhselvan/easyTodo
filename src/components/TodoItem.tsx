import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, Star, Check } from 'lucide-react';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      whileHover={{ scale: 1.02 }}
      className="flex items-center gap-2 sm:gap-4 bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-md mb-3 sm:mb-4 relative overflow-hidden"
    >
      <motion.button
        onClick={() => onToggle(todo.id)}
        className={`flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 sm:border-3 
          ${todo.completed 
            ? 'bg-purple-500 border-purple-500' 
            : 'border-purple-400 hover:border-purple-500'
          } 
          flex items-center justify-center transition-colors`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {todo.completed && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20
            }}
            className="relative flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" strokeWidth={3} />
            </motion.div>
            
            <motion.div
              initial={{ scale: 0.5, opacity: 1 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 bg-purple-400 rounded-full"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0] }}
              transition={{ duration: 0.6 }}
              className="absolute"
            >
              <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 absolute -top-2 -right-2" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0] }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="absolute"
            >
              <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 absolute -bottom-2 -left-2" />
            </motion.div>
          </motion.div>
        )}
      </motion.button>

      <span className="text-xl sm:text-2xl">{todo.emoji}</span>
      
      <motion.span
        layout
        className={`flex-grow text-base sm:text-lg ${
          todo.completed 
            ? 'line-through text-gray-400' 
            : 'text-gray-700'
        }`}
        animate={{
          scale: todo.completed ? 0.95 : 1,
        }}
      >
        {todo.text}
      </motion.span>

      <motion.button
        onClick={() => onDelete(todo.id)}
        className="text-red-400 hover:text-red-600 transition-colors"
        whileHover={{ scale: 1.1, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
      >
        <Trash2 size={18} className="sm:w-5 sm:h-5" />
      </motion.button>

      {todo.completed && (
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          className="absolute bottom-0 left-0 h-0.5 sm:h-1 bg-gradient-to-r from-purple-400 to-pink-400"
        />
      )}
    </motion.div>
  );
}