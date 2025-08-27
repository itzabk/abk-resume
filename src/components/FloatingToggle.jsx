import React, { useContext, Suspense, useRef } from 'react';
import { ThemeContext } from '../contexts/ThemeContext.jsx';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { motion } from 'framer-motion';

function Orb({ colorA='#06b6d4', colorB='#7c3aed' }){
  const ref = useRef();
  useFrame(({ clock, mouse })=>{
    if(!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t*0.4 + mouse.x*0.6;
    ref.current.rotation.x = t*0.2 + mouse.y*0.4;
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1, 2]} />
      <meshPhysicalMaterial color={colorA} roughness={0.2} metalness={0.6} emissive={colorB} emissiveIntensity={0.15} clearcoat={1} clearcoatRoughness={0.1} />
    </mesh>
  );
}

export default function FloatingToggle(){
  const { mode, setMode } = useContext(ThemeContext);
  const next = () => setMode(mode === 'aurora' ? 'cyberpunk' : mode === 'cyberpunk' ? 'minimal' : 'aurora');
  const label = mode === 'aurora' ? 'Aurora' : mode === 'cyberpunk' ? 'Cyberpunk' : 'Minimal';
  const colors = mode === 'aurora' ? ['#06b6d4','#7c3aed'] : mode === 'cyberpunk' ? ['#22d3ee','#ec4899'] : ['#60a5fa','#a78bfa'];

  return (
    <div className="floating-toggle no-print">
      <motion.div whileHover={{ scale:1.06, y:-4 }} onClick={next} className="glass p-2 rounded-full shadow-xl cursor-pointer">
        <div style={{ width: 86, height: 86 }}>
          <Canvas camera={{ position:[0,0,3.2], fov:50 }}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[5,5,5]} intensity={0.8} />
            <Suspense fallback={<Html center>...</Html>}>
              <Orb colorA={colors[0]} colorB={colors[1]} />
            </Suspense>
          </Canvas>
        </div>
        <div className="text-center mt-1 text-xs opacity-80">{label}</div>
      </motion.div>
    </div>
  );
}
