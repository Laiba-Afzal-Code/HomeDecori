import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";

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
    <>
      <Canvas
      style={{
        position: "absolute",
        top: 0,
        left: 300,
        zIndex: -1,
      }}
    >
      <ambientLight intensity={0.5} />
      <Stars radius={100} depth={50} count={2000} factor={4} />

      <Box />
    </Canvas>
      
    </>
  );
}