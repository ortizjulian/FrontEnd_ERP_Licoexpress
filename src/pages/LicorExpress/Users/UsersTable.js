
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import useUsers from 'services/users/users';

import { MinusCircleOutlined } from '@ant-design/icons';

// material-ui
import { Box, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Modal, Typography } from '@mui/material';

function descendingComparator(a, b, UserBy) {
    if (b[UserBy] < a[UserBy]) {
        return -1;
    }
    if (b[UserBy] > a[UserBy]) {
        return 1;
    }
    return 0;
}

function getComparator(User, UserBy) {
    return User === 'desc' ? (a, b) => descendingComparator(a, b, UserBy) : (a, b) => -descendingComparator(a, b, UserBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const User = comparator(a[0], b[0]);
        if (User !== 0) {
            return User;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

// ==============================|| Proveedor TABLE - HEADER CELL ||============================== //

const headCells = [
    {
        id: 'id', //se puede eliminar
        align: 'left',
        disablePadding: false,
        label: 'ID'
    },
    {
        id: 'correo',
        align: 'left',
        disablePadding: false,
        label: 'Correo Electronico'
    },
    {
        id: 'rol',
        align: 'left',
        disablePadding: false,
        label: 'Rol'
    },
    {
        id: 'sede',
        align: 'left',
        disablePadding: false,
        label: 'Sede'
    }
];

// ==============================|| Proveedor TABLE - HEADER ||============================== //

function UserTableHead({ User, UserBy }) {
    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.align}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={UserBy === headCell.id ? User : false}
                    >
                        {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

UserTableHead.propTypes = {
    User: PropTypes.string,
    UserBy: PropTypes.string
};

// ==============================|| Proveedor TABLE ||============================== //

export default function UserTable({ rows ,getUsers}) {
    const [User] = useState('asc');
    const [UserBy] = useState('trackingNo');
    const [selected] = useState([]);

    const [visibleDelete, setVisibleDelete] = useState(false);
    const deleteOpen = (id) => {
        setUserId(id)
        setVisibleDelete(true)
    };
    const deleteClose = () => { setVisibleDelete(false) };

    const isSelected = (trackingNo) => selected.indexOf(trackingNo) !== -1;



    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const [idUser, setUserId] = useState('');

    const { deleteUsers } = useUsers()

    const eliminarUsuario = async () => {
        try {
            var aux = await deleteUsers(idUser);
            getUsers();
            deleteClose();
            console.log(aux);
        } catch (error) {
            console.error("Error al eliminar usuario: " + error);
        }
    };

    return (
        <Box>
            <TableContainer
                sx={{
                    width: '100%',
                    overflowX: 'auto',
                    position: 'relative',
                    display: 'block',
                    maxWidth: '100%',
                    '& td, & th': { whiteSpace: 'nowrap' }
                }}
            >
                <Table
                    aria-labelledby="tableTitle"
                    sx={{
                        '& .MuiTableCell-root:first-of-type': {
                            pl: 2
                        },
                        '& .MuiTableCell-root:last-of-type': {
                            pr: 3
                        }
                    }}
                >
                    <UserTableHead User={User} UserBy={UserBy} />
                    <TableBody>
                        {stableSort(rows, getComparator(User, UserBy)).map((row, index) => {
                            const isItemSelected = isSelected(row.id);
                            const labelId = `enhanced-table-checkbox-${index}`;

                            return (
                                <TableRow
                                    hover
                                    role="checkbox"
                                    sx={{ '&:last-child td, &:last-child th': { bProveedor: 0 } }}
                                    aria-checked={isItemSelected}
                                    tabIndex={-1}
                                    key={row.id}
                                    selected={isItemSelected}
                                >
                                    <TableCell component="th" id={labelId} scope="row" align="left">
                                        <Link color="secondary" component={RouterLink} to="">
                                            {row.id}
                                        </Link>
                                    </TableCell>
                                    <TableCell align="left">{row.correo}</TableCell>
                                    <TableCell align="left">{row.rol}</TableCell>
                                    <TableCell align="left">{row.sede}</TableCell>
                                    <TableCell align="right">
                                        <Button size="small" variant="contained" sx={{ textTransform: 'capitalize' }} startIcon={<MinusCircleOutlined />} onClick={() => deleteOpen(row.id)}>
                                            Eliminar
                                        </Button>
                                    </TableCell>

                                    <Modal
                                        open={visibleDelete}
                                        onClose={deleteClose}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                    >
                                        <Box sx={style}>
                                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                                Eliminar Usuario
                                            </Typography>
                                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                                ¿Seguro que deseas eliminar el usuario?
                                            </Typography>
                                            <Button onClick={eliminarUsuario} variant="contained" color="primary" sx={{ mt: 2 }}  >
                                                Eliminar
                                            </Button>
                                        </Box>
                                    </Modal>
                                   
                                
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
