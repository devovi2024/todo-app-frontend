// client/src/components/TodoList.jsx
import TodoItem from './TodoItem.jsx';

/** List todos or show a friendly empty state. */
export default function TodoList({ todos, onToggle, onEdit, onDelete }) {
  if (!todos.length) return <div className="card grid min-h-56 place-items-center p-8 text-center"><div><div className="mx-auto mb-3 grid h-16 w-16 place-items-center rounded-full bg-indigo-100 text-3xl dark:bg-indigo-950">✓</div><h2 className="font-bold">Nothing here yet</h2><p className="mt-1 text-sm text-slate-500">Enjoy the clear space, or add your next task above.</p></div></div>;
  return <div className="space-y-3">{todos.map((todo) => <TodoItem key={todo._id} todo={todo} onToggle={onToggle} onEdit={onEdit} onDelete={onDelete} />)}</div>;
}
