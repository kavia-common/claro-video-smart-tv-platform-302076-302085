import React, { useEffect, useMemo, useRef, useState } from 'react';
import Carousel, { CarouselItem } from '../components/Carousel';
import { MOCK_VOD_SECTIONS } from '../vod/mockVod';

type VodPageProps = {
  onBack: () => void;
};

function mapToCarouselItems(): { featured: CarouselItem[]; recommended: CarouselItem[] } {
  const featuredSection = MOCK_VOD_SECTIONS.find((s) => s.id === 'featured') ?? MOCK_VOD_SECTIONS[0];
  const recommendedSection =
    MOCK_VOD_SECTIONS.find((s) => s.id === 'because-you-watched') ?? MOCK_VOD_SECTIONS[1];

  const featured: CarouselItem[] =
    featuredSection?.items.map((i) => ({
      id: i.id,
      title: i.title,
      subtitle: `${i.year} • ${i.rating} • ${i.match}% match`,
      posterColor: i.posterColor,
    })) ?? [];

  const recommended: CarouselItem[] =
    recommendedSection?.items.map((i) => ({
      id: i.id,
      title: i.title,
      subtitle: `${i.year} • ${i.rating} • ${i.durationMinutes} min`,
      posterColor: i.posterColor,
    })) ?? [];

  return { featured, recommended };
}

/**
 * PUBLIC_INTERFACE
 */
export function VodPage({ onBack }: VodPageProps) {
  const { featured, recommended } = useMemo(() => mapToCarouselItems(), []);
  const [activeRail, setActiveRail] = useState<number>(0);

  const railWrappersRef = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    // Focus the active rail wrapper so arrow keys reach its Carousel handler.
    railWrappersRef.current[activeRail]?.focus();
  }, [activeRail]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      // Global page navigation
      switch (e.key) {
        case 'Escape':
        case 'Backspace':
          e.preventDefault();
          onBack();
          break;
        case 'ArrowUp':
          e.preventDefault();
          setActiveRail((r) => Math.max(0, r - 1));
          break;
        case 'ArrowDown':
          e.preventDefault();
          setActiveRail((r) => Math.min(1, r + 1));
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onBack]);

  return (
    <div className="vodPage" aria-label="VOD">
      <header className="pageHeader">
        <div className="pageHeaderLeft">
          <div className="pageTitle">VOD</div>
          <div className="pageSubtitle">Browse featured content</div>
        </div>

        <div className="pageHeaderRight">
          <button className="btnBack" type="button" onClick={onBack}>
            Back
          </button>
        </div>
      </header>

      <main className="vodMain">
        <div
          className={`railWrapper ${activeRail === 0 ? 'railWrapper--active' : ''}`}
          ref={(el) => {
            railWrappersRef.current[0] = el;
          }}
          tabIndex={activeRail === 0 ? 0 : -1}
          aria-label="Featured rail wrapper"
          onFocus={() => setActiveRail(0)}
        >
          <Carousel
            title="Featured"
            items={featured}
            onSelect={(item) => {
              // eslint-disable-next-line no-alert
              alert(`Play: ${item.title}`);
            }}
          />
        </div>

        <div
          className={`railWrapper ${activeRail === 1 ? 'railWrapper--active' : ''}`}
          ref={(el) => {
            railWrappersRef.current[1] = el;
          }}
          tabIndex={activeRail === 1 ? 0 : -1}
          aria-label="Recommended rail wrapper"
          onFocus={() => setActiveRail(1)}
        >
          <Carousel
            title="Because you watched Sci‑Fi"
            items={recommended}
            onSelect={(item) => {
              // eslint-disable-next-line no-alert
              alert(`Details: ${item.title}`);
            }}
          />
        </div>

        <p className="tvFooterNote">
          Up/Down switches rails • Left/Right browses • Enter selects • Back/Esc returns
        </p>
      </main>
    </div>
  );
}

export default VodPage;
