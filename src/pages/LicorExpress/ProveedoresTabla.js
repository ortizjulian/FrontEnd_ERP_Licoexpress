import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { Box, Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

// project import
import Dot from 'components/@extended/Dot';

function createData(id, nombre, correo, contacto, estado) {
    return { id, nombre, correo, contacto, estado };
}

const rows = [
    createData(1, 'Bavaria', 'Bavariaempresa@gmail.com', 3016547819, 2),
    createData(5, 'provvedor1', 'ejemplo1@gmail1.com', 3016547819, 0),
    createData(4, 'provvedor2', 'ejemplo1@gmail2.com', 3016547819, 1),
    createData(2, 'provvedor3', 'ejemplo1@gmail3.com', 30147819, 1),
    createData(8, 'provvedor4', 'ejemplo1@gmail4.com', 3051647819, 1),
    createData(7, 'provvedor5', 'ejemplo1@gmail5com', 3016546819, 0)
];

function descendingComparator(a, b, ProveedorBy) {
    if (b[ProveedorBy] < a[ProveedorBy]) {
        return -1;
    }
    if (b[ProveedorBy] > a[ProveedorBy]) {
        return 1;
    }
    return 0;
}

function getComparator(Proveedor, ProveedorBy) {
    return Proveedor === 'desc' ? (a, b) => descendingComparator(a, b, ProveedorBy) : (a, b) => -descendingComparator(a, b, ProveedorBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const Proveedor = comparator(a[0], b[0]);
        if (Proveedor !== 0) {
            return Proveedor;
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
        id: 'nombre',
        align: 'left',
        disablePadding: true,
        label: 'Nombre'
    },
    {
        id: 'correo',
        align: 'right',
        disablePadding: false,
        label: 'Correo Electronico'
    },
    {
        id: 'contacto',
        align: 'left',
        disablePadding: false,
        label: 'Numero de contacto'
    },
    {
        id: 'estado',
        align: 'left',
        disablePadding: false,
        label: 'Estado'
    }
];

// ==============================|| Proveedor TABLE - HEADER ||============================== //

function ProveedorTableHead({ Proveedor, ProveedorBy }) {
    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.align}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={ProveedorBy === headCell.id ? Proveedor : false}
                    >
                        {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

ProveedorTableHead.propTypes = {
    Proveedor: PropTypes.string,
    ProveedorBy: PropTypes.string
};

// ==============================|| Proveedor TABLE - STATUS ||============================== //

const ProveedorStatus = ({ status }) => {
    let color;
    let title;

    switch (status) {
        case 0:
            color = 'warning';
            title = 'Pendiente';
            break;
        case 1:
            color = 'success';
            title = 'Activo';
            break;
        case 2:
            color = 'error';
            title = 'Cancelado';
            break;
        default:
            color = 'primary';
            title = 'NO HAY INFORMACION';
    }

    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <Dot color={color} />
            <Typography>{title}</Typography>
        </Stack>
    );
};

ProveedorStatus.propTypes = {
    status: PropTypes.number
};

// ==============================|| Proveedor TABLE ||============================== //

export default function ProveedorTable() {
    const [Proveedor] = useState('asc');
    const [ProveedorBy] = useState('trackingNo');
    const [selected] = useState([]);

    const isSelected = (trackingNo) => selected.indexOf(trackingNo) !== -1;

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
                    <ProveedorTableHead Proveedor={Proveedor} ProveedorBy={ProveedorBy} />
                    <TableBody>
                        {stableSort(rows, getComparator(Proveedor, ProveedorBy)).map((row, index) => {
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
                                    <TableCell align="left">{row.nombre}</TableCell>
                                    <TableCell align="right">{row.correo}</TableCell>

                                    <TableCell align="left">{row.contacto}</TableCell>

                                    <TableCell align="right">
                                        <ProveedorStatus status={row.estado} />
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
