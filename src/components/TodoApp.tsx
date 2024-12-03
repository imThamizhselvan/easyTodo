import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, Sparkles, Star, Party } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { TodoItem } from './TodoItem';
import { TodoInput } from './TodoInput';
import { useAuth } from '../hooks/useAuth';
import { useTodos } from '../hooks/useTodos';
import { supabase } from '../lib/supabase';
import { Footer } from './Footer';

export function TodoApp() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { todos, loading: todosLoading, addTodo, toggleTodo, deleteTodo } = useTodos(user?.id);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 flex flex-col relative">
      {/* Hello Kitty background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.08] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://wallpapers-clan.com/wp-content/uploads/2024/07/hello-kitty-cute-background-background-scaled.jpg')`,
          filter: 'saturate(0.8) brightness(1.2)'
        }}
      />
      
      {/* Content overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100/90 to-purple-100/90 pointer-events-none" />

      <div className="flex-grow py-6 sm:py-12 px-4 relative">
        <div className="max-w-2xl mx-auto relative">
          <motion.button
            onClick={handleSignOut}
            className="absolute right-2 sm:right-0 top-2 text-purple-500 hover:text-purple-700 transition-colors z-50 bg-white/50 p-2 rounded-full backdrop-blur-sm"
            title="Sign Out"
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
          >
            <LogOut size={20} className="sm:w-6 sm:h-6" />
          </motion.button>

          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center mb-8 sm:mb-12"
          >
            <motion.div className="mb-4 sm:mb-6 pt-2">
              <h1 className="text-4xl sm:text-6xl font-bold text-purple-600 mb-4 flex items-center justify-center gap-2 sm:gap-3">
                <Sparkles className="text-yellow-400 w-6 h-6 sm:w-8 sm:h-8" />
                ✨ Easy Todo ✨
                <Sparkles className="text-yellow-400 w-6 h-6 sm:w-8 sm:h-8" />
              </h1>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-lg sm:text-xl text-purple-500 px-4"
              >
                Welcome, {user?.email}! Let's make tasks fun! 🎉
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <TodoInput onAdd={addTodo} />
          </motion.div>

          {todosLoading ? (
            <div className="space-y-4 mt-8">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
                  className="bg-white/50 backdrop-blur-sm p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <motion.div
                      animate={{ scale: [1, 0.8, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
                      className="w-6 h-6 rounded-full bg-purple-200"
                    />
                    <div className="flex-1 space-y-2">
                      <motion.div 
                        className="h-4 bg-purple-200 rounded w-3/4"
                        animate={{ opacity: [0.5, 0.7, 0.5] }}
                        transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
                      />
                      <motion.div 
                        className="h-3 bg-purple-200/70 rounded w-1/2"
                        animate={{ opacity: [0.3, 0.5, 0.3] }}
                        transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <AnimatePresence mode="popLayout">
                {todos.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {!todosLoading && todos.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center text-gray-500 mt-12 bg-white p-8 rounded-2xl shadow-lg"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-4xl mb-4"
              >
                🌈
              </motion.div>
              <h3 className="text-xl font-bold text-purple-600 mb-2">
                No tasks yet!
              </h3>
              <p className="text-purple-500">
                Add some fun things to do and start earning stars! ⭐
              </p>
            </motion.div>
          )}

          {todos.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-center mt-8 text-purple-500"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-2xl"
              >
                {todos.filter(t => t.completed).length} / {todos.length} tasks completed! 🎯
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
} 