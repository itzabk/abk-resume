import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

export default function BannerCard({ item, mode='aurora' }){
  const styles = useMemo(()=>{
    switch(mode){
      case 'cyberpunk': return { root:'rounded-sm overflow-hidden border-2 border-transparent', wrap:'h-48 md:h-56 relative', title:'text-white font-bold text-lg' };
      case 'minimal': return { root:'rounded-lg overflow-hidden border border-white/6', wrap:'h-44 md:h-48 relative', title:'text-slate-100 font-semibold text-base' };
      default: return { root:'rounded-2xl overflow-hidden', wrap:'h-52 md:h-60 relative', title:'text-white font-extrabold text-lg' };
    }
  }, [mode]);

  return (
    <motion.a href={item.url} target="_blank" rel="noreferrer"
      className={clsx('carousel-card interactive', styles.root)} whileHover={{ scale:1.03 }} style={{ textDecoration:'none', color:'inherit' }}>
      <div className={styles.wrap} style={{ backgroundImage:`url(${item.banner})`, backgroundSize:'cover', backgroundPosition:'center' }}>
        <div className='absolute inset-0 pointer-events-none' style={{boxShadow:'inset 0 0 180px rgba(0,0,0,0.35)'}}/>
        {mode==='aurora' && <div className="absolute inset-0 pointer-events-none"><div className="aurora-gradient absolute inset-0 mix-blend-screen opacity-60" /><div className="aurora-gloss absolute top-0 left-0 w-full h-10 blur-xl opacity-40" /></div>}
        {mode==='cyberpunk' && <div className="absolute inset-0 pointer-events-none"><div className="cyber-scanline absolute inset-0 opacity-25" /><div className="cyber-neon-edge absolute inset-0 blur-sm opacity-80" /></div>}
        {mode==='minimal' && <div className="absolute inset-0 pointer-events-none"><div className="minimal-tint absolute inset-0 opacity-55" /></div>}
      </div>
      <div style={{ padding: 14 }}>
        <div className={styles.title}>{item.title}</div>
        <div style={{ marginTop:8, fontSize:13, color: mode==='minimal' ? 'rgba(220,230,240,0.9)' : 'rgba(255,255,255,0.85)' }}>{item.snippet}</div>
        <div style={{ marginTop:10, fontSize:12, color: mode==='minimal' ? '#94a3b8' : 'rgba(255,255,255,0.65)' }}>Read on Medium</div>
      </div>
    </motion.a>
  );
}
