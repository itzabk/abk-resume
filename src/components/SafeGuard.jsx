import React from 'react';

export default function SafeGuard({ children, fallback=null }){
  const [ok, setOk] = React.useState(true);
  React.useEffect(()=>{
    try {
      const c = document.createElement('canvas');
      const gl = c.getContext('webgl') || c.getContext('experimental-webgl');
      if(!gl) setOk(false);
    } catch { setOk(false); }
  }, []);
  const params = new URLSearchParams(window.location.search);
  const safe = params.get('safe') === '1';
  if(!ok || safe) return fallback || null;
  return children;
}
