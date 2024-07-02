// src/layouts/dashboard/header.jsx
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { googleLogout } from '@react-oauth/google';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import { useAuth } from 'src/contexts/AuthContext';
import { useResponsive } from 'src/hooks/use-responsive';
import { bgBlur } from 'src/theme/css';

import Iconify from 'src/components/iconify';

import { NAV, HEADER } from './config-layout';

export default function Header({ onOpenNav }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const lgUp = useResponsive('up', 'lg');
  const { user, logout } = useAuth();

  const handleLogout = () => {
    googleLogout();
    logout();
    navigate('/login');
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const renderContent = (
    <>
      {!lgUp && (
        <IconButton onClick={onOpenNav} sx={{ mr: 1 }}>
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
      )}

      <Box sx={{ flexGrow: 1 }} />

      <Stack direction="row" alignItems="center" spacing={2}>
        {user && (
          <>
            <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
              {getInitials(user.name)}
            </Avatar>
            <Typography variant="subtitle1" sx={{ color: 'text.primary' }}>
              {user.name}
            </Typography>
            <IconButton onClick={handleLogout}>
              <Iconify icon="eva:log-out-fill" />
            </IconButton>
          </>
        )}
      </Stack>
    </>
  );

  return (
    <AppBar
      sx={{
        boxShadow: 'none',
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(lgUp && {
          width: `calc(100% - ${NAV.WIDTH + 1}px)`,
          height: HEADER.H_DESKTOP,
        }),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      >
        {renderContent}
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  onOpenNav: PropTypes.func,
};