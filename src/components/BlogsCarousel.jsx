import React, { useRef, useEffect, useContext, useMemo } from 'react';
import BannerCard from './BannerCard.jsx';
import { ThemeContext } from '../contexts/ThemeContext.jsx';

export default function BlogsCarousel({ items = [] }){
  const { mode } = useContext(ThemeContext);
  const ref = useRef(null);
  const doubled = useMemo(()=> [...items, ...items], [items]);

  useEffect(()=>{
    const el = ref.current; if(!el || doubled.length===0) return;
    let speed = 1.2; let raf=0; let running = false;

    const half = () => el.scrollWidth / 2;

    const step = () => {
      if (!running) return;
      el.scrollLeft += speed;
      if (el.scrollLeft >= half()) el.scrollLeft -= half();
      raf = requestAnimationFrame(step);
    };

    const start = () => {
      if (running) return;
      running = true; raf = requestAnimationFrame(step);
    };
    const stop = () => {
      running = false; if (raf) cancelAnimationFrame(raf);
    };

    const onEnter = () => { speed = 0; };
    const onLeave = () => { speed = 1.2; };

    // pause when not visible in viewport
    let io;
    if ('IntersectionObserver' in window){
      io = new IntersectionObserver(entries => {
        entries.forEach(e => { e.isIntersecting ? start() : stop(); });
      }, { rootMargin: '0px', threshold: 0.01 });
      io.observe(el);
    } else {
      start();
    }

    // pause when tab hidden
    const vis = () => { document.hidden ? stop() : start(); };
    document.addEventListener('visibilitychange', vis);

    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);

    return ()=>{
      stop();
      document.removeEventListener('visibilitychange', vis);
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
      if (io) io.disconnect();
    };
  }, [doubled]);

  return (
    <div className="glass p-3" aria-label="Medium articles carousel">
      <div ref={ref} className="carousel-track" role="list">
        {doubled.map((it, idx)=> (
          <div key={idx} style={{ minWidth: 340 }} role="listitem">
            <BannerCard item={it} mode={mode} />
          </div>
        ))}
      </div>
    </div>
  );
}
