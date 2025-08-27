import React, { createContext, useState, useMemo, useEffect } from 'react';
export const ThemeContext = createContext();
export function ThemeProvider({ children }){
  const [mode, setMode] = useState('aurora'); // 'aurora' | 'cyberpunk' | 'minimal'
  useEffect(()=>{
    document.documentElement.classList.remove('mode-aurora','mode-cyberpunk','mode-minimal');
    document.documentElement.classList.add(`mode-${mode}`);
  }, [mode]);
  const value = useMemo(()=>({ mode, setMode }), [mode]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
