// client/src/hooks/useTodos.js
import { useContext } from 'react';
import { TodoContext } from '../context/TodoContext.jsx';

/** Access the Todo context with an informative provider error. */
export const useTodos = () => {
  const context = useContext(TodoContext);
  if (!context) throw new Error('useTodos must be used inside TodoProvider');
  return context;
};
