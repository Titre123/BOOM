import React, {useRef, useState} from 'react';
import { FaBackward, FaPlay, FaPause, FaForward, FaRandom, FaRedo } from 'react-icons/fa';
import '../../styles/dashboard/audioplayer.css';


export default function AudioPlayer({ audioSrc, ImgSrc  }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  const handlePlayPauseClick = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleBackwardClick = () => {
    audioRef.current.currentTime -= 10;
  };

  const handleForwardClick = () => {
    audioRef.current.currentTime += 10;
  };

  const handleRandomClick = () => {
    setIsShuffling(!isShuffling);
  };

  const handleLoopClick = () => {
    setIsLooping(!isLooping);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
    // onTimeUpdate && onTimeUpdate(audioRef.current.currentTime);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    audioRef.current.currentTime = 0;
    // onEnded && onEnded();
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const timer = (time) => {
    let timer;
    const min = Math.floor(time / 60);
    let sec = Math.round(time % 60);
    if (sec < 9.9) {
      sec = '0' + sec;
    }
    if (sec == 60) {
      sec = '00'
    }
    timer = `${min}:${sec}`;
    return timer
  }

  return (
    <div className="audio-player">
      <img src={ImgSrc} alt='' className='listen-img' />
      <input
        type="range"
        min={0}
        max={duration}
        value={currentTime}
        onChange={(e) => {
          audioRef.current.currentTime = e.target.value;
          setCurrentTime(e.target.value);
        }}
      />
      <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '10px'}}>
        <p style={{fontSize: '0.875rem'}}>{timer(currentTime)}</p>
        <p style={{fontSize: '0.875rem'}}>{timer(duration)}</p>
      </div>
      <audio
        ref={audioRef}
        src={audioSrc}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onLoadedMetadata={handleLoadedMetadata}
        loop={isLooping}
      />
      <div className="audio-controls">
        <button onClick={handleRandomClick} className={isShuffling ? 'active' : ''}>
          <FaRandom />
        </button>
        <button onClick={handleBackwardClick}>
          <FaBackward />
        </button>
        <button onClick={handlePlayPauseClick} className='player'>
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <button onClick={handleForwardClick}>
          <FaForward />
        </button>
        <button onClick={handleLoopClick} className={isLooping ? 'active' : ''}>
          <FaRedo />
        </button>
      </div>
      
    </div>
  );
}
