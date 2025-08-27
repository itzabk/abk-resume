import React, { useRef, useEffect } from 'react';
export default function CrimsonPetals(){
  const ref = useRef(null);
  useEffect(()=>{
    const c = ref.current; if(!c) return;
    const ctx = c.getContext('2d');
    let w = c.width = window.innerWidth, h = c.height = window.innerHeight;
    const onResize = ()=>{ w = c.width = window.innerWidth; h = c.height = window.innerHeight; };
    window.addEventListener('resize', onResize);

    const N = 70; // more petals
    const petals = Array.from({length:N}, ()=> ({
      x: Math.random()*w, y: Math.random()*h,
      vx: (Math.random()-.5)*0.3, vy:(Math.random()-.5)*0.3,
      r: 28 + Math.random()*42, rot: Math.random()*Math.PI*2, vr:(Math.random()-.5)*0.003,
      a: 0.18 + Math.random()*0.14
    }));

    let raf=0;
    const drawPetal = (p)=>{
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.globalCompositeOperation = 'lighter'; // additive glow
      const grd = ctx.createLinearGradient(-p.r, 0, p.r, 0);
      grd.addColorStop(0, `rgba(239,68,68, ${p.a})`);     // red-500
      grd.addColorStop(1, `rgba(251,113,133, ${p.a*0.9})`); // rose-400
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.ellipse(0, 0, p.r, p.r*0.42, 0, 0, Math.PI*2);
      ctx.fill();
      ctx.restore();
    };

    const loop = ()=>{
      ctx.clearRect(0,0,w,h);
      for(const p of petals){
        p.x += p.vx; p.y += p.vy; p.rot += p.vr;
        if(p.x<-60) p.x=w+60; if(p.x>w+60) p.x=-60;
        if(p.y<-60) p.y=h+60; if(p.y>h+60) p.y=-60;
        drawPetal(p);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return ()=>{ cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); };
  }, []);
  return <canvas ref={ref} className="fixed inset-0 -z-10 pointer-events-none"/>;
}
