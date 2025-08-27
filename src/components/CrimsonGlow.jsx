import React, { useRef, useEffect } from 'react';
/**
 * CrimsonGlow: lightweight canvas sparkles for "crimson" theme.
 */
export default function CrimsonGlow(){
  const ref = useRef(null);
  useEffect(()=>{
    const c = ref.current; if(!c) return;
    const ctx = c.getContext('2d');
    let w = c.width = window.innerWidth;
    let h = c.height = window.innerHeight;
    const onResize = ()=>{ w = c.width = window.innerWidth; h = c.height = window.innerHeight; };
    window.addEventListener('resize', onResize);

    const N = 60;
    const pts = Array.from({length:N}, ()=> ({
      x: Math.random()*w, y: Math.random()*h,
      vx: (Math.random()-.5)*0.4, vy:(Math.random()-.5)*0.4,
      r: 1+Math.random()*2, a: 0.4+Math.random()*0.6
    }));

    let raf=0;
    const loop = ()=>{
      ctx.clearRect(0,0,w,h);
      for(const p of pts){
        p.x += p.vx; p.y += p.vy;
        if(p.x<0||p.x>w) p.vx*=-1;
        if(p.y<0||p.y>h) p.vy*=-1;
        const g = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,40);
        g.addColorStop(0, `rgba(251,113,133,${p.a})`); // rose-400
        g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(p.x,p.y, 40, 0, Math.PI*2); ctx.fill();
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return ()=>{ cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); };
  }, []);
  return <canvas ref={ref} className="fixed inset-0 -z-10 pointer-events-none"/>;
}
