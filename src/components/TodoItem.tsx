import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, Star } from 'lucide-react';
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
        className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 sm:border-3 border-purple-400 flex items-center justify-center"
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
            className="relative"
          >
            <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 absolute" 
              style={{ filter: 'drop-shadow(0 0 4px rgba(250, 204, 21, 0.4))' }}
            />
            <motion.div
              initial={{ scale: 1.5, opacity: 1 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-4 h-4 sm:w-5 sm:h-5 bg-yellow-400 rounded-full absolute"
            />
          </motion.div>
        )}
      </motion.button>

      <span className="text-xl sm:text-2xl">{todo.emoji}</span>
      
      <motion.span
        layout
        className={`flex-grow text-base sm:text-lg ${
          todo.completed ? 'line-through text-gray-400' : 'text-gray-700'
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