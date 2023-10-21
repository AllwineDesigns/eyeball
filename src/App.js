import { useRef, useEffect, useCallback } from 'react';
import { Canvas } from '@react-three/fiber'
import Scene from './Scene';

function App() {
  return (
    <Canvas>
      <Scene/>
    </Canvas>
  );
}

export default App;
