import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function BotBase({ color='#9ae6b4', emissive='#22d3ee' }){
  const g = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if(g.current){
      g.current.position.y = Math.sin(t*0.8)*0.12;
      g.current.rotation.y = Math.sin(t*0.6)*0.2;
    }
  });
  return (
    <group ref={g}>
      <mesh position={[0,0,0]}>
        <boxGeometry args={[1.1,1.3,1.0]} />
        <meshStandardMaterial color={color} emissive={emissive} emissiveIntensity={0.15} metalness={0.4} roughness={0.35} />
      </mesh>
      <mesh position={[0,0.95,0]}>
        <sphereGeometry args={[0.42, 22, 22]} />
        <meshStandardMaterial color={color} emissive={emissive} emissiveIntensity={0.25} />
      </mesh>
      <mesh position={[-0.7,-0.1,0]}><cylinderGeometry args={[0.12,0.12,0.8,12]} /><meshStandardMaterial color={color} emissive={emissive} emissiveIntensity={0.1}/></mesh>
      <mesh position={[0.7,-0.1,0]}><cylinderGeometry args={[0.12,0.12,0.8,12]} /><meshStandardMaterial color={color} emissive={emissive} emissiveIntensity={0.1}/></mesh>
      <mesh position={[0,0.9,0.43]}><sphereGeometry args={[0.08, 16, 16]} /><meshStandardMaterial color={'#ffffff'} emissive={'#67e8f9'} emissiveIntensity={0.8}/></mesh>
      <mesh position={[0,0.9,-0.43]}><sphereGeometry args={[0.08, 16, 16]} /><meshStandardMaterial color={'#ffffff'} emissive={'#67e8f9'} emissiveIntensity={0.8}/></mesh>
    </group>
  );
}

export function HeroRobot({ mode='aurora' }){
  const cfg = mode==='aurora' ? { color:'#a7f3d0', emissive:'#22d3ee', light:'#a78bfa'} :
              mode==='cyberpunk' ? { color:'#9333ea', emissive:'#ec4899', light:'#22d3ee'} :
              { color:'#94a3b8', emissive:'#94a3b8', light:'#94a3b8' };
  return (
    <div style={{ width: 260, height: 200 }}>
      <Canvas camera={{ position:[0.8,0.8,3.2], fov:50 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[2,3,4]} intensity={0.9} color={cfg.light} />
        <BotBase color={cfg.color} emissive={cfg.emissive} />
      </Canvas>
    </div>
  );
}
