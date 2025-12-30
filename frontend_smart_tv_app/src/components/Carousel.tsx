import React, { useEffect, useMemo, useRef, useState } from 'react';

export type CarouselItem = {
  id: string;
  title: string;
  subtitle: string;
  /** Used for placeholder poster background. */
  posterColor?: string;
};

export type CarouselProps = {
  title: string;
  items: CarouselItem[];
  /**
   * Initial focused item index. If omitted, starts at 0.
   * Useful when restoring focus when navigating back to the view.
   */
  initialIndex?: number;
  /**
   * Called when user presses Enter on an item.
   */
  onSelect?: (item: CarouselItem) => void;
};

/**
 * PUBLIC_INTERFACE
 */
export function Carousel({ title, items, initialIndex = 0, onSelect }: CarouselProps) {
  const safeInitial = Math.min(Math.max(0, initialIndex), Math.max(0, items.length - 1));
  const [activeIndex, setActiveIndex] = useState<number>(safeInitial);

  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Keep active tile focused (TV/remote style navigation).
  useEffect(() => {
    itemRefs.current[activeIndex]?.focus();
  }, [activeIndex]);

  // Scroll the active tile into view within the horizontal rail.
  useEffect(() => {
    const el = itemRefs.current[activeIndex];
    if (!el) return;

    el.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest',
    });
  }, [activeIndex]);

  const canMoveLeft = activeIndex > 0;
  const canMoveRight = activeIndex < items.length - 1;

  const hintText = useMemo(() => {
    if (items.length <= 1) return 'Enter to select';
    return '←/→ to browse • Enter to select';
  }, [items.length]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // We only handle horizontal navigation here.
    // Parent views can handle Up/Down to move between rails/sections.
    switch (e.key) {
      case 'ArrowLeft':
        if (canMoveLeft) {
          e.preventDefault();
          setActiveIndex((i) => Math.max(0, i - 1));
        }
        break;
      case 'ArrowRight':
        if (canMoveRight) {
          e.preventDefault();
          setActiveIndex((i) => Math.min(items.length - 1, i + 1));
        }
        break;
      case 'Home':
        e.preventDefault();
        setActiveIndex(0);
        break;
      case 'End':
        e.preventDefault();
        setActiveIndex(items.length - 1);
        break;
      case 'Enter': {
        e.preventDefault();
        const current = items[activeIndex];
        if (current && onSelect) onSelect(current);
        break;
      }
      default:
        break;
    }
  };

  return (
    <section className="vodSection" aria-label={title}>
      <div className="vodSectionHeader">
        <h2 className="vodSectionTitle">{title}</h2>
        <div className="vodSectionHint" role="note">
          {hintText}
        </div>
      </div>

      <div
        className="carousel"
        ref={containerRef}
        role="region"
        aria-label={`${title} carousel`}
        onKeyDown={onKeyDown}
      >
        <div className="carouselRail" role="list">
          {items.map((item, idx) => {
            const isActive = idx === activeIndex;

            return (
              <button
                key={item.id}
                ref={(el) => {
                  itemRefs.current[idx] = el;
                }}
                type="button"
                role="listitem"
                className={`carouselTile ${isActive ? 'carouselTile--active' : ''}`}
                tabIndex={isActive ? 0 : -1}
                onFocus={() => setActiveIndex(idx)}
                onClick={() => onSelect?.(item)}
                aria-label={`${item.title}. ${item.subtitle}`}
              >
                <div
                  className="carouselPoster"
                  aria-hidden="true"
                  style={{
                    background: item.posterColor
                      ? `linear-gradient(135deg, ${item.posterColor}, rgba(255,255,255,0.12))`
                      : undefined,
                  }}
                />
                <div className="carouselMeta">
                  <div className="carouselTitle">{item.title}</div>
                  <div className="carouselSubtitle">{item.subtitle}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Carousel;
