import React, { useContext } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { NavLink } from 'react-router-dom';
import { authContext } from '../hooks/AuthProvider';
import { Avatar, Tooltip } from '@mui/material';
import icon from '../images/icon.png'



const NavBar = () => {
  const { auth } = useContext(authContext)
  const pages = [
    auth && { label: 'SOLICITUDES', path: '/solicitudes' },
    auth && { label: 'HACER SOLICITUD', path: '/inicio' },
    !auth && { label: 'INICIAR SESION', path: '/' },
    !auth && { label: 'REGISTRO', path: '/register' }
  ];

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>


          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.label} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

            {auth && <> <NavLink key={'SOLICITUDES'} style={{ textDecoration: "none" }} to={'/solicitudes'}>
              <Button
                key={'SOLICITUDES'}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                SOLICITUDES
              </Button>
            </NavLink>
              <NavLink key={'HACER SOLICITUD'} style={{ textDecoration: "none" }} to={'/inicio'}>
                <Button
                  key={'HACER SOLICITUD'}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  HACER SOLICITUD
                </Button>
              </NavLink> </>}
            {!auth && <> <NavLink key={'REGISTRO'} style={{ textDecoration: "none" }} to={'/register'}>
              <Button
                key={'REGISTRO'}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                REGISTRO
              </Button>
            </NavLink>
              <NavLink key={'INICIAR SESION'} style={{ textDecoration: "none" }} to={'/'}>
                <Button
                  key={'INICIAR SESION'}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  INICIAR SESION
                </Button>
              </NavLink> </>}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="MuebleApp">
              <IconButton sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={icon}/>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}; export default NavBar
