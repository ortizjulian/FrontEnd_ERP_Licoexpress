
import PropTypes from 'prop-types';
import { useState } from 'react';
import useProveedores from 'services/proveedores/proveedores';

import { MinusCircleOutlined, RedoOutlined } from '@ant-design/icons';

// material-ui
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Modal, Typography, TextField } from '@mui/material';
import useLogin from 'services/login/login';

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
        id: 'nombre_empresa',
        align: 'left',
        disablePadding: true,
        label: 'Nombre de la Empresa'
    },
    {
        id: 'responsable',
        align: 'right',
        disablePadding: false,
        label: 'Responsable'
    },
    {
        id: 'numero registro',
        align: 'right',
        disablePadding: false,
        label: 'Numero de Registro'
    },
    {
        id: 'direccion',
        align: 'right',
        disablePadding: false,
        label: 'Direccion'
    },
    {
        id: 'ciudad',
        align: 'right',
        disablePadding: false,
        label: 'Ciudad'
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

// ==============================|| Proveedor TABLE ||============================== //

export default function ProveedorTable({ rows, obtenerProveedores }) {
    const [Proveedor] = useState('asc');
    const [ProveedorBy] = useState('trackingNo');
    const [selected] = useState([]);
    //const [idProveedor, setIdProveedor] = useState('');

    const [visibleDelete, setVisibleDelete] = useState(false);
    const deleteOpen = (id) => {
        setIdProveedor(id)
        setVisibleDelete(true)
    };
    const deleteClose = () => { setVisibleDelete(false) };

    const [visibleUpdate, setVisibleUpdate] = useState(false);
    const updateOpen = (row) => {
        setIdProveedor(row.id)
        setVisibleUpdate(true);

        // Asignar los valores actuales del proveedor a los estados respectivos
        setNombreempresaProveedor(row.nombre_empresa);
        setResponsableProveedor(row.responsable);
        setNumeroregistroProveedor(row.numero_registro);
        setDireccionempresaProveedor(row.direccion_empresa);
        setCiudadProveedor(row.ciudad);
        setCorreoProveedor(row.correo);
        setNumerocontactoProveedor(row.numero_contacto);
    };
    const updateClose = () => { setVisibleUpdate(false) };

    const isSelected = (trackingNo) => selected.indexOf(trackingNo) !== -1;

    const { isAdmin } = useLogin()

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

    const [idProveedor, setIdProveedor] = useState('');

    const { deleteProveedor } = useProveedores()

    const eliminarProveedores = async () => {
        try {
            var aux = await deleteProveedor(idProveedor);
            obtenerProveedores();
            deleteClose();
            console.log(aux);
        } catch (error) {
            console.error("Error al eliminar proveedor: " + error);
        }
    };

    const { updateProveedor } = useProveedores();

    const handleUpdateProveedor = async (proveedorId, proveedortData) => {
        try {
            await updateProveedor(idProveedor, proveedortData);
            obtenerProveedores();
        } catch (error) {
            console.error(`Error al actualizar proveedor con ID ${proveedorId}:`, error);
            window.alert(`Error al actualizar proveedor con ID ${proveedorId}. Por favor, inténtelo de nuevo.`);
        }
    }

    const [nombreempresaProveedor, setNombreempresaProveedor] = useState(rows.nombre_empresa);
    const [responsableProveedor, setResponsableProveedor] = useState(rows.responsable);
    const [numeroregistroProveedor, setNumeroregistroProveedor] = useState(rows.numero_registro);
    const [direccionempresaProveedor, setDireccionempresaProveedor] = useState(rows.direccion_empresa);
    const [ciudadProveedor, setCiudadProveedor] = useState(rows.ciudad);
    const [correoProveedor, setCorreoProveedor] = useState(rows.correo);
    const [numerocontactoProveedor, setNumerocontactoProveedor] = useState(rows.numero_contacto);



    const handleUpdate = async () => {
        try {
            console.log("esteeeeeeeeeee " + idProveedor)
            await handleUpdateProveedor(idProveedor, {
                nombre_empresa: nombreempresaProveedor,
                responsable: responsableProveedor,
                numero_registro: numeroregistroProveedor,
                direccion_empresa: direccionempresaProveedor,
                ciudad: ciudadProveedor,
                correo: correoProveedor,
                numero_contacto: numerocontactoProveedor,
            });
            updateClose();
            setNombreempresaProveedor('');
            setResponsableProveedor('');
            setNumeroregistroProveedor('');
            setDireccionempresaProveedor('');
            setCiudadProveedor('');
            setCorreoProveedor('');
            setNumerocontactoProveedor('');
        } catch (error) {
            console.error("Error al actualizar producto: " + error);
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
                    <ProveedorTableHead Proveedor={Proveedor} ProveedorBy={ProveedorBy} />
                    <TableBody>
                        {stableSort(rows, getComparator(Proveedor, ProveedorBy)).map((row) => {
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
                                    <TableCell align="left">{row.nombre_empresa}</TableCell>
                                    <TableCell align="right">{row.responsable}</TableCell>
                                    <TableCell align="right">{row.numero_registro}</TableCell>
                                    <TableCell align="right">{row.direccion_empresa}</TableCell>
                                    <TableCell align="right">{row.ciudad}</TableCell>
                                    <TableCell align="right">{row.correo}</TableCell>
                                    <TableCell align="left">{row.numero_contacto}</TableCell>
                                    {isAdmin() &&
                                        <TableCell align="right">
                                            <Button size="small" variant="contained" sx={{ textTransform: 'capitalize' }} startIcon={<MinusCircleOutlined />} onClick={() => deleteOpen(row.id)}>
                                                Eliminar
                                            </Button>
                                        </TableCell>
                                    }
                                    <Modal
                                        open={visibleDelete}
                                        onClose={deleteClose}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                    >
                                        <Box sx={style}>
                                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                                Eliminar Proveedor
                                            </Typography>
                                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                                ¿Seguro que deseas eliminar el proveedor?
                                            </Typography>
                                            <Button onClick={eliminarProveedores} variant="contained" color="primary" sx={{ mt: 2 }}  >
                                                Eliminar
                                            </Button>
                                        </Box>
                                    </Modal>
                                    {isAdmin() &&
                                        <TableCell align="right">
                                            <Button size="small" variant="contained" sx={{ textTransform: 'capitalize' }} startIcon={<RedoOutlined />} onClick={() => updateOpen(row)}>
                                                Actualizar
                                            </Button>
                                        </TableCell>
                                    }
                                    <Modal
                                        open={visibleUpdate}
                                        onClose={updateClose}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                    >
                                        <Box sx={style}>
                                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                                Actualizar Informacion de un Proveedor
                                            </Typography>
                                            <TextField
                                                id="nombre"
                                                label="Nombre de la empresa"
                                                variant="standard"
                                                fullWidth
                                                value={nombreempresaProveedor}
                                                onChange={(e) => setNombreempresaProveedor(e.target.value)}
                                                sx={{ mt: 2 }}
                                            />
                                            <TextField
                                                id="responsable"
                                                label="nombre del responsable"
                                                variant="standard"
                                                fullWidth
                                                value={responsableProveedor}
                                                onChange={(e) => setResponsableProveedor(e.target.value)}
                                                sx={{ mt: 2 }}
                                            />
                                            <TextField
                                                id="numero registro"
                                                label="Numero de Registro"
                                                variant="standard"
                                                fullWidth
                                                value={numeroregistroProveedor}
                                                onChange={(e) => setNumeroregistroProveedor(e.target.value)}
                                                sx={{ mt: 2 }}
                                            />
                                            <TextField
                                                id="direccion"
                                                label="Direccion de la empresa"
                                                variant="standard"
                                                fullWidth
                                                value={direccionempresaProveedor}
                                                onChange={(e) => setDireccionempresaProveedor(e.target.value)}
                                                sx={{ mt: 2 }}
                                            />
                                            <TextField
                                                id="ciudad"
                                                label="Ciudad"
                                                variant="standard"
                                                fullWidth
                                                value={ciudadProveedor}
                                                onChange={(e) => setCiudadProveedor(e.target.value)}
                                                sx={{ mt: 2 }}
                                            />
                                            <TextField
                                                id="correo"
                                                label="Correo electrónico"
                                                variant="standard"
                                                fullWidth
                                                value={correoProveedor}
                                                onChange={(e) => setCorreoProveedor(e.target.value)}
                                                sx={{ mt: 2 }}
                                            />
                                            <TextField
                                                id="numero"
                                                label="Número de contacto"
                                                variant="standard"
                                                fullWidth
                                                value={numerocontactoProveedor}
                                                onChange={(e) => setNumerocontactoProveedor(e.target.value)}
                                                sx={{ mt: 2 }}
                                            />
                                            <Button variant="contained" color="primary" onClick={handleUpdate} sx={{ mt: 2 }}>
                                                Actualizar
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
