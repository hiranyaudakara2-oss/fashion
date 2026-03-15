import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';

const ClothMesh = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Create a custom shader material for the flowing cloth
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color('#990000') }, // Rich deep red
    }),
    []
  );

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      if (material.uniforms) {
        material.uniforms.uTime.value = state.clock.elapsedTime * 0.4; // Slower, more elegant movement
      }
    }
  });

  const vertexShader = `
    uniform float uTime;
    varying vec2 vUv;
    varying vec3 vNormal;
    
    void main() {
      vUv = uv;
      vNormal = normal;
      
      vec3 pos = position;
      
      // Elegant, slow wave function for silk-like movement
      float wave1 = sin(pos.x * 1.5 + uTime * 1.2) * 0.4;
      float wave2 = cos(pos.y * 1.2 + uTime * 0.9) * 0.4;
      float wave3 = sin((pos.x + pos.y) * 0.8 + uTime * 0.6) * 0.2;
      
      pos.z += wave1 + wave2 + wave3;
      
      // Recalculate normals roughly for lighting
      vec3 objectNormal = normalize(vec3(
        -cos(pos.x * 1.5 + uTime * 1.2) * 0.6,
        -sin(pos.y * 1.2 + uTime * 0.9) * 0.48,
        1.0
      ));
      
      vNormal = normalMatrix * objectNormal;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = `
    uniform vec3 uColor;
    varying vec2 vUv;
    varying vec3 vNormal;
    
    void main() {
      // Basic lighting based on recalculated normals
      vec3 lightDir = normalize(vec3(1.0, 1.0, 2.0));
      float diff = max(dot(vNormal, lightDir), 0.0);
      
      // Ambient + Diffuse
      vec3 ambient = uColor * 0.3;
      vec3 diffuse = uColor * diff * 0.9;
      
      // Specular highlight for silk/satin look
      vec3 viewDir = normalize(vec3(0.0, 0.0, 1.0));
      vec3 reflectDir = reflect(-lightDir, vNormal);
      float spec = pow(max(dot(viewDir, reflectDir), 0.0), 64.0); // Tighter specular for silk
      vec3 specular = vec3(1.0, 0.8, 0.8) * spec * 0.4; // Slightly warm highlight
      
      vec3 finalColor = ambient + diffuse + specular;
      
      // Add subtle gradient/vignette
      float vignette = smoothstep(1.0, 0.0, length(vUv - 0.5));
      finalColor *= mix(0.7, 1.0, vignette);
      
      gl_FragColor = vec4(finalColor, 0.9); // High opacity for rich color
    }
  `;

  return (
    <mesh ref={meshRef} rotation={[-0.1, 0, 0]} position={[0, 0, -3]}>
      {/* Larger plane to cover all screen sizes, more segments for smooth curves */}
      <planeGeometry args={[25, 15, 96, 96]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        side={THREE.DoubleSide}
        transparent={true}
      />
    </mesh>
  );
};

export default function RedCloth() {
  return (
    <div className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-40 mix-blend-multiply md:opacity-50 md:translate-x-[10%]">
      <Canvas 
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 2]} // Optimize for high-DPI displays while maintaining performance
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <ClothMesh />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
