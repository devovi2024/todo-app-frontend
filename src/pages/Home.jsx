// client/src/pages/Home.jsx
import { useMemo, useState } from 'react';
import TodoForm from '../components/TodoForm.jsx';
import TodoList from '../components/TodoList.jsx';
import Filter from '../components/Filter.jsx';
import Loader from '../components/Loader.jsx';
import { useTodos } from '../hooks/useTodos.js';
import { priorityRank } from '../utils/helpers.js';

export default function Home() {
  const { todos, loading, error, fetchTodos, createTodo, updateTodo, toggleTodo, deleteTodo, deleteCompleted } = useTodos();
  const [filter, setFilter] = useState('all'); const [search, setSearch] = useState(''); const [sort, setSort] = useState('date'); const [editing, setEditing] = useState(null);
  const visibleTodos = useMemo(() => todos.filter((todo) => (filter === 'active' ? !todo.completed : filter === 'completed' ? todo.completed : true) && todo.title.toLowerCase().includes(search.toLowerCase())).sort((a, b) => sort === 'priority' ? priorityRank[a.priority] - priorityRank[b.priority] : new Date(b.createdAt) - new Date(a.createdAt)), [todos, filter, search, sort]);
  const stats = { total: todos.length, completed: todos.filter((todo) => todo.completed).length, pending: todos.filter((todo) => !todo.completed).length };
  const confirmDelete = (id) => { if (window.confirm('Delete this task?')) deleteTodo(id); };
  return <div className="space-y-6"><TodoForm onSubmit={createTodo} /><section className="grid grid-cols-3 gap-3">{Object.entries(stats).map(([name, value]) => <div key={name} className="card p-3 text-center"><p className="text-2xl font-bold text-indigo-600">{value}</p><p className="text-xs font-medium capitalize text-slate-500">{name}</p></div>)}</section><Filter {...{ filter, setFilter, search, setSearch, sort, setSort }} /><section className="space-y-3"><div className="flex items-center justify-between"><h2 className="font-bold">Your tasks <span className="text-sm font-normal text-slate-500">({visibleTodos.length})</span></h2>{stats.completed > 0 && <button onClick={() => window.confirm('Remove all completed tasks?') && deleteCompleted()} className="text-sm font-medium text-rose-600 hover:underline">Clear completed</button>}</div>{loading ? <Loader /> : error ? <div className="card p-6 text-center"><p className="text-rose-600">{error}</p><button onClick={fetchTodos} className="btn-primary mt-3">Try again</button></div> : <TodoList todos={visibleTodos} onToggle={toggleTodo} onEdit={setEditing} onDelete={confirmDelete} />}</section>{editing && <TodoForm initialTodo={editing} onSubmit={async (values) => { await updateTodo(editing._id, values); setEditing(null); }} onCancel={() => setEditing(null)} />}</div>;
}
