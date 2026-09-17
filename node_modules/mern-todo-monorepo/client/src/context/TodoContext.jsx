// client/src/context/TodoContext.jsx
import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { todoApi } from '../services/api.js';

export const TodoContext = createContext(null);
const failureMessage = (error) => error.response?.data?.message || 'Something went wrong. Please try again.';

/** Provide todos plus optimistic CRUD operations to the app. */
export function TodoProvider({ children }) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const fetchTodos = useCallback(async () => {
    setLoading(true); setError('');
    try { const { data } = await todoApi.getAll(); setTodos(data.data); }
    catch (err) { setError(failureMessage(err)); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { fetchTodos(); }, [fetchTodos]);
  const runOptimistic = async (optimistic, request, successText, rollback) => {
    optimistic();
    try { const { data } = await request(); if (successText) toast.success(successText); return data.data; }
    catch (err) { rollback(); toast.error(failureMessage(err)); throw err; }
  };
  const createTodo = async (values) => {
    try { const { data } = await todoApi.create(values); setTodos((items) => [data.data, ...items]); toast.success('Todo added'); }
    catch (err) { toast.error(failureMessage(err)); throw err; }
  };
  const updateTodo = async (id, values) => {
    const previous = todos; const replacement = { ...todos.find((item) => item._id === id), ...values };
    await runOptimistic(() => setTodos((items) => items.map((item) => item._id === id ? replacement : item)), () => todoApi.update(id, values), 'Todo updated', () => setTodos(previous));
  };
  const toggleTodo = async (id) => {
    const previous = todos;
    await runOptimistic(() => setTodos((items) => items.map((item) => item._id === id ? { ...item, completed: !item.completed } : item)), () => todoApi.toggle(id), 'Status updated', () => setTodos(previous));
  };
  const deleteTodo = async (id) => {
    const previous = todos;
    await runOptimistic(() => setTodos((items) => items.filter((item) => item._id !== id)), () => todoApi.remove(id), 'Todo deleted', () => setTodos(previous));
  };
  const deleteCompleted = async () => {
    const previous = todos;
    await runOptimistic(() => setTodos((items) => items.filter((item) => !item.completed)), todoApi.removeCompleted, 'Completed todos cleared', () => setTodos(previous));
  };
  const value = useMemo(() => ({ todos, loading, error, fetchTodos, createTodo, updateTodo, toggleTodo, deleteTodo, deleteCompleted }), [todos, loading, error, fetchTodos]);
  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}
