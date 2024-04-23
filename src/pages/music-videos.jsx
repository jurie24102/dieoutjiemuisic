import React, { useState } from 'react';
import { Box, Typography, Grid } from '@mui/material';

const VideoCard = ({ video }) => {
  return (
    <Box sx={{ bgcolor: '#FFD600', m: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }} >
        <video
          id={`video-${video.title}`}
          src={video.url}
          controls
          controlsList="nodownload"
          style={{ maxWidth: '100%', maxHeight: '100%', display: 'block' }}
        />
      </Box>
      <Box px={2} py={1}>
        <Typography variant="h5" sx={{ fontSize: 18 }}>
          {video.title}
        </Typography>
      </Box>
    </Box>
  );
};

const VideoPage = () => {
  const videos = [
    {
      title: 'Babalas - Dieoutjiemuisic',
      url: '/videos/Babalas.mp4',
    },
  ];

  return (
    <Box>
      <Typography variant="h5" sx={{ fontSize: 18, color: 'white', mt: 3, mb: 1, textAlign: 'center' }}>
        Enjoy The Music Videos!
      </Typography>
      <Grid container spacing={0}>
        {videos.map((video, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <VideoCard video={video} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default VideoPage;
