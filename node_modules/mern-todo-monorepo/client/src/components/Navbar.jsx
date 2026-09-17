// client/src/components/Navbar.jsx
import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && matchMedia('(prefers-color-scheme: dark)').matches));
  useEffect(() => { document.documentElement.classList.toggle('dark', dark); localStorage.setItem('theme', dark ? 'dark' : 'light'); }, [dark]);
  const navClass = ({ isActive }) => `rounded-md px-3 py-2 text-sm font-medium ${isActive ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300' : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'}`;
  return <header className="border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90"><nav className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3 sm:px-6" aria-label="Main navigation"><Link to="/" className="text-lg font-bold tracking-tight text-indigo-600">✓ Focus Todo</Link><div className="flex items-center gap-1"><NavLink to="/" end className={navClass}>Tasks</NavLink><NavLink to="/about" className={navClass}>About</NavLink><button aria-label="Toggle dark mode" onClick={() => setDark((value) => !value)} className="ml-1 rounded-lg p-2 text-lg hover:bg-slate-100 dark:hover:bg-slate-800">{dark ? '☀️' : '🌙'}</button></div></nav></header>;
}
