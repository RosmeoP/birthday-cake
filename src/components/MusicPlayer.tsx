import { useCallback, useEffect, useImperativeHandle, useRef, useState, forwardRef } from "react";

type MusicPlayerProps = {
  songs: string[];
  onSongChange?: (index: number) => void;
  existingAudio?: HTMLAudioElement | null;
};

export type MusicPlayerHandle = {
  play: () => void;
  pause: () => void;
};

export const MusicPlayer = forwardRef<MusicPlayerHandle, MusicPlayerProps>(
  ({ songs, existingAudio }, ref) => {
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const lastSongIndexRef = useRef(-1);

    // Initialize with existing audio ONCE on mount
    useEffect(() => {
      if (existingAudio && lastSongIndexRef.current === -1) {
        audioRef.current = existingAudio;
        existingAudio.loop = true;
        setIsPlaying(!existingAudio.paused);
        lastSongIndexRef.current = 0;
      }
    }, [existingAudio]);

    // Handle song changes - only when index actually changes
    useEffect(() => {
      // Skip if this is the same song or initial mount
      if (lastSongIndexRef.current === currentSongIndex) {
        return;
      }
      
      // Skip first render (handled by existingAudio effect)
      if (lastSongIndexRef.current === -1) {
        return;
      }

      // Pause current audio
      if (audioRef.current) {
        audioRef.current.pause();
      }

      // Create and play new audio
      const audio = new Audio(songs[currentSongIndex]);
      audio.loop = true;
      audio.currentTime = 0; // Start from beginning
      audioRef.current = audio;
      lastSongIndexRef.current = currentSongIndex;
      
      audio.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));

      // No cleanup - we handle pausing manually when changing songs
    }, [currentSongIndex, songs]);

    const play = useCallback(() => {
      const audio = audioRef.current;
      if (audio) {
        audio.play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    }, []);

    const pause = useCallback(() => {
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
        setIsPlaying(false);
      }
    }, []);

    useImperativeHandle(ref, () => ({
      play,
      pause,
    }), [play, pause]);

    const nextSong = useCallback(() => {
      setCurrentSongIndex((current) => (current + 1) % songs.length);
    }, [songs.length]);

    const prevSong = useCallback(() => {
      setCurrentSongIndex((current) => (current - 1 + songs.length) % songs.length);
    }, [songs.length]);

    const togglePlay = useCallback(() => {
      if (isPlaying) {
        pause();
      } else {
        play();
      }
    }, [isPlaying, play, pause]);

    return (
      <div className="music-player">
        <button onClick={prevSong} type="button" className="music-btn">
          ⏮
        </button>
        <button onClick={togglePlay} type="button" className="music-btn music-play">
          {isPlaying ? '⏸' : '▶️'}
        </button>
        <button onClick={nextSong} type="button" className="music-btn">
          ⏭
        </button>
        <span className="music-track">
          {currentSongIndex + 1}/{songs.length}
        </span>
      </div>
    );
  }
);

MusicPlayer.displayName = 'MusicPlayer';
