import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Typography, Box, Grid } from '@mui/material';
import videos from '../../components/VideoData'; // Import video data from VideoData.js
import PlayArrowIcon from '@mui/icons-material/PlayArrow'; // Import the PlayArrow icon from MUI

const VideoPlayerPage = () => {
  const router = useRouter();
  const { title: initialTitle } = router.query;
  const [title, setTitle] = useState(initialTitle);
  const [videoSrc, setVideoSrc] = useState(`/videos/${encodeURIComponent(initialTitle)}.mp4`);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(null);
  const [duration, setDuration] = useState(0); // State to hold video duration
  const videoRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0); // Store scroll position

  useEffect(() => {
    // Set up event listener for when video metadata is loaded
    const handleMetadataLoaded = () => {
      // Ensure videoRef.current is not null before accessing duration
      if (videoRef.current) {
        // Update the state with the loaded duration
        setDuration(videoRef.current.duration);
      }
    };

    // Add event listener
    if (videoRef.current) {
      videoRef.current.addEventListener('loadedmetadata', handleMetadataLoaded);
    }

    // Remove event listener when component unmounts
    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('loadedmetadata', handleMetadataLoaded);
      }
    };
  }, [videoRef]); // Dependency array to ensure effect runs only when videoRef changes

  const handleVideoClick = (newSrc, newTitle, index) => {
    setScrollPosition(window.pageYOffset || document.documentElement.scrollTop); // Save scroll position
    setVideoSrc(newSrc);
    setTitle(newTitle);
    setSelectedVideoIndex(index);
    // Autoplay the video
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const formatDuration = (totalSeconds) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

  return (
    <div>
      <Grid container spacing={2} mt={3}>
        <Grid item xs={12} md={12} lg={8}>
          <Box sx={{mx: {xs: 1, md: 5}, mt:{xs: -3.8, md: 2}}}>
            <video src={videoSrc} controls autoPlay ref={videoRef} style={{ width: '100%' }} />
            <Typography color={'white'} variant="subtitle1" sx={{ mt: {xs: 1, md: 2} }}>{title}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={12} lg={4}>
          <Box m={2} overflow="hidden" sx={{ border: "1px solid rgba(255, 255, 255, 0.5)", borderRadius: 2,  maxHeight: {xs: 330, md: 600} }}>
            <Box sx={{ height: 60, mb: 1, bgcolor: 'rgba(255, 255, 255, 0.3)', borderTopLeftRadius: 2, borderTopRightRadius: 2}}>
            <Typography variant='h6' color={'white'} pl={4} pt={2} sx={{ }}>Dieoutjiemuisic Muisic Videos</Typography>
            </Box>
            {videos.map((video, index) => (
              <Box key={index} py={1} onClick={() => handleVideoClick(video.url, video.title, index)} sx={{ pl: selectedVideoIndex === index ? 1 : 4, display: "flex", flexDirection: "row", alignItems: "center", backgroundColor: selectedVideoIndex === index ? 'rgba(255, 255, 255, 0.2)' : 'transparent', width: '100%', overflow: 'hidden', cursor: 'pointer', position: "relative", '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}>
                {selectedVideoIndex === index && <PlayArrowIcon sx={{ color: "white", position: "relative", top: "50%", right: "1%", }} />}
                <Box sx={{ position: "relative", width: {xs: '130px', md: '130px'}, marginRight: '10px' }}>
                  <video src={video.url} style={{ width: '100%', borderRadius: 4}}  />
                  <Box sx={{ position: "absolute", bottom: 4, right: 2, backgroundColor: "rgba(0, 0, 0, 0.5)", padding: "2px 6px", borderRadius: 2 }}>
                    <Typography variant="body2" sx={{ color: 'white' }}>{formatDuration(duration)}</Typography>
                  </Box>
                </Box>
                <Box color={'white'}>
                  <Typography sx={{ fontSize: { xs: '14px', md: '16px' } }}>{video.title}</Typography>
                  <Typography color={'gray'} sx={{ fontSize: { xs: '12px', md: '12px' } }}>Dieoutjiemuisic</Typography>
                </Box>
              </Box>
            ))}
          </Box> 
        </Grid>
      </Grid>
    </div>
  );
};

export default VideoPlayerPage;
