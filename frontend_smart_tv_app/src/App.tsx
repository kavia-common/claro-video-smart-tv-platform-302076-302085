import React, { useEffect, useMemo, useRef, useState } from 'react';
import './App.css';

type Theme = 'light' | 'dark';

type Tile = {
  id: string;
  title: string;
  subtitle: string;
};

const GRID_COLS = 4;

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState<Theme>('light');
  const [focusedIndex, setFocusedIndex] = useState<number>(0);

  const tiles: Tile[] = useMemo(
    () => [
      { id: 'epg', title: 'EPG', subtitle: 'Program guide' },
      { id: 'vod', title: 'VOD', subtitle: 'Movies & series' },
      { id: 'live', title: 'Live', subtitle: 'Watch now' },
      { id: 'recordings', title: 'Recordings', subtitle: 'Your saved shows' },
      { id: 'search', title: 'Search', subtitle: 'Find content' },
      { id: 'profiles', title: 'Profiles', subtitle: 'Switch user' },
      { id: 'settings', title: 'Settings', subtitle: 'Preferences' },
      { id: 'help', title: 'Help', subtitle: 'Support' }
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
        case 'Enter':
          e.preventDefault();
          // eslint-disable-next-line no-alert
          alert(`Selected: ${tiles[focusedIndex]?.title ?? 'Unknown'}`);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [focusedIndex, tiles]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

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
                >
                  <div className="tvTileTitle">{t.title}</div>
                  <div className="tvTileSubtitle">{t.subtitle}</div>
                </button>
              );
            })}
          </div>

          <p className="tvFooterNote">
            Placeholder only. Connect real EPG/VOD modules later without adding extra libraries.
          </p>
        </section>
      </main>
    </div>
  );
}

export default App;
