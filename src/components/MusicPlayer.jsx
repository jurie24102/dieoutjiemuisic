import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button,
  Container, Box, Typography
 } from '@mui/material';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);
  const [openDialog, setOpenDialog] = useState(false);
const [selectedSong, setSelectedSong] = useState(null);

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

  const songs = [
    {
      url: '/Kani-slaapie.mp3',
      title: 'Kani slaapie - Dieoutjiemusic',
      cover: '/Dieoutjiemuisic.png',
    },
    // {
    //   url: '/Myne.mp3',
    //   title: 'Myne - Dieoutjiemusic',
    //   cover: '/Dieoutjiemuisic.png',
    // },
    // {
    //   url: '/Rugsteekers.mp3',
    //   title: 'Rugsteekers - Dieoutjiemusic',
    //   cover: '/Dieoutjiemuisic.png',
    // },
    {
      url: '/Bozza.mp3',
      title: 'Bozza - Dieoutjiemusic',
      cover: '/Dieoutjiemuisic.png',
    },
    {
      url: '/Blomme.mp3',
      title: 'Blomme - Dieoutjiemusic',
      cover: '/Dieoutjiemuisic.png',
    },
    {
      url: '/DangerousGirl.mp3',
      title: 'Dangerous Girl - Dieoutjiemusic',
      cover: '/Dieoutjiemuisic.png',
    },
    {
      url: '/HOE-LYKIT.mp3',
      title: 'HOE LYKIT - Dieoutjiemusic',
      cover: '/Dieoutjiemuisic.png',
    },
    // {
    //   url: '/Hoelank-nog.mp3',
    //   title: 'Hoelank nog - Dieoutjiemusic',
    //   cover: '/Dieoutjiemuisic.png',
    // },
    // {
    //   url: '/KEN-JO-WAARDE.mp3',
    //   title: 'KEN JO WAARDE - Dieoutjiemusic',
    //   cover: '/Dieoutjiemuisic.png',
    // },
    // {
    //   url: '/kroon.mp3',
    //   title: 'kroon - Dieoutjiemusic',
    //   cover: '/Dieoutjiemuisic.png',
    // },
    // {
    //   url: '/LEWE-CHANGE.mp3',
    //   title: 'LEWE CHANGE - Dieoutjiemusic',
    //   cover: '/Dieoutjiemuisic.png',
    // },
    // {
    //   url: '/Loyalty.mp3',
    //   title: 'Loyalty - Dieoutjiemusic',
    //   cover: '/Dieoutjiemuisic.png',
    // },
    // {
    //   url: '/Vir-My,My.mp3',
    //   title: 'Vir My,My - Dieoutjiemusic',
    //   cover: '/Dieoutjiemuisic.png',
    // },
    // {
    //   url: '/Waardes.mp3',
    //   title: 'Waardes - Dieoutjiemusic',
    //   cover: '/Dieoutjiemuisic.png',
    // },
    // Add more song objects here
  ];

  const playSong = (songIndex, startTime = 0, playImmediately = true) => {
  const audioElement = new Audio(songs[songIndex].url);
  audioElement.currentTime = startTime;
  if (playImmediately) {
    audioElement.play();
    setIsPlaying(true);
  }
  setCurrentSongIndex(songIndex);
  audioRef.current = audioElement;
  setProgress(0); // Reset progress when changing the song
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
  };

  const skipBackward = () => {
  const audioElement = audioRef.current;

  if (audioElement.currentTime <= 5 && currentSongIndex !== 0) {
    if (isPlaying) {
      audioRef.current.pause();
    }
    setProgress(0); // Reset progress when skipping backward
    playSong(currentSongIndex - 1, 0);
  } else {
    if (isPlaying) {
      audioRef.current.pause();
    }
    setProgress(0); // Reset progress when skipping to the same song
    playSong(currentSongIndex, 0);
  }
};

useEffect(() => {
    const currentSongElement = document.getElementById(`song-${currentSongIndex}`);

    if (currentSongElement) {
      currentSongElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [currentSongIndex]);

  const handleSongClick = (songIndex) => {
  const isCurrentSong = currentSongIndex === songIndex;
  const audioElement = audioRef.current;

  if (audioElement && isPlaying && !isCurrentSong) {
    audioElement.pause(); // Pause the current song if it's playing and not the clicked one
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
        height: '90vh', // Adjust the height as needed
      }}
    >
      <Box mt={5}>
        <Image src={songs[currentSongIndex].cover} alt="Album Cover" width={200} height={200} />
      </Box>
      <Box mt={2}>{songs[currentSongIndex].title}</Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '70%',
          mt: 3,
          alignItems: 'center',
        }}
      >
        <Image src="/skip-previous.svg" alt="Previous" width={20} height={20} onClick={skipBackward}/>
        <Image src={!isPlaying ? '/play.svg' : 'pause.svg'} alt="Play Icon" width={40} height={40} onClick={togglePlay}/>
        <Image src="/skip-next.svg" alt="next" width={20} height={20} onClick={skipForward}/>
      </Box>
      <Box sx={{ width: '100%', mt: 3, height: '400px', overflowY: 'auto' }}>
      {songs.map((song, index) => (
        <>
  <Box
    key={index} // Add the key prop here
    sx={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      mt: 1.5,
    }}
  >
    <Box
      id={`song-${index}`} // Add an id to each song element
      sx={{
        padding: 1,
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
      <Image src={song.cover} alt="Song Cover" width={40} height={40} />
      <Typography
        sx={{
          ml: 2,
          fontSize: 14,
          fontWeight: currentSongIndex === index ? 700 : 400,
          color: 'black',
        }}
      >
        {song.title}
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
    width: 50,
    height: 50,
    ml: 1,
    mr: 1,
    p: 0,
    color: 'pink',
    bgcolor: currentSongIndex === index ? '#FFD600' : '#FF9900',
    border: '1px solid black',
    // if hover make it white
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
  <Typography
        sx={{
          ml: 2,
          mb: 10,
          fontSize: 14,
          color: 'white',
        }}
      >
        Previous songs are being remastered and will be available soon.
      </Typography>
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