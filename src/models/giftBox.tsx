import { useFrame, type ThreeEvent } from "@react-three/fiber";
import type { ThreeElements } from "@react-three/fiber";
import { useCallback, useRef, useState } from "react";
import type { Group } from "three";
import { useCursor } from "@react-three/drei";

type GiftBoxProps = ThreeElements["group"] & {
  boxColor?: string;
  ribbonColor?: string;
  size?: number;
  floatAnimation?: boolean;
  surpriseMessage?: string;
  surpriseImage?: string;
  onOpen?: (message?: string, image?: string) => void;
};

export function GiftBox({
  boxColor = "#ff69b4",
  ribbonColor = "#ffd700",
  size = 1,
  floatAnimation = false,
  surpriseMessage,
  surpriseImage,
  onOpen,
  ...groupProps
}: GiftBoxProps) {
  const groupRef = useRef<Group>(null);
  const lidRef = useRef<Group>(null);
  const floatOffset = useRef(Math.random() * Math.PI * 2);
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const openProgress = useRef(0);

  useCursor(isHovered, "pointer");

  useFrame(({ clock }, delta) => {
    if (!groupRef.current) return;
    
    if (floatAnimation) {
      const elapsed = clock.elapsedTime;
      groupRef.current.position.y += Math.sin(elapsed * 2 + floatOffset.current) * 0.0005;
      groupRef.current.rotation.y = Math.sin(elapsed * 0.5) * 0.05;
    }

    // Animate lid opening
    if (lidRef.current) {
      const targetProgress = isOpen ? 1 : 0;
      openProgress.current += (targetProgress - openProgress.current) * delta * 5;
      
      lidRef.current.position.y = size * 0.5 + openProgress.current * size * 0.8;
      lidRef.current.rotation.z = openProgress.current * 0.3;
    }
  });

  const handleClick = useCallback(
    (event: ThreeEvent<MouseEvent>) => {
      event.stopPropagation();
      setIsOpen(true);
      onOpen?.(surpriseMessage, surpriseImage);
    },
    [onOpen, surpriseMessage, surpriseImage]
  );

  const handlePointerOver = useCallback((event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    setIsHovered(true);
  }, []);

  const handlePointerOut = useCallback((event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    setIsHovered(false);
  }, []);

  return (
    <group ref={groupRef} {...groupProps}>
      {/* Bottom part of box */}
      <mesh 
        castShadow 
        receiveShadow
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <boxGeometry args={[size, size * 0.9, size]} />
        <meshStandardMaterial
          color={boxColor}
          roughness={0.3}
          metalness={0.1}
          emissive={isHovered ? boxColor : "#000000"}
          emissiveIntensity={isHovered ? 0.2 : 0}
        />
      </mesh>

      {/* Lid (animated) */}
      <group ref={lidRef} position={[0, size * 0.5, 0]}>
        <mesh 
          castShadow
          onClick={handleClick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
        >
          <boxGeometry args={[size * 1.05, size * 0.2, size * 1.05]} />
          <meshStandardMaterial
            color={boxColor}
            roughness={0.3}
            metalness={0.1}
            emissive={isHovered ? boxColor : "#000000"}
            emissiveIntensity={isHovered ? 0.2 : 0}
          />
        </mesh>

        {/* Ribbon horizontal on lid */}
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[size * 1.1, size * 0.15, size * 0.15]} />
          <meshStandardMaterial
            color={ribbonColor}
            roughness={0.2}
            metalness={0.3}
          />
        </mesh>

        {/* Ribbon vertical on lid */}
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[size * 0.15, size * 0.15, size * 1.1]} />
          <meshStandardMaterial
            color={ribbonColor}
            roughness={0.2}
            metalness={0.3}
          />
        </mesh>

        {/* Bow center */}
        <mesh position={[0, size * 0.15, 0]} castShadow>
          <sphereGeometry args={[size * 0.15, 16, 16]} />
          <meshStandardMaterial
            color={ribbonColor}
            roughness={0.2}
            metalness={0.3}
          />
        </mesh>

        {/* Bow loops */}
        <mesh position={[-size * 0.2, size * 0.2, 0]} rotation={[0, 0, Math.PI / 4]} castShadow>
          <torusGeometry args={[size * 0.15, size * 0.05, 8, 16]} />
          <meshStandardMaterial
            color={ribbonColor}
            roughness={0.2}
            metalness={0.3}
          />
        </mesh>
        <mesh position={[size * 0.2, size * 0.2, 0]} rotation={[0, 0, -Math.PI / 4]} castShadow>
          <torusGeometry args={[size * 0.15, size * 0.05, 8, 16]} />
          <meshStandardMaterial
            color={ribbonColor}
            roughness={0.2}
            metalness={0.3}
          />
        </mesh>
      </group>

      {/* Sparkles when opened */}
      {isOpen && (
        <>
          <pointLight position={[0, size * 0.5, 0]} color="#ffd700" intensity={2} distance={2} decay={2} />
          <pointLight position={[size * 0.3, size * 0.7, 0]} color="#ff69b4" intensity={1.5} distance={1.5} decay={2} />
          <pointLight position={[-size * 0.3, size * 0.7, 0]} color="#00ffff" intensity={1.5} distance={1.5} decay={2} />
        </>
      )}
    </group>
  );
}
