import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Login from './Login.tsx';
import Today from './Today.tsx';

// shortcut: demo "session" in localStorage; replace with Supabase Auth session when the backend is up.
const KEY = 'kutitap.demo';

function App() {
  const [signedIn, setSignedIn] = useState(() => localStorage.getItem(KEY) === '1');
  const set = (v: boolean) => {
    v ? localStorage.setItem(KEY, '1') : localStorage.removeItem(KEY);
    setSignedIn(v);
  };
  return signedIn ? <Today onLogout={() => set(false)} /> : <Login onDemo={() => set(true)} />;
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
