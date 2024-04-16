import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Menu, MenuItem } from '@mui/material';

const TopNav = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{
      background: 'linear-gradient(to bottom, #FF9900, rgba(255, 165, 0, 0))',
    }}>
      <Toolbar>
        <Typography fontSize={15} fontWeight={100} component="div" sx={{ flexGrow: 1 }}>
          Stryt Vannie Georgie
        </Typography>

        <div>
          <Menu
            id="portfolio-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Portfolio</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default TopNav;
