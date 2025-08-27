import React from 'react';
import { useContext, useState } from 'react';
import { ThemeContext } from '../contexts/ThemeContext.jsx';

const skills = [
  { name:'Node.js', level:80, icon:'/src/assets/icons/node.svg' },
  { name:'JavaScript', level:80, icon:'/src/assets/icons/js.svg' },
  { name:'Docker', level:70, icon:'/src/assets/icons/docker.svg' },
  { name:'Redis', level:75, icon:'/src/assets/icons/redis.svg' },
  { name:'MongoDB', level:80, icon:'/src/assets/icons/mongo.svg' },
  { name:'Postgres', level:60, icon:'/src/assets/icons/pg.svg' },
  { name:'Python', level:30, icon:'/src/assets/icons/py.svg' },
];

export default function Skills(){
  const { mode } = useContext(ThemeContext);
  const [active, setActive] = useState(-1);
  const [hover, setHover] = useState({ idx:-1, x:0, y:0 });

  const skills = [
    { name:'Node.js', level:80, icon:'/src/assets/icons/node.svg' },
    { name:'JavaScript', level:80, icon:'/src/assets/icons/js.svg' },
    { name:'Docker', level:70, icon:'/src/assets/icons/docker.svg' },
    { name:'Redis', level:75, icon:'/src/assets/icons/redis.svg' },
    { name:'MongoDB', level:80, icon:'/src/assets/icons/mongo.svg' },
    { name:'Postgres', level:60, icon:'/src/assets/icons/pg.svg' },
    { name:'Python', level:30, icon:'/src/assets/icons/py.svg' },
  ];
  const max = Math.max(...skills.map(s=>s.level));

  // Dimensions
  const width = 720, height = 260, padding = 36;
  const barW = (width - padding*2) / skills.length - 12;

  const paletteAurora = ['#06b6d4','#7c3aed'];
  const paletteCrimson = ['#fb7185','#ef4444'];
  const paletteMinimal = ['#60a5fa','#a78bfa'];

  // Helper to draw bars
  const Bars = ({ palette }) => (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}
         onMouseMove={(e)=> setHover(h=> ({...h, x:e.nativeEvent.offsetX, y:e.nativeEvent.offsetY}))}
         onMouseLeave={()=> setHover({ idx:-1, x:0, y:0 })}>
      <defs>
        <linearGradient id="grad" x1="0" x2="1">
          <stop offset="0%" stopColor={palette[0]}/>
          <stop offset="100%" stopColor={palette[1]}/>
        </linearGradient>
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="0" stdDeviation="1.2" floodColor="#0b1020" floodOpacity="0.8" />
        </filter>
      </defs>
      {skills.map((s, idx)=>{
        const x = padding + idx * (barW + 12);
        const h = (s.level / max) * (height - 84);
        const y = height - padding - h;
        const isActive = active === idx;
        return (
          <g key={s.name} style={{ cursor:'pointer' }}
             onClick={()=> setActive(isActive ? -1 : idx)}
             onMouseEnter={()=> setHover(h=> ({...h, idx: idx}))}>
            <rect x={x} y={isActive ? y-6 : y} width={barW} height={isActive ? h+6 : h} rx="9" fill="url(#grad)" opacity=".98" filter="url(#shadow)">
              <animate attributeName="y" to={isActive ? y-6 : y} dur="180ms" fill="freeze" />
              <animate attributeName="height" to={isActive ? h+6 : h} dur="180ms" fill="freeze" />
            </rect>
            <image href={s.icon} x={x + barW/2 - 14} y={y - 30} width="28" height="28" />
            <text x={x + barW/2} y={height - padding + 18} fontSize="12" fill="#e6eef8" textAnchor="middle">{s.name}</text>
          </g>
        );
      })}
    </svg>
  );

  // Crimson: smooth area line chart
  const Area = ({ palette }) => {
    const pts = skills.map((s, idx)=>{
      const x = padding + idx * ((width - padding*2)/(skills.length-1));
      const y = height - padding - (s.level/max)*(height-84);
      return [x, y];
    });
    const path = ['M', pts[0][0], pts[0][1], ...pts.slice(1).flatMap(([x,y])=>['L',x,y])].join(' ');
    const pathFill = path + ` L ${padding + (width - padding*2)} ${height-padding} L ${padding} ${height-padding} Z`;
    return (
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}
           onMouseLeave={()=> setHover({ idx:-1, x:0, y:0 })}>
        <defs>
          <linearGradient id="gradA" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={palette[0]} stopOpacity=".35"/>
            <stop offset="100%" stopColor={palette[1]} stopOpacity=".05"/>
          </linearGradient>
        </defs>
        <path d={pathFill} fill="url(#gradA)" />
        <path d={path} stroke={palette[0]} strokeWidth="2" fill="none" />
        {skills.map((s, idx)=>{
          const x = pts[idx][0], y = pts[idx][1];
          return (
            <g key={s.name} onMouseEnter={(e)=> setHover({ idx, x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY })}>
              <circle cx={x} cy={y} r="3.5" fill={palette[0]} />
              <text x={x} y={height - padding + 18} fontSize="12" fill="#e6eef8" textAnchor="middle">{s.name}</text>
            </g>
          );
        })}
      </svg>
    );
  };

  // Minimal: thin clean bars
  const ThinBars = ({ palette }) => (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}
         onMouseMove={(e)=> setHover(h=> ({...h, x:e.nativeEvent.offsetX, y:e.nativeEvent.offsetY}))}
         onMouseLeave={()=> setHover({ idx:-1, x:0, y:0 })}>
      {skills.map((s, idx)=>{
        const x = padding + idx * ( (width - padding*2)/skills.length );
        const h = (s.level / max) * (height - 84);
        const y = height - padding - h;
        return (
          <g key={s.name} onMouseEnter={()=> setHover(h=> ({...h, idx: idx}))}>
            <rect x={x} y={y} width="12" height={h} rx="4" fill={palette[0]} opacity=".9" />
            <text x={x+6} y={height - padding + 18} fontSize="12" fill="#e6eef8" textAnchor="middle">{s.name}</text>
          </g>
        );
      })}
    </svg>
  );

  const content = mode==='aurora' ? <Bars palette={paletteAurora} />
                 : mode==='cyberpunk' ? <Area palette={paletteCrimson} />
                 : <ThinBars palette={paletteMinimal} />;

  return (
    <div className="glass p-4 relative">
      {content}
      {hover.idx>-1 && (
        <div style={{ position:'absolute', left: hover.x+10, top: hover.y-10, pointerEvents:'none' }}
             className="px-2 py-1 rounded-md bg-black/70 text-xs">
          {skills[hover.idx].name} — {skills[hover.idx].level}%
        </div>
      )}
    </div>
  );
}
