import { useCallback, useEffect, useImperativeHandle, useRef, useState, forwardRef } from "react";

type MusicPlayerProps = {
  songs: string[];
  onSongChange?: () => void;
  existingAudio?: HTMLAudioElement | null;
};

export type MusicPlayerHandle = {
  play: () => void;
  pause: () => void;
};

export const MusicPlayer = forwardRef<MusicPlayerHandle, MusicPlayerProps>(
  ({ songs, existingAudio, onSongChange }, ref) => {
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const hasInitialized = useRef(false);

    // Initialize with existing audio ONCE on mount - no manipulation
    useEffect(() => {
      if (!hasInitialized.current && existingAudio) {
        audioRef.current = existingAudio;
        setIsPlaying(!existingAudio.paused);
        hasInitialized.current = true;
      }
    }, [existingAudio]);

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
      // Stop current audio
      if (audioRef.current) {
        audioRef.current.pause();
      }
      onSongChange?.();
      
      const newIndex = (currentSongIndex + 1) % songs.length;
      const audio = new Audio(songs[newIndex]);
      audio.loop = true;
      audioRef.current = audio;
      setCurrentSongIndex(newIndex);
      
      audio.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }, [currentSongIndex, songs, onSongChange]);

    const prevSong = useCallback(() => {
      // Stop current audio
      if (audioRef.current) {
        audioRef.current.pause();
      }
      onSongChange?.();
      
      const newIndex = (currentSongIndex - 1 + songs.length) % songs.length;
      const audio = new Audio(songs[newIndex]);
      audio.loop = true;
      audioRef.current = audio;
      setCurrentSongIndex(newIndex);
      
      audio.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }, [currentSongIndex, songs, onSongChange]);

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
