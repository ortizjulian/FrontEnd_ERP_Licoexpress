
import PropTypes from 'prop-types';
import { useState } from 'react';

import { Box,  Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';


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
        id: 'producto',
        align: 'left',
        disablePadding: false,
        label: 'Producto'
    },
    {
        id: 'tipo',
        align: 'left',
        disablePadding: false,
        label: 'Tipo Producto'
    },
    {
        id: 'cantidad',
        align: 'left',
        disablePadding: false,
        label: 'Cantidad'
    },
    {
        id: 'proveedor', //se puede eliminar
        align: 'left',
        disablePadding: false,
        label: 'Proveedor'
    },
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
                        {stableSort(rows, getComparator(Inventario, InventarioBy)).map((row) => {
                            const isItemSelected = isSelected(row.id);
          

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
                                   
                                    <TableCell align="left">{row.producto}</TableCell>
                                    <TableCell align="left">{row.tipo}</TableCell>
                                    <TableCell align="left">{row.cantidad}</TableCell>
                                    <TableCell align="left">{row.proveedor}</TableCell>

                                   
                                
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
