import { useCursor } from "@react-three/drei";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { useCallback, useMemo, useRef, useState } from "react";
import { Group, MeshStandardMaterial, Vector3 } from "three";
import type { Mesh } from "three";

export type QuizOption = {
  text: string;
  isCorrect: boolean;
  response?: string;
};

export type Quiz = {
  question: string;
  options: QuizOption[];
};

type EasterEggProps = {
  position: [number, number, number];
  hiddenObjectType: "heart" | "star" | "gift" | "butterfly";
  secretMessage: string;
  secretImage?: string;
  secretAudio?: string;
  secretQuiz?: Quiz;
  onDiscovered?: (message: string, image?: string, audio?: string, quiz?: Quiz) => void;
};

export function EasterEgg({
  position,
  hiddenObjectType,
  secretMessage,
  secretImage,
  secretAudio,
  secretQuiz,
  onDiscovered,
}: EasterEggProps) {
  const groupRef = useRef<Group>(null);
  const meshRef = useRef<Mesh>(null);
  const [isDiscovered, setIsDiscovered] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const floatOffset = useRef(Math.random() * Math.PI * 2);

  useCursor(isHovered && !isDiscovered, "pointer");

  const material = useMemo(
    () =>
      new MeshStandardMaterial({
        color: isDiscovered ? "#ff69b4" : "#ffffff",
        emissive: isDiscovered ? "#ff1493" : "#444444",
        emissiveIntensity: isDiscovered ? 0.5 : 0.1,
        transparent: true,
        opacity: isDiscovered ? 1 : 0.3,
        metalness: 0.5,
        roughness: 0.3,
      }),
    [isDiscovered]
  );

  useFrame(({ clock }) => {
    const group = groupRef.current;
    const mesh = meshRef.current;
    if (!group || !mesh) return;

    if (isDiscovered) {
      // Float and spin animation when discovered
      const elapsed = clock.elapsedTime;
      group.position.y = position[1] + Math.sin(elapsed * 2 + floatOffset.current) * 0.15;
      group.rotation.y = elapsed * 2;
      
      // Pulse effect
      const pulse = 1 + Math.sin(elapsed * 4) * 0.1;
      group.scale.setScalar(pulse * 0.15);
    } else if (isHovered) {
      // Gentle hover effect
      const elapsed = clock.elapsedTime;
      group.position.y = position[1] + Math.sin(elapsed * 3) * 0.02;
      group.scale.lerp(new Vector3(0.12, 0.12, 0.12), 0.1);
    } else {
      // Subtle idle animation
      const elapsed = clock.elapsedTime;
      group.position.y = position[1] + Math.sin(elapsed + floatOffset.current) * 0.01;
      group.scale.lerp(new Vector3(0.1, 0.1, 0.1), 0.1);
    }
  });

  const handleClick = useCallback(
    (event: ThreeEvent<MouseEvent>) => {
      event.stopPropagation();
      if (!isDiscovered) {
        setIsDiscovered(true);
        onDiscovered?.(secretMessage, secretImage, secretAudio, secretQuiz);
      }
    },
    [isDiscovered, secretMessage, secretImage, secretAudio, secretQuiz, onDiscovered]
  );

  const handlePointerOver = useCallback((event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    setIsHovered(true);
  }, []);

  const handlePointerOut = useCallback((event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    setIsHovered(false);
  }, []);

  const renderGeometry = () => {
    switch (hiddenObjectType) {
      case "heart":
        return (
          <mesh ref={meshRef} material={material}>
            <sphereGeometry args={[1, 16, 16]} />
          </mesh>
        );
      case "star":
        return (
          <mesh ref={meshRef} material={material}>
            <octahedronGeometry args={[1, 0]} />
          </mesh>
        );
      case "gift":
        return (
          <mesh ref={meshRef} material={material}>
            <boxGeometry args={[1.5, 1.5, 1.5]} />
          </mesh>
        );
      case "butterfly":
        return (
          <mesh ref={meshRef} material={material}>
            <torusGeometry args={[0.8, 0.3, 8, 16]} />
          </mesh>
        );
      default:
        return (
          <mesh ref={meshRef} material={material}>
            <sphereGeometry args={[1, 16, 16]} />
          </mesh>
        );
    }
  };

  return (
    <group
      ref={groupRef}
      position={position}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      {renderGeometry()}
      {isDiscovered && (
        <>
          {/* Sparkle particles */}
          <pointLight position={[0, 0, 0]} color="#ff69b4" intensity={2} distance={2} decay={2} />
          <pointLight position={[0.5, 0.5, 0]} color="#ffd700" intensity={1} distance={1.5} decay={2} />
          <pointLight position={[-0.5, 0.5, 0]} color="#00ffff" intensity={1} distance={1.5} decay={2} />
        </>
      )}
    </group>
  );
}
