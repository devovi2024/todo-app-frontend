// client/src/components/Loader.jsx
/** Lightweight skeleton shown while initial data loads. */
export default function Loader() { return <div className="space-y-3" aria-label="Loading todos">{[1, 2, 3].map((item) => <div key={item} className="card h-24 animate-pulse bg-slate-100 dark:bg-slate-800" />)}</div>; }
