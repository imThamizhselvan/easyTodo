import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PlusCircle } from 'lucide-react';

interface TodoInputProps {
  onAdd: (text: string) => void;
}

export function TodoInput({ onAdd }: TodoInputProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 sm:mb-8">
      <div className="flex gap-2 sm:gap-3">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task..."
          className="flex-grow p-3 sm:p-4 rounded-lg border-2 border-purple-300 focus:border-purple-500 focus:outline-none text-base sm:text-lg"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-purple-500 text-white px-4 sm:px-6 rounded-lg flex items-center gap-1 sm:gap-2 hover:bg-purple-600 transition-colors"
        >
          <PlusCircle size={20} className="sm:w-6 sm:h-6" />
          <span className="hidden sm:inline">Add</span>
        </motion.button>
      </div>
    </form>
  );
}