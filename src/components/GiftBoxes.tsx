import { GiftBox } from "../models/giftBox";
import type { Quiz } from "./EasterEgg";

type GiftBoxesProps = {
  onGiftOpen?: (message?: string, image?: string, audio?: string, quiz?: Quiz) => void;
};

const GIFT_BOXES_DATA = [
  {
    position: [-2.2, 0.15, 0.5] as [number, number, number],
    rotation: [0, 0.3, 0] as [number, number, number],
    size: 0.3,
    boxColor: "#ff1493",
    ribbonColor: "#ffd700",
    surpriseMessage: "Espero que cumplas todo lo que te propongas",
    surpriseImage: "/diannePequeña.jpg",
  },
  {
    position: [2.3, 0.2, -0.8] as [number, number, number],
    rotation: [0, -0.5, 0] as [number, number, number],
    size: 0.4,
    boxColor: "#9370db",
    ribbonColor: "#ff69b4",
    surpriseMessage: "",
    surpriseQuiz: {
      question: "¿Cuál es mi cosa favorita de ti?",
      options: [
        { text: "Tu sonrisa", isCorrect: false, response: "Tu sonrisa es hermosa, pero hay algo más..." },
        { text: "Tu forma de ser", isCorrect: true, response: "¡Exacto! Me encanta cómo eres, auténtica y especial 💕" },
        { text: "Tus ojos", isCorrect: false, response: "Tus ojos son hermosos, pero hay algo más profundo..." },
        { text: "Todo", isCorrect: false, response: "Casi! Pero si tuviera que elegir una cosa..." },
      ],
    },
  },
  {
    position: [-1.8, 0.125, -1.2] as [number, number, number],
    rotation: [0, 0.8, 0] as [number, number, number],
    size: 0.25,
    boxColor: "#00ced1",
    ribbonColor: "#ffa500",
    surpriseMessage: "El 3 de Septiembre comenzamos a hacer historia",
    surpriseImage: "/flowers.jpg",
  },
  {
    position: [1.9, 0.175, 1.5] as [number, number, number],
    rotation: [0, -0.2, 0] as [number, number, number],
    size: 0.35,
    boxColor: "#ff6347",
    ribbonColor: "#32cd32",
    surpriseMessage: "Te quiero mucho, aunque no te bañes",
    surpriseImage: "/familyPicture.jpg",
  },
  {
    position: [-2.5, 0.1, 1.8] as [number, number, number],
    rotation: [0, 1.2, 0] as [number, number, number],
    size: 0.2,
    boxColor: "#ff69b4",
    ribbonColor: "#ffff00",
    surpriseMessage: "Gracias por ser parte de mi vida",
    surpriseImage: "/together.jpg", 
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
