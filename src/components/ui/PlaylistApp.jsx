import React, { useState, useRef } from 'react';
import { PlayCircle, PauseCircle, Volume2, VolumeX } from 'lucide-react';

const PlaylistApp = () => {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const playlist = [
    {
      id: 1,
      title: "Vídeo 1",
      description: "Gol de Ronaldinho Gaúcho contra a Inglaterra na Copa de 2002",
      thumbnail: "/thumber01.jpg",
      duration: "00:00",
      url: "/video01.mp4"
    },
    {
      id: 2,
      title: "Vídeo 2",
      description: "Gol de Cristiano Ronaldo contra a Juventus Pela UEFA Champions League",
      thumbnail: "/thumber02.jpg",
      duration: "00:00",
      url: "/video02.mp4"
    },
    {
      id: 3,
      title: "Vídeo 3",
      description: "Gol de Falta de Messi contra o Liverpool Pela UEFA Champions League",
      thumbnail: "/thumber03.jpg",
      duration: "00:00",
      url: "/video03.mp4"
    }
  ];

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoChange = (index) => {
    setCurrentVideo(index);
    setIsPlaying(false);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  const handleTimeUpdate = (e) => {
    if (videoRef.current) {
      videoRef.current.currentTime = e.target.value;
    }
  };

  return (
    <div className="fixed inset-0 flex w-full h-full bg-gray-100">
      {/* Área principal do vídeo */}
      <div className="w-3/4 h-full flex flex-col bg-white">
        <div className="flex-1 relative bg-black">
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-contain"
            src={playlist[currentVideo].url}
            poster={playlist[currentVideo].thumbnail}
          />
        </div>
        
        {/* Controles do vídeo */}
        <div className="p-6 space-y-4">
          <div className="flex items-center space-x-4">
            <button onClick={handlePlayPause} className="p-2 bg-white rounded-full">
              {isPlaying ? 
                <PauseCircle className="w-8 h-8 text-black" /> : 
                <PlayCircle className="w-8 h-8 text-black" />
              }
            </button>
            
            <input
              type="range"
              className="flex-1"
              min="0"
              max={videoRef.current?.duration || 100}
              onChange={handleTimeUpdate}
            />
            
            <div className="flex items-center space-x-2">
              <button onClick={handleMuteToggle} className="bg-white rounded-full p-2">
                {isMuted ? 
                  <VolumeX className="w-6 h-6 text-black" /> : 
                  <Volume2 className="w-6 h-6 text-black" />
                }
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="w-24"
              />
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-bold text-black">{playlist[currentVideo].title}</h2>
            <p className="text-black">{playlist[currentVideo].description}</p>
          </div>
        </div>
      </div>
      
      {/* Playlist lateral */}
      <div className="w-1/4 h-full overflow-y-auto bg-gray-50 p-4">
        <h3 className="text-lg font-semibold mb-4 text-black">Playlist</h3>
        <div className="space-y-3">
          {playlist.map((video, index) => (
            <div
              key={video.id}
              onClick={() => handleVideoChange(index)}
              className={`flex cursor-pointer p-2 rounded-lg ${
                currentVideo === index ? 'bg-blue-100' : 'hover:bg-gray-100'
              }`}
            >
              <div className="w-32 h-20 bg-gray-200 rounded flex items-center justify-center overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={`${video.title} thumbnail`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-2">
                <h4 className="font-medium text-black">{video.title}</h4>
                <p className="text-sm text-black">{video.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlaylistApp;
