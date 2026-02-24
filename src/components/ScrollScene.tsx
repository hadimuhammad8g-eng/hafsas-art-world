import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { motion, useScroll, useTransform } from "framer-motion";

const FloatingTorus = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("hsl(270, 30%, 75%)"),
        roughness: 0.3,
        metalness: 0.1,
        transparent: true,
        opacity: 0.7,
      }),
    []
  );

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} material={material}>
        <torusKnotGeometry args={[1, 0.35, 128, 32]} />
      </mesh>
    </Float>
  );
};

const FloatingSphere = ({ position, color, size }: { position: [number, number, number]; color: string; size: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8 + position[0]) * 0.3;
    }
  });

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(color),
        roughness: 0.2,
        metalness: 0.05,
        transparent: true,
        opacity: 0.5,
      }),
    [color]
  );

  return (
    <mesh ref={meshRef} position={position} material={material}>
      <sphereGeometry args={[size, 32, 32]} />
    </mesh>
  );
};

const Scene3D = () => {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#f0e6ff" />
      <pointLight position={[-3, 2, 4]} intensity={0.5} color="#ffb8d9" />

      <FloatingTorus />
      <FloatingSphere position={[-2.5, 0.5, -1]} color="hsl(330, 30%, 82%)" size={0.4} />
      <FloatingSphere position={[2.8, -0.5, -0.5]} color="hsl(270, 25%, 80%)" size={0.3} />
      <FloatingSphere position={[1.5, 1.5, -2]} color="hsl(35, 40%, 85%)" size={0.25} />
      <FloatingSphere position={[-1.8, -1, -1.5]} color="hsl(330, 25%, 85%)" size={0.35} />
    </>
  );
};

const ScrollScene = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="relative py-16 sm:py-24 overflow-hidden">
      <motion.div style={{ y, opacity }} className="relative h-[300px] sm:h-[400px] md:h-[500px]">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 2]} gl={{ alpha: true, antialias: true }}>
          <Scene3D />
        </Canvas>
      </motion.div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-4">
        <motion.div style={{ opacity }} className="text-center">
          <p className="font-body text-xs sm:text-sm uppercase tracking-[0.3em] text-muted-foreground mb-2 sm:mb-3">
            Art in Every Dimension
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground italic">
            Where Craft Meets Soul
          </h2>
        </motion.div>
      </div>
    </section>
  );
};

export default ScrollScene;
