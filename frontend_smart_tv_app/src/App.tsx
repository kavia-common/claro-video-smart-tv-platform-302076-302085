import React, { useEffect, useMemo, useRef, useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import VodPage from './pages/VodPage';

type Theme = 'light' | 'dark';

type Tile = {
  id: string;
  title: string;
  subtitle: string;
  route?: string;
};

const GRID_COLS = 4;

function AppShell() {
  const navigate = useNavigate();

  const [theme, setTheme] = useState<Theme>('light');
  const [focusedIndex, setFocusedIndex] = useState<number>(0);

  const tiles: Tile[] = useMemo(
    () => [
      { id: 'epg', title: 'EPG', subtitle: 'Program guide' },
      { id: 'vod', title: 'VOD', subtitle: 'Movies & series', route: '/vod' },
      { id: 'live', title: 'Live', subtitle: 'Watch now' },
      { id: 'recordings', title: 'Recordings', subtitle: 'Your saved shows' },
      { id: 'search', title: 'Search', subtitle: 'Find content' },
      { id: 'profiles', title: 'Profiles', subtitle: 'Switch user' },
      { id: 'settings', title: 'Settings', subtitle: 'Preferences' },
      { id: 'help', title: 'Help', subtitle: 'Support' },
    ],
    [],
  );

  const tileRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    tileRefs.current[focusedIndex]?.focus();
  }, [focusedIndex]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      // Home grid navigation only; the VOD page has its own handlers.
      // If we're not on "/" we do nothing here.
      if (window.location.pathname !== '/') return;

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          setFocusedIndex((idx) => Math.max(0, idx - 1));
          break;
        case 'ArrowRight':
          e.preventDefault();
          setFocusedIndex((idx) => Math.min(tiles.length - 1, idx + 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setFocusedIndex((idx) => Math.max(0, idx - GRID_COLS));
          break;
        case 'ArrowDown':
          e.preventDefault();
          setFocusedIndex((idx) => Math.min(tiles.length - 1, idx + GRID_COLS));
          break;
        case 'Enter': {
          e.preventDefault();
          const selected = tiles[focusedIndex];
          if (selected?.route) {
            navigate(selected.route);
            return;
          }
          // eslint-disable-next-line no-alert
          alert(`Selected: ${selected?.title ?? 'Unknown'}`);
          break;
        }
        default:
          break;
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [focusedIndex, navigate, tiles]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const Home = (
    <main className="tvMain">
      <section className="tvSection" aria-label="Main menu">
        <h2 className="tvSectionTitle">Sections</h2>

        <div className="tvGrid" role="grid" aria-label="Navigation grid">
          {tiles.map((t, idx) => {
            const isFocused = idx === focusedIndex;

            return (
              <button
                key={t.id}
                ref={(el) => {
                  tileRefs.current[idx] = el;
                }}
                className={`tvTile ${isFocused ? 'tvTile--focused' : ''}`}
                type="button"
                role="gridcell"
                tabIndex={idx === focusedIndex ? 0 : -1}
                onFocus={() => setFocusedIndex(idx)}
                onClick={() => {
                  if (t.route) navigate(t.route);
                }}
              >
                <div className="tvTileTitle">{t.title}</div>
                <div className="tvTileSubtitle">{t.subtitle}</div>
              </button>
            );
          })}
        </div>

        <p className="tvFooterNote">
          Use Arrow keys + Enter. VOD is now a real routed page with a carousel.
        </p>
      </section>
    </main>
  );

  return (
    <div className="App">
      <header className="tvHeader">
        <div className="tvBrand">
          <div className="tvLogo" aria-hidden="true" />
          <div className="tvBrandText">
            <div className="tvTitle">Claro Video</div>
            <div className="tvSubtitle">Smart TV Starter UI</div>
          </div>
        </div>

        <div className="tvHeaderRight">
          <div className="tvHint" role="note">
            Use Arrow keys + Enter
          </div>
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            type="button"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? 'Dark' : 'Light'}
          </button>
        </div>
      </header>

      <Routes>
        <Route path="/" element={Home} />
        <Route
          path="/vod"
          element={
            <VodPage
              onBack={() => {
                navigate('/');
              }}
            />
          }
        />
      </Routes>
    </div>
  );
}

// PUBLIC_INTERFACE
function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}

export default App;
