// src/sections/user/view/user-view.jsx
import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CircularProgress from '@mui/material/CircularProgress';

import TableEmptyRows from '../table-empty-rows';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import UserDetailsModal from '../user-details-modal';
import { emptyRows, applyFilter, getComparator } from '../utils';
import { fetchUsers, searchUsers, addUser, updateUser, deleteUser } from 'src/services/api';

export default function UserView() {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('age'); 
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [selectedUser, setSelectedUser] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [addUserModalOpen, setAddUserModalOpen] = useState(false);
    const [editUserModalOpen, setEditUserModalOpen] = useState(false);
    const [newUser, setNewUser] = useState({ firstName: '', lastName: '', email: '', age: '' });
    const [editUser, setEditUser] = useState(null);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        setLoading(true);
        try {
            const data = await fetchUsers();
            setUsers(data.users);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
        setLoading(false);
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    const handleFilterByName = (event) => {
        setPage(0);
        setFilterName(event.target.value);
    };

    const handleRowClick = (user) => {
        setSelectedUser(user);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleAddUser = () => {
        setAddUserModalOpen(true);
    };

    const handleCloseAddUserModal = () => {
        setAddUserModalOpen(false);
        setNewUser({ firstName: '', lastName: '', email: '', age: '' });
    };

    const handleSubmitNewUser = async () => {
        try {
            await addUser(newUser);
            handleCloseAddUserModal();
            fetchUserData();
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    const handleEditUser = (user) => {
        setEditUser(user);
        setEditUserModalOpen(true);
    };

    const handleCloseEditUserModal = () => {
        setEditUserModalOpen(false);
        setEditUser(null);
    };

    const handleSubmitEditUser = async () => {
        try {
            await updateUser(editUser.id, editUser);
            handleCloseEditUserModal();
            fetchUserData();
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            await deleteUser(userId);
            fetchUserData();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const dataFiltered = applyFilter({
        inputData: users,
        comparator: getComparator(order, orderBy),
        filterName,
    });

    const notFound = !dataFiltered.length && !!filterName;

    return (
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4">Users</Typography>
                <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleAddUser}>
                    New User
                </Button>
            </Stack>

            <Card>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mx={2} my={2}>
                    <TextField
                        value={filterName}
                        onChange={handleFilterByName}
                        placeholder="Search user..."
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Stack>

                <Scrollbar>
                    <TableContainer sx={{ overflow: 'unset' }}>
                        <Table sx={{ minWidth: 800 }}>
                            <UserTableHead
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleRequestSort}
                                headLabel={[
                                    { id: 'firstName', label: 'Name' },
                                    { id: 'email', label: 'Email' },
                                    { id: 'age', label: 'Age' },
                                    { id: 'phone', label: 'Phone' },
                                    { id: 'address', label: 'Address' },
                                    { id: 'actions', label: 'Actions' },
                                ]}
                            />
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={6} align="center">
                                            <CircularProgress />
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    dataFiltered
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => (
                                            <UserTableRow
                                                key={row.id}
                                                name={`${row.firstName} ${row.lastName}`}
                                                email={row.email}
                                                age={row.age}
                                                avatarUrl={row.image}
                                                phone={row.phone}
                                                address={row.address}
                                                onRowClick={() => handleRowClick(row)}
                                                onEdit={() => handleEditUser(row)}
                                                onDelete={() => handleDeleteUser(row.id)}
                                            />
                                        ))
                                )}
                                <TableEmptyRows
                                    height={77}
                                    emptyRows={emptyRows(page, rowsPerPage, dataFiltered.length)}
                                />

                                {notFound && (
                                    <TableBody>
                                        <tr>
                                            <td colSpan={6} align="center">
                                                <Typography variant="h6">No users found</Typography>
                                            </td>
                                        </tr>
                                    </TableBody>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbar>

                <TablePagination
                    page={page}
                    component="div"
                    count={dataFiltered.length}
                    rowsPerPage={rowsPerPage}
                    onPageChange={handleChangePage}
                    rowsPerPageOptions={[5, 10, 25]}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Card>

            <UserDetailsModal
                user={selectedUser}
                open={modalOpen}
                onClose={handleCloseModal}
            />

            <Dialog open={addUserModalOpen} onClose={handleCloseAddUserModal}>
                <DialogTitle>Add New User</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="First Name"
                        type="text"
                        fullWidth
                        value={newUser.firstName}
                        onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Last Name"
                        type="text"
                        fullWidth
                        value={newUser.lastName}
                        onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Email"
                        type="email"
                        fullWidth
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Age"
                        type="number"
                        fullWidth
                        value={newUser.age}
                        onChange={(e) => setNewUser({ ...newUser, age: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAddUserModal}>Cancel</Button>
                    <Button onClick={handleSubmitNewUser}>Add</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={editUserModalOpen} onClose={handleCloseEditUserModal}>
                <DialogTitle>Edit User</DialogTitle>
                <DialogContent>
                    {editUser && (
                        <>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="First Name"
                                type="text"
                                fullWidth
                                value={editUser.firstName}
                                onChange={(e) => setEditUser({ ...editUser, firstName: e.target.value })}
                            />
                            <TextField
                                margin="dense"
                                label="Last Name"
                                type="text"
                                fullWidth
                                value={editUser.lastName}
                                onChange={(e) => setEditUser({ ...editUser, lastName: e.target.value })}
                            />
                            <TextField
                                margin="dense"
                                label="Email"
                                type="email"
                                fullWidth
                                value={editUser.email}
                                onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                            />
                            <TextField
                                margin="dense"
                                label="Age"
                                type="number"
                                fullWidth
                                value={editUser.age}
                                onChange={(e) => setEditUser({ ...editUser, age: e.target.value })}
                            />
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditUserModal}>Cancel</Button>
                    <Button onClick={handleSubmitEditUser}>Save</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}