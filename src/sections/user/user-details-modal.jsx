// src/sections/user/user-details-modal.jsx
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Avatar,
  Grid,
} from '@mui/material';

export default function UserDetailsModal({ user, open, onClose }) {
  if (!user) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>User Details</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Avatar src={user.image} alt={user.firstName} sx={{ width: 100, height: 100 }} />
          </Grid>
          <Grid item xs>
            <Typography variant="h6">{`${user.firstName} ${user.lastName}`}</Typography>
            <Typography variant="body1">{user.email}</Typography>
            <Typography variant="body2">{user.phone}</Typography>
          </Grid>
        </Grid>
        <Typography variant="subtitle1" mt={2}>Company</Typography>
        <Typography variant="body1">{user.company.name}</Typography>
        <Typography variant="body2">{user.company.title}</Typography>
        <Typography variant="subtitle1" mt={2}>Address</Typography>
        <Typography variant="body2">{`${user.address.address}, ${user.address.city}, ${user.address.state} ${user.address.postalCode}`}</Typography>
        <Typography variant="subtitle1" mt={2}>Username</Typography>
        <Typography variant="body2">{user.username}</Typography>
        <Typography variant="subtitle1" mt={2}>Date of Birth</Typography>
        <Typography variant="body2">{user.birthDate}</Typography>
        <Typography variant="subtitle1" mt={2}>Age</Typography>
        <Typography variant="body2">{user.age}</Typography>
        <Typography variant="subtitle1" mt={2}>Gender</Typography>
        <Typography variant="body2">{user.gender}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

UserDetailsModal.propTypes = {
  user: PropTypes.object,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};