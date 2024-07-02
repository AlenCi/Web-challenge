// src/sections/user/user-table-row.jsx
import PropTypes from 'prop-types';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';

export default function UserTableRow({
  name,
  avatarUrl,
  email,
  age,
  phone,
  address,
  onRowClick,
}) {
  return (
    <TableRow hover tabIndex={-1} onClick={onRowClick} sx={{ cursor: 'pointer' }}>
      <TableCell component="th" scope="row"  sx={{ pl: 3 }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar alt={name} src={avatarUrl} />
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Stack>
      </TableCell>

      <TableCell>{email}</TableCell>

      <TableCell>{age}</TableCell>

      <TableCell>{phone}</TableCell>

      <TableCell>{`${address.address}, ${address.city}`}</TableCell>
    </TableRow>
  );
}

UserTableRow.propTypes = {
  avatarUrl: PropTypes.string,
  email: PropTypes.string,
  name: PropTypes.string,
  onRowClick: PropTypes.func,
  age: PropTypes.number,
  phone: PropTypes.string,
  address: PropTypes.object,
};