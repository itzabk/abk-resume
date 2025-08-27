import React from 'react';
export default class ErrorBoundary extends React.Component{
  constructor(p){ super(p); this.state={err:null}; }
  static getDerivedStateFromError(err){ return { err }; }
  componentDidCatch(err, info){ console.error('ErrorBoundary', err, info); }
  render(){
    if(this.state.err){
      return (
        <div style={{position:'fixed',inset:0,display:'grid',placeItems:'center',background:'rgba(5,8,15,.96)',color:'#e2e8f0',zIndex:9999}}>
          <div style={{maxWidth:680,padding:24}}>
            <div style={{fontWeight:900,fontSize:20,marginBottom:8}}>⚠️ App crashed</div>
            <div style={{opacity:.9,whiteSpace:'pre-wrap'}}>{String(this.state.err?.message || this.state.err)}</div>
            <div style={{opacity:.65,marginTop:10,fontSize:12}}>Check DevTools → Console for details.</div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
