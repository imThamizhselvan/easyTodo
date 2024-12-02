import { useState, useEffect } from 'react';
import { Todo } from '../types/todo';
import { supabase } from '../lib/supabase';

export function useTodos(userId: string | undefined) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    
    // Fetch todos on mount
    fetchTodos();

    // Subscribe to changes from other clients
    const subscription = supabase
      .channel('todos')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'todos',
          filter: `user_id=eq.${userId}`
        }, 
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setTodos(current => [payload.new as Todo, ...current]);
          } else if (payload.eventType === 'DELETE') {
            setTodos(current => current.filter(todo => todo.id !== payload.old.id));
          } else if (payload.eventType === 'UPDATE') {
            setTodos(current => 
              current.map(todo => 
                todo.id === payload.new.id ? { ...todo, ...payload.new } : todo
              )
            );
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [userId]);

  async function fetchTodos() {
    try {
      const { data, error } = await supabase
        .from('todos')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTodos(data || []);
    } catch (error) {
      console.error('Error fetching todos:', error);
    } finally {
      setLoading(false);
    }
  }

  const addTodo = async (text: string) => {
    const emojis = ['🌟', '🦄', '🌈', '🎨', '🎮', '🦖', '🚀', '🎪'];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    
    try {
      const { data, error } = await supabase.from('todos').insert([
        {
          user_id: userId,
          text,
          completed: false,
          emoji: randomEmoji,
        },
      ]).select().single();

      if (error) throw error;
      
      // Optimistically update the local state
      if (data) {
        setTodos(current => [data, ...current]);
      }
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const toggleTodo = async (id: string) => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    // Optimistically update the UI
    setTodos(current =>
      current.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );

    try {
      const { error } = await supabase
        .from('todos')
        .update({ completed: !todo.completed })
        .eq('id', id);

      if (error) {
        // Revert on error
        setTodos(current =>
          current.map(t =>
            t.id === id ? { ...t, completed: todo.completed } : t
          )
        );
        throw error;
      }
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  };

  const deleteTodo = async (id: string) => {
    // Optimistically remove from UI
    const previousTodos = [...todos];
    setTodos(current => current.filter(todo => todo.id !== id));

    try {
      const { error } = await supabase
        .from('todos')
        .delete()
        .eq('id', id);

      if (error) {
        // Revert on error
        setTodos(previousTodos);
        throw error;
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return { todos, loading, addTodo, toggleTodo, deleteTodo };
}