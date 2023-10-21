import { useCallback, useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import Eye from './Eye';
import { PerspectiveCamera } from '@react-three/drei'
import { Vector3 } from 'three';

const cameraPosition = [ 0, 0, .3 ];
const pointerPosition = new Vector3();

export default function Scene(props) {
  const { camera, raycaster } = useThree();
  const eyeRef = useRef(null);

  useEffect(() => {
    if(camera) {
      camera.up.set(0,0,1);
      camera.lookAt(0,0,0);
    }
  }, [ camera ]);

  const handlePointerMove = useCallback((e) => {
    if(eyeRef && eyeRef.current && camera) {
      raycaster.ray.at(camera.near, pointerPosition);
      const eye = eyeRef.current;
      eye.lookAt(pointerPosition);
    }
  }, [ eyeRef, camera, raycaster ]);

  useEffect(() => {
    document.addEventListener("pointermove", handlePointerMove);

    return () => {
      document.removeEventListener("pointermove", handlePointerMove);
    }
  }, [ handlePointerMove ]);


  return <>
      <ambientLight />
      <pointLight position={[1, 1, 1]} />
      <pointLight position={[-1, 1, 1]} />
      <pointLight position={[-1, 1, -2]} />
      <pointLight position={[-1, -2, -4]} />
      <Eye ref={eyeRef}/>
      <PerspectiveCamera makeDefault position={cameraPosition}/>
    </>;
}
