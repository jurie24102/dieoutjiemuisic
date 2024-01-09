import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Menu, MenuItem } from '@mui/material';
import menuIcon from '../../public/menuIcon.svg';
import Image from 'next/image';

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
      background: 'linear-gradient(to bottom, #FF9900, rgba(255, 165, 0, 0))', // Orange to transparent gradient
    }}>
      <Toolbar>
        <Typography fontSize={15} fontWeight={100} component="div" sx={{ flexGrow: 1 }}>
          Stryt Vannie Georgie
        </Typography>

        <div>
          {/* <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={handleClick}
          >
            <Image src={menuIcon} alt="menu icon" />
          </IconButton> */}
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
