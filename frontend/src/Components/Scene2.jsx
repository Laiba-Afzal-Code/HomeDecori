import React from "react";
import { Canvas } from "@react-three/fiber";
import { Float, Stars, OrbitControls } from "@react-three/drei";

function Box() {
  return (
    <Float speed={2} rotationIntensity={2} floatIntensity={2}>
      <mesh>
        <boxGeometry args={[3, 3, 3]} />
        <meshStandardMaterial color="#0fc83d" wireframe />
      </mesh>
    </Float>
  );
}

export default function Scene() {
  return (
    <Canvas
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
      }}
      camera={{ position: [0, 0, 8] }}
    >
      {/* Lights */}
      <ambientLight intensity={0.5} />

      {/* Background stars */}
      <Stars radius={100} depth={50} count={2000} factor={4} />

      {/* 3D Object */}
      {/* <Box /> */}

      {/* Controls */}
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}