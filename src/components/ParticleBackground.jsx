import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function Particles(){
  const group = useRef();
  useFrame(({ clock })=>{
    const t = clock.getElapsedTime();
    if(!group.current) return;
    group.current.children.forEach((m, i)=>{
      m.position.y = Math.sin(t*0.2 + i*0.3) * 6;
      m.rotation.x += 0.002 + (i%4)*0.0005;
      m.rotation.y += 0.001 + (i%3)*0.0007;
    });
  });
  const nodes = new Array(28).fill(0).map((_,i)=>({
    x: (i%7)-3.2, y: ((i%4)-1.5)*1.5, z: -6 - (i%5)*1.2, size: 0.24 + (i%3)*0.06
  }));
  return (
    <group ref={group}>
      {nodes.map((n, idx)=> (
        <mesh key={idx} position={[n.x*1.8, n.y*1.2, n.z]}>
          <sphereGeometry args={[n.size, 14, 14]} />
          <meshStandardMaterial color={'#a78bfa'} emissive={'#5eead4'} emissiveIntensity={0.1} roughness={0.45} />
        </mesh>
      ))}
    </group>
  );
}

export default function ParticleBackground(){
  return (
    <div style={{ position:'fixed', inset:0, zIndex:-50, pointerEvents:'none' }}>
      <Canvas gl={{ antialias:true }} camera={{ position:[0,0,30] }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10,10,10]} intensity={1} />
        <Suspense fallback={null}><Particles /></Suspense>
      </Canvas>
    </div>
  );
}
