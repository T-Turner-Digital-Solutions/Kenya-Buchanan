"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** True when the visitor has asked for reduced motion. */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(query.matches);
    const frame = window.requestAnimationFrame(sync);
    query.addEventListener("change", sync);
    return () => {
      window.cancelAnimationFrame(frame);
      query.removeEventListener("change", sync);
    };
  }, []);

  return reduced;
}

interface CarouselOptions {
  count: number;
  /** Milliseconds between automatic advances. 0 disables autoplay. */
  interval?: number;
  loop?: boolean;
}

/**
 * Shared carousel behaviour: autoplay that yields to the visitor, pointer
 * dragging, keyboard control and reduced-motion support.
 *
 * Autoplay stops permanently once someone takes control — a carousel that
 * keeps moving under the hand is the fastest way to feel cheap.
 */
export function useCarousel({ count, interval = 0, loop = true }: CarouselOptions) {
  const [index, setIndex] = useState(0);
  const [engaged, setEngaged] = useState(false);
  const [hovering, setHovering] = useState(false);
  const reducedMotion = useReducedMotion();
  const dragStart = useRef<{ x: number; y: number } | null>(null);
  const dragged = useRef(false);

  const clamp = useCallback(
    (next: number) => {
      if (count === 0) return 0;
      if (loop) return (next + count) % count;
      return Math.max(0, Math.min(count - 1, next));
    },
    [count, loop],
  );

  const goTo = useCallback((next: number) => setIndex((current) => (current === next ? current : clamp(next))), [clamp]);
  const next = useCallback(() => setIndex((current) => clamp(current + 1)), [clamp]);
  const previous = useCallback(() => setIndex((current) => clamp(current - 1)), [clamp]);

  /** Any deliberate interaction hands control to the visitor. */
  const engage = useCallback(() => setEngaged(true), []);

  useEffect(() => {
    if (interval <= 0 || engaged || hovering || reducedMotion || count <= 1) return;
    const id = window.setInterval(() => setIndex((current) => clamp(current + 1)), interval);
    return () => window.clearInterval(id);
  }, [interval, engaged, hovering, reducedMotion, count, clamp]);

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        engage();
        next();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        engage();
        previous();
      }
    },
    [engage, next, previous],
  );

  const onPointerDown = useCallback((event: React.PointerEvent) => {
    dragStart.current = { x: event.clientX, y: event.clientY };
    dragged.current = false;
  }, []);

  const onPointerMove = useCallback((event: React.PointerEvent) => {
    if (!dragStart.current) return;
    const dx = event.clientX - dragStart.current.x;
    const dy = event.clientY - dragStart.current.y;
    // Only claim the gesture once it is clearly horizontal, so vertical
    // page scrolling on touch is never hijacked.
    if (Math.abs(dx) > 12 && Math.abs(dx) > Math.abs(dy)) dragged.current = true;
  }, []);

  const onPointerUp = useCallback(
    (event: React.PointerEvent) => {
      const start = dragStart.current;
      dragStart.current = null;
      if (!start) return;

      const dx = event.clientX - start.x;
      const dy = event.clientY - start.y;
      if (Math.abs(dx) < 45 || Math.abs(dx) < Math.abs(dy)) return;

      engage();
      if (dx < 0) next();
      else previous();
    },
    [engage, next, previous],
  );

  /** Spread onto the element that should respond to drag, keys and hover. */
  const handlers = {
    onKeyDown,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    // Without this the browser starts a native image drag on the first move and
    // every subsequent pointer event is swallowed, so swiping silently fails.
    onDragStart: (event: React.DragEvent) => event.preventDefault(),
    onPointerCancel: () => {
      dragStart.current = null;
    },
    onMouseEnter: () => setHovering(true),
    onMouseLeave: () => setHovering(false),
    onFocus: engage,
  };

  return {
    index,
    goTo,
    next,
    previous,
    engage,
    handlers,
    reducedMotion,
    /** True while a horizontal drag is in progress — used to swallow clicks. */
    isDragging: () => dragged.current,
  };
}
