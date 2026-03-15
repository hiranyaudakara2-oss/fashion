import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  uniform float uTime;
  varying vec2 vUv;
  varying float vElevation;

  void main() {
    vUv = uv;
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    
    float elevation = sin(modelPosition.x * 0.5 + uTime) * 0.5
                    + cos(modelPosition.y * 0.3 + uTime * 0.8) * 0.5
                    + sin((modelPosition.x + modelPosition.y) * 0.2 - uTime * 0.5) * 0.2;
                    
    modelPosition.z += elevation;
    vElevation = elevation;
    
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    
    gl_Position = projectedPosition;
  }
`;

const fragmentShader = `
  uniform vec3 uColor;
  varying vec2 vUv;
  varying float vElevation;

  void main() {
    float intensity = (vElevation + 1.0) * 0.5; // Normalize to 0-1
    vec3 finalColor = mix(uColor * 0.3, uColor * 1.5, intensity);
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

function ClothMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor: { value: new THREE.Color('#990000') }
  }), []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 4, 0, 0]} position={[0, 0, -2]}>
      <planeGeometry args={[40, 20, 64, 64]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        side={THREE.DoubleSide}
        wireframe={false}
      />
    </mesh>
  );
}

export default function RedClothBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#0a0000]">
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 2]} // Optimize pixel ratio for mobile vs desktop
        gl={{ antialias: false, powerPreference: "high-performance" }}
      >
        <ClothMesh />
      </Canvas>
    </div>
  );
}

