// src/sections/user/user-table-row.jsx
import PropTypes from 'prop-types';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import Iconify from 'src/components/iconify';

export default function UserTableRow({
  name,
  avatarUrl,
  email,
  age,
  phone,
  address,
  onRowClick,
  onEdit,
  onDelete,
}) {
  return (
    <TableRow hover tabIndex={-1}>
      <TableCell component="th" scope="row" sx={{ pl: 3 }}>
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

      <TableCell>
        <Stack direction="row" spacing={1}>
          <Tooltip title="View Details">
            <IconButton onClick={onRowClick} size="small">
              <Iconify icon="eva:eye-fill" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton onClick={onEdit} size="small">
              <Iconify icon="eva:edit-fill" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton onClick={onDelete} size="small" sx={{ color: 'error.main' }}>
              <Iconify icon="eva:trash-2-outline" />
            </IconButton>
          </Tooltip>
        </Stack>
      </TableCell>
    </TableRow>
  );
}

UserTableRow.propTypes = {
  avatarUrl: PropTypes.string,
  email: PropTypes.string,
  name: PropTypes.string,
  onRowClick: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  age: PropTypes.number,
  phone: PropTypes.string,
  address: PropTypes.object,
};