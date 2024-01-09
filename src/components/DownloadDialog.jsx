// // DownloadDialog.jsx

// import React from 'react';
// import { Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton } from '@mui/material';
// import CloseIcon from '../../public/close.svg';

// const DownloadDialog = ({ open, onClose, onDownload, songName }) => {
//   return (
//     <Dialog open={open} onClose={onClose}>
//       <DialogTitle>
//         <IconButton sx={{ position: 'absolute', right: 0, top: 0 }} onClick={onClose}>
//           <CloseIcon />
//         </IconButton>
//       </DialogTitle>
//       <DialogContent>
//         <DialogTitle>Download?</DialogTitle>
//         <DialogContent dividers>
//           <p>{songName}</p>
//         </DialogContent>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onDownload} variant="contained" color="primary">
//           Yes
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default DownloadDialog;
