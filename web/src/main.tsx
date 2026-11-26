import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import AppShell from './AppShell.tsx';
import Login from './Login.tsx';
import { go, useRoute } from './route.ts';
import { ScreensMenu } from './ui.tsx';
import Chat from './screens/Chat.tsx';
import Focus from './screens/Focus.tsx';
import Goals from './screens/Goals.tsx';
import Onboarding from './screens/Onboarding.tsx';
import Settings from './screens/Settings.tsx';
import Summary from './screens/Summary.tsx';
import Today from './screens/Today.tsx';
import Week from './screens/Week.tsx';

// shortcut: demo "session" in localStorage; replace with Supabase Auth session when the backend is up.
const KEY = 'kutitap.demo';

function App() {
  const [signedIn, setSignedIn] = useState(() => localStorage.getItem(KEY) === '1');
  const route = useRoute();

  if (!signedIn) {
    return <Login onDemo={() => { localStorage.setItem(KEY, '1'); setSignedIn(true); go('onboarding/welcome'); }} />;
  }
  const logout = () => { localStorage.removeItem(KEY); setSignedIn(false); history.replaceState(null, '', location.pathname); };

  let screen;
  if (route.startsWith('onboarding/')) screen = <Onboarding step={route.slice(11) as Parameters<typeof Onboarding>[0]['step']} />;
  else if (route === 'chat') screen = <Chat />;
  else if (route === 'focus') screen = <Focus />;
  else {
    const pages: Record<string, React.ReactNode> = { today: <Today />, week: <Week />, goals: <Goals />, summary: <Summary />, settings: <Settings onLogout={logout} /> };
    const page = pages[route];
    screen = <AppShell>{page}</AppShell>;
  }
  return <>{screen}<ScreensMenu /></>;
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
