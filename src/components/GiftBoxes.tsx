import { GiftBox } from "../models/giftBox";
import type { Quiz } from "./EasterEgg";

type GiftBoxesProps = {
  onGiftOpen?: (message?: string, image?: string, audio?: string, quiz?: Quiz) => void;
};

const GIFT_BOXES_DATA = [
  {
    position: [-2.2, 0.15, 1.5] as [number, number, number],
    rotation: [0, 0.3, 0] as [number, number, number],
    size: 0.3,
    boxColor: "#ff1493",
    ribbonColor: "#ffd700",
    surpriseMessage: "Espero que cumplas todo lo que te propongas",
    surpriseImage: "/diannePequeña.jpg",
  },
  {
    position: [2.3, 0.2, 1.2] as [number, number, number],
    rotation: [0, -0.5, 0] as [number, number, number],
    size: 0.4,
    boxColor: "#9370db",
    ribbonColor: "#ff69b4",
    surpriseMessage: "Ya estas viejita, pero te sigo queriendo",
    surpriseImage: "/ourHands.jpg",
  },
  {
    position: [0, 0.125, 2] as [number, number, number],
    rotation: [0, 0, 0] as [number, number, number],
    size: 0.25,
    boxColor: "#00ced1",
    ribbonColor: "#ffa500",
    surpriseMessage: "El 3 de Septiembre comenzamos a hacer historia",
    surpriseImage: "/flowers.jpg",
  },
];

export function GiftBoxes({ onGiftOpen }: GiftBoxesProps) {
  return (
    <>
      {GIFT_BOXES_DATA.map((gift, index) => (
        <GiftBox
          key={`gift-${index}`}
          position={gift.position}
          rotation={gift.rotation}
          size={gift.size}
          boxColor={gift.boxColor}
          ribbonColor={gift.ribbonColor}
          surpriseMessage={gift.surpriseMessage}
          surpriseImage={(gift as any).surpriseImage}
          surpriseAudio={(gift as any).surpriseAudio}
          surpriseQuiz={(gift as any).surpriseQuiz}
          onOpen={onGiftOpen}
        />
      ))}
    </>
  );
}
