import React, { useState, useRef, useEffect } from 'react';
import { Box, IconButton, Slider, Typography } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import StopIcon from '@mui/icons-material/Stop';

interface MediaPlayerProps {
  audioUrl?: string;
  onTimeUpdate?: (time: number) => void;
}

const MediaPlayer: React.FC<MediaPlayerProps> = ({ audioUrl, onTimeUpdate }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
      audioRef.current.addEventListener('ended', handleEnded);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
        audioRef.current.removeEventListener('ended', handleEnded);
      }
    };
  }, []);

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      onTimeUpdate?.(audioRef.current.currentTime);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setCurrentTime(0);
    }
  };

  const handleSliderChange = (_: Event, newValue: number | number[]) => {
    if (audioRef.current && typeof newValue === 'number') {
      audioRef.current.currentTime = newValue;
      setCurrentTime(newValue);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
      <audio
        ref={audioRef}
        src={audioUrl}
        preload="metadata"
      />
      <IconButton 
        onClick={handlePlayPause} 
        color="primary"
        sx={{ 
          width: 40, 
          height: 40,
          bgcolor: 'primary.light',
          '&:hover': {
            bgcolor: 'primary.main',
          }
        }}
      >
        {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
      </IconButton>
      <IconButton 
        onClick={handleStop} 
        color="primary"
        sx={{ 
          width: 40, 
          height: 40,
          bgcolor: 'primary.light',
          '&:hover': {
            bgcolor: 'primary.main',
          }
        }}
      >
        <StopIcon />
      </IconButton>
      <Slider
        value={currentTime}
        max={duration}
        onChange={handleSliderChange}
        sx={{ 
          flex: 1,
          '& .MuiSlider-thumb': {
            width: 12,
            height: 12,
          },
          '& .MuiSlider-track': {
            height: 4,
          },
          '& .MuiSlider-rail': {
            height: 4,
          }
        }}
      />
      <Typography variant="body2" sx={{ minWidth: 100, textAlign: 'right' }}>
        {formatTime(currentTime)} / {formatTime(duration)}
      </Typography>
    </Box>
  );
};

export default MediaPlayer; 