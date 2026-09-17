// client/src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App.jsx';
import { TodoProvider } from './context/TodoContext.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode><BrowserRouter><TodoProvider><App /><Toaster position="top-right" /></TodoProvider></BrowserRouter></React.StrictMode>
);
