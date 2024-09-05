import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import {
  Dialog,
  Button,
  Container,
  Box,
  Typography,
  LinearProgress,
  styled
 } from '@mui/material';

const ColorLinearProgress = styled(LinearProgress)({
  color: '#ffff00',
  '& .MuiLinearProgress-barColorPrimary': {
    backgroundColor: '#ffff00',
  },
});

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
  const [songDuration, setSongDuration] = useState(0);

const handleDownload = (url, title) => {
  setSelectedSong({ url, title });
  setOpenDialog(true);
};

const confirmDownload = () => {
  const link = document.createElement('a');
  link.href = selectedSong.url;
  link.download = `${selectedSong.title}.mp3`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setOpenDialog(false);
};

const handleProgressBarClick = (event) => {
  const progressBar = event.currentTarget;
  const boundingRect = progressBar.getBoundingClientRect();
  const clickedPositionInPx = event.clientX - boundingRect.left;
  const widthOfProgressBarInPx = boundingRect.width;
  const clickedPositionAsPercentage = clickedPositionInPx / widthOfProgressBarInPx;
  const newCurrentTime = clickedPositionAsPercentage * songDuration;

  if (audioRef.current) {
    audioRef.current.currentTime = newCurrentTime;
    setProgress(newCurrentTime);
  }
};

  const songs = [
  {
      url: '/songs/tot-die-einde.mp3',
      title: 'tot die einde - Dieoutjiemusic',
      cover: '/Dieoutjiemuisic.png',
    },
    {
      url: '/songs/BITTERLIEF-VEJO-OUTJIE.mp3',
      title: 'BITTERLIEF VEJO OUTJIE - Dieoutjiemusic',
      cover: '/bitter.png',
    },
    {
      url: '/songs/PASOPA.mp3',
      title: 'PASOPA - Dieoutjiemusic',
      cover: '/passopa-bg.png',
    },
    // {
    //   url: '/songs/Moment-Remix.mp3',
    //   title: 'Moment-Remix - Dieoutjiemusic',
    //   cover: '/Dieoutjiemuisic.png',
    // },
    {
      url: '/songs/MoMent.mp3',
      title: 'MoMent - Dieoutjiemusic',
      cover: '/moment.png',
    },
    {
      url: '/songs/INCREDIBLE.mp3',
      title: 'INCREDIBLE - Dieoutjiemusic',
      cover: '/Dieoutjiemuisic.png',
    },
    {
      url: '/songs/Babalas.mp3',
      title: 'Babalas - Dieoutjiemusic',
      cover: '/Dieoutjiemuisic.png',
    },
    {
      url: '/songs/SEX-SO-GOOD.mp3',
      title: 'SEX-SO-GOOD - Dieoutjiemusic',
      cover: '/Dieoutjiemuisic.png',
    },
    {
      url: '/songs/Nee-Dankie.mp3',
      title: 'Nee Dankie - Dieoutjiemusic',
      cover: '/Dieoutjiemuisic.png',
    },
    {
      url: '/songs/African-Queen.mp3',
      title: 'African Queen - Dieoutjiemusic',
      cover: '/Dieoutjiemuisic.png',
    },
    {
      url: '/songs/Mooi-Toone.mp3',
      title: 'Mooi Toone - Dieoutjiemusic',
      cover: '/Dieoutjiemuisic.png',
    },
    {
      url: '/songs/goeiemore.mp3',
      title: 'goeiemore - Dieoutjiemusic',
      cover: '/Dieoutjiemuisic.png',
    },
    {
      url: '/songs/move-it.mp3',
      title: 'move it - Dieoutjiemusic',
      cover: '/Dieoutjiemuisic.png',
    },
    {
      url: '/songs/Oulike-Girl.mp3',
      title: 'Oulike Girl - Dieoutjiemusic',
      cover: '/Dieoutjiemuisic.png',
    },
    {
      url: '/songs/woelag.mp3',
      title: 'woelag - Dieoutjiemusic',
      cover: '/Dieoutjiemuisic.png',
    },
    {
      url: '/songs/Venus.mp3',
      title: 'Venus - Dieoutjiemusic',
      cover: '/Dieoutjiemuisic.png',
    },
    {
      url: '/songs/Beautifull.mp3',
      title: 'Beautifull - Dieoutjiemusic',
      cover: '/Dieoutjiemuisic.png',
    },
    {
      url: '/songs/SUKSESVOL.mp3',
      title: 'SUKSESVOL - Dieoutjiemusic',
      cover: '/Dieoutjiemuisic.png',
    },
    {
      url: '/songs/Welkom-By-Sukses.mp3',
      title: 'Welkom By Sukses - Dieoutjiemusic',
      cover: '/Dieoutjiemuisic.png',
    },
    {
      url: '/songs/Myne.mp3',
      title: 'Myne - Dieoutjiemusic',
      cover: '/Dieoutjiemuisic.png',
    },
    {
      url: '/songs/Rugsteekers.mp3',
      title: 'Rugsteekers - Dieoutjiemusic',
      cover: '/Dieoutjiemuisic.png',
    },
    {
      url: '/songs/Bozza.mp3',
      title: 'Bozza - Dieoutjiemusic',
      cover: '/Dieoutjiemuisic.png',
    },
    {
      url: '/songs/Blomme.mp3',
      title: 'Blomme - Dieoutjiemusic',
      cover: '/Dieoutjiemuisic.png',
    },
    {
      url: '/songs/Dangerous-Girl.mp3',
      title: 'Dangerous Girl - Dieoutjiemusic',
      cover: '/Dieoutjiemuisic.png',
    },
    {
      url: '/songs/HOE-LYKIT.mp3',
      title: 'HOE LYKIT - Dieoutjiemusic',
      cover: '/Dieoutjiemuisic.png',
    },
    {
      url: '/songs/Hoelank-nog.mp3',
      title: 'Hoelank nog - Dieoutjiemusic',
      cover: '/Dieoutjiemuisic.png',
    },
    {
      url: '/songs/KEN-JO-WAARDE.mp3',
      title: 'KEN JO WAARDE - Dieoutjiemusic',
      cover: '/Dieoutjiemuisic.png',
    },
    {
      url: '/songs/kroon.mp3',
      title: 'kroon - Dieoutjiemusic',
      cover: '/Dieoutjiemuisic.png',
    },
    {
      url: '/songs/LEWE-CHANGE.mp3',
      title: 'LEWE CHANGE - Dieoutjiemusic',
      cover: '/Dieoutjiemuisic.png',
    },
    {
      url: '/songs/Loyalty.mp3',
      title: 'Loyalty - Dieoutjiemusic',
      cover: '/Dieoutjiemuisic.png',
    },
    {
      url: '/songs/Vir-My,My.mp3',
      title: 'Vir My,My - Dieoutjiemusic',
      cover: '/Dieoutjiemuisic.png',
    },
    {
      url: '/songs/Waardes.mp3',
      title: 'Waardes - Dieoutjiemusic',
      cover: '/Dieoutjiemuisic.png',
    },
  ];

  const playSong = (songIndex, startTime = 0, playImmediately = true) => {
  const audioElement = new Audio(songs[songIndex].url);
  audioElement.currentTime = startTime;
  audioElement.onloadedmetadata = () => {
    setSongDuration(audioElement.duration);
  };
  if (playImmediately) {
    audioElement.play();
    setIsPlaying(true);
  }
  
  setCurrentSongIndex(songIndex);
  audioRef.current = audioElement;
  setProgress(0);
};

  const togglePlay = () => {
    const audioElement = audioRef.current;

    if (audioElement && isPlaying) {
      audioElement.pause();
      setIsPlaying(false);
    } else {
      if (audioElement) {
        audioElement.play();
        setIsPlaying(true);
      } else {
        playSong(currentSongIndex);
      }
    }
  };

  const skipForward = () => {
    const nextSongIndex = (currentSongIndex + 1) % songs.length;
    if (isPlaying) {
      audioRef.current.pause();
      playSong(nextSongIndex);
    } else {
      playSong(nextSongIndex, 0, false);
    }
    if (!isPlaying && audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    }
    setProgress(0);
    setSongDuration(0);
  };

  const skipBackward = () => {
  const audioElement = audioRef.current;

  if (audioElement.currentTime <= 5 && currentSongIndex !== 0) {
    if (isPlaying) {
      audioRef.current.pause();
    }
    playSong(currentSongIndex - 1, 0);
  } else {
    if (isPlaying) {
      audioRef.current.pause();
    }
    playSong(currentSongIndex, 0);
  }
  setProgress(0);
  setSongDuration(0);
};

useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying && audioRef.current) {
        setProgress(audioRef.current.currentTime);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying]);

useEffect(() => {
  const currentSongElement = document.getElementById(`song-${currentSongIndex}`);

  if (currentSongElement) {
    currentSongElement.scrollIntoView({ behavior: 'auto', block: 'nearest' });
  }
}, [currentSongIndex]);

  const handleSongClick = (songIndex) => {
  const isCurrentSong = currentSongIndex === songIndex;
  const audioElement = audioRef.current;

  if (audioElement && isPlaying && !isCurrentSong) {
    audioElement.pause();
    setIsPlaying(false);
  }

  if (!isCurrentSong) {
    playSong(songIndex);
  } else {
    togglePlay();
  }
};

  return (
    
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh',
        
      }}
    >
      <Box mt={3}>
        <Image src={songs[currentSongIndex].cover} alt="Album Cover" width={150} height={150} />
      </Box>
      <Box>{songs[currentSongIndex].title}</Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '70%',
          mt: 1,
          alignItems: 'center',
          maxWidth: 300,
        }}
      >
        <Image src="/skip-previous.svg" alt="Previous" width={20} height={20} onClick={skipBackward}/>
        <Image src={!isPlaying ? '/play.svg' : 'pause.svg'} alt="Play Icon" width={40} height={40} onClick={togglePlay}/>
        <Image src="/skip-next.svg" alt="next" width={20} height={20} onClick={skipForward}/>
      </Box>
      <Box sx={{color: 'white'}} mt={3}>{songs[currentSongIndex].title}</Box>
      <ColorLinearProgress
        onClick={handleProgressBarClick}
        sx={{ height: 10, width: {xs: '90%', md: '40%'}, borderRadius: 5, border: '1px solid orange', mt: 2}}
        variant="determinate"
        value={(progress / songDuration) * 100}
      />
      <Box sx={{ width: '100%', mt: 3, height: '400px', overflowY: 'auto' }}>
      {songs.map((song, index) => (
  <>
    <Box
      key={index}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        mt: 1,
      }}
    >
      <Box
        id={`song-${index}`}
        sx={{
          padding: 0.5,
          bgcolor: currentSongIndex === index ? '#FFD600' : '#FF9900',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          cursor: 'pointer',
          flexGrow: 1,
          width: '90%',
        }}
        onClick={() => handleSongClick(index)}
      >
        <Image src={song.cover} alt="Song Cover" width={30} height={30} />
        <Typography
          sx={{
            ml: 2,
            fontSize: 14,
            fontWeight: currentSongIndex === index ? 700 : 400,
            color: 'black',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: 'calc(100% - 32px)', // Adjust as needed to fit other elements
          }}
        >
          {song.title.length > 25 ? `${song.title.slice(0, 25)}...` : song.title}
        </Typography>
      </Box>
      <Button
        onClick={(e) => { 
          e.preventDefault(); 
          handleDownload(song.url, song.title); 
        }}
        id={`song-${index}`}
        sx={{
          minWidth: 'auto',
          width: 40,
          height: 40,
          ml: 1,
          mr: 1,
          p: 0,
          color: 'pink',
          bgcolor: currentSongIndex === index ? '#FFD600' : '#FF9900',
          border: '1px solid black',
          '&:hover': {
            backgroundColor: 'white',
          },
        }}
      >
        <Image src="/download.svg" alt="Download" width={20} height={20} />
      </Button>
    </Box>
  </>
))}

<Box
  sx={{
    textAlign: 'center',
    mt: 3,
  
  }}
  >
  
      </Box>
    </Box>
      <Dialog
      open={openDialog}
      onClose={() => setOpenDialog(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        textAlign: 'center', 
        '& .MuiDialog-paper': {
          width: '400px',
          borderRadius: '10px',
          p: 2,
        },
    }}
    >
      <Typography
      sx={{
        mb: 2,
        fontWeight: 700,
      }}
      >
        Download Song?
      </Typography>
      <Typography
      sx={{
        mb: 2,
        fontWeight: 100,
        fontSize: 14,
      }}
      >
        {selectedSong?.title}
      </Typography>
      <Box>
        <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
        <Button onClick={confirmDownload} autoFocus>Download</Button>
      </Box>
    </Dialog>
    </Container>
  );
};

export default MusicPlayer;