# Audio and Quiz Implementation Guide 🎵📝

## What's Been Added

I've successfully implemented **audio player** and **quiz** functionality for both Easter eggs and gift boxes!

## Features

### 1. **Audio Support** 🎵
- Audio files can be played when opening gifts or discovering Easter eggs
- Built-in audio player with play/pause, seek bar, and time display
- Auto-plays by default (if browser allows)
- Clean, minimalistic design matching the polaroid style

### 2. **Quiz Support** 📝
- Multiple choice quizzes
- Custom responses for each answer (correct or incorrect)
- Visual feedback (green for correct, red for incorrect)
- 30-second display time (instead of 4-5 seconds for regular messages)

## How to Use

### Adding Audio to a Gift Box

1. Add your audio file to the `/public` folder (e.g., `/public/birthdayMessage.mp3`)
2. In `GiftBoxes.tsx`, add `surpriseAudio` to any gift:

```typescript
{
  position: [2.3, 0.2, -0.8],
  // ... other properties
  surpriseAudio: "/birthdayMessage.mp3", // Path to your audio file
  surpriseMessage: "Listen to this special message!",
}
```

### Adding Audio to an Easter Egg

In `App.tsx`, add `secretAudio` prop:

```typescript
<EasterEgg
  position={[-2.5, 0.5, 1]}
  hiddenObjectType="heart"
  secretMessage="🎵 A special song for you"
  secretAudio="/specialSong.mp3"
  onDiscovered={onEasterEggDiscovered}
/>
```

### Adding a Quiz to a Gift Box

In `GiftBoxes.tsx`, I've already added an example quiz to the second gift box:

```typescript
{
  position: [2.3, 0.2, -0.8],
  // ... other properties
  surpriseQuiz: {
    question: "¿Cuál es mi cosa favorita de ti?",
    options: [
      { 
        text: "Tu sonrisa", 
        isCorrect: false, 
        response: "Tu sonrisa es hermosa, pero hay algo más..." 
      },
      { 
        text: "Tu forma de ser", 
        isCorrect: true, 
        response: "¡Exacto! Me encanta cómo eres, auténtica y especial 💕" 
      },
      // ... more options
    ],
  },
}
```

### Adding a Quiz to an Easter Egg

In `App.tsx`, I've added an example to the gift Easter egg:

```typescript
<EasterEgg
  position={[1.8, 0.4, 2.8]}
  hiddenObjectType="gift"
  secretMessage="🎁 Eres el mejor regalo"
  secretQuiz={{
    question: "¿Cuándo fue nuestra primera cita?",
    options: [
      { text: "Agosto 2024", isCorrect: false, response: "¡Casi! Pero fue un poco más tarde..." },
      { text: "Septiembre 2024", isCorrect: true, response: "¡Correcto! 3 de Septiembre 💕" },
      // ... more options
    ],
  }}
  onDiscovered={onEasterEggDiscovered}
/>
```

## Combining Features

You can combine audio, images, messages, and quizzes in the same gift/Easter egg:

```typescript
{
  surpriseMessage: "Happy Birthday!",
  surpriseImage: "/birthdayPhoto.jpg",
  surpriseAudio: "/birthdayVoiceMessage.mp3",
  surpriseQuiz: {
    question: "What's your favorite memory?",
    options: [/* ... */],
  },
}
```

## Supported Audio Formats

- MP3 (recommended for best compatibility)
- WAV
- OGG
- M4A

## Tips

1. **Audio files**: Keep them under 5MB for faster loading
2. **Quiz answers**: Keep options short and sweet (1-2 lines max)
3. **Custom responses**: Make them personal and meaningful!
4. **Auto-hide timing**: Quizzes display for 30 seconds, regular messages for 4-5 seconds

## Current Examples

- **Gift Box 2** (Purple): Has a quiz about favorite things
- **Easter Egg (Gift icon)**: Has a quiz about your first date
- **Easter Egg (Star icon)**: Has beach picture

You can now add your own audio files and create more quizzes! 🎉
