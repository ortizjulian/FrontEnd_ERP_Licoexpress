
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';


function descendingComparator(a, b, InventarioBy) {
    if (b[InventarioBy] < a[InventarioBy]) {
        return -1;
    }
    if (b[InventarioBy] > a[InventarioBy]) {
        return 1;
    }
    return 0;
}

function getComparator(Inventario, InventarioBy) {
    return Inventario === 'desc' ? (a, b) => descendingComparator(a, b, InventarioBy) : (a, b) => -descendingComparator(a, b, InventarioBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const Inventario = comparator(a[0], b[0]);
        if (Inventario !== 0) {
            return Inventario;
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
        id: 'producto',
        align: 'left',
        disablePadding: false,
        label: 'Producto'
    },
    {
        id: 'lote',
        align: 'left',
        disablePadding: false,
        label: 'Lote'
        
    },
    {
        id: 'stock',
        align: 'left',
        disablePadding: false,
        label: 'Cantidad Ingreso'
        
    },
    {
        id: 'fecha_registro',
        align: 'left',
        disablePadding: false,
        label: 'Fecha Registro'
    }
];

// ==============================|| Proveedor TABLE - HEADER ||============================== //

function InventarioTableHead({ Inventario, InventarioBy }) {
    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.align}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={InventarioBy === headCell.id ? Inventario : false}
                    >
                        {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

InventarioTableHead.propTypes = {
    Inventario: PropTypes.string,
    InventarioBy: PropTypes.string
};

// ==============================|| Proveedor TABLE ||============================== //

export default function InventarioTable({ rows }) {
    const [Inventario] = useState('asc');
    const [InventarioBy] = useState('trackingNo');
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
                    <InventarioTableHead Inventario={Inventario} InventarioBy={InventarioBy} />
                    <TableBody>
                        {stableSort(rows, getComparator(Inventario, InventarioBy)).map((row, index) => {
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
                                    <TableCell align="left">{row.producto}</TableCell>
                                    <TableCell align="left">{row.lote}</TableCell>
                                    <TableCell align="left">{row.stock}</TableCell>
                                    <TableCell align="left">{row.fecha_registro}</TableCell>

                                   
                                
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
