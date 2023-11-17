import React, { useState, useEffect } from 'react';
import { Grid, Typography, Button, Stack, Modal, Box, TextField } from '@mui/material';
import MainCard from 'components/MainCard';
import ProveedorTable from './ProveedoresTabla';
import { PlusCircleOutlined } from '@ant-design/icons';
import useProveedores from 'services/proveedores/proveedores';

function createData(id, nombre_empresa, responsable, numero_registro, direccion_empresa, ciudad, correo, numero_contacto) {
    return { id, nombre_empresa, responsable, numero_registro, direccion_empresa, ciudad, correo, numero_contacto  };
}

const ProveedoresPage = () => {
    const {getProveedores, createProveedor} = useProveedores()
    const [visibleCreate, setVisibleCreate] = useState(false);
    const createOpen = () => { setVisibleCreate(true) };
    const createClose = () => { setVisibleCreate(false) };

    const [nombreempresaProveedor, setNombreempresaProveedor] = useState('');
    const [responsableProveedor, setResponsableProveedor] = useState('');
    const [numeroregistroProveedor, setNumeroregistroProveedor] = useState('');
    const [direccionempresaProveedor, setDireccionempresaProveedor] = useState('');
    const [ciudadProveedor, setCiudadProveedor] = useState('');
    const [correoProveedor, setCorreoProveedor] = useState('');
    const [numerocontactoProveedor, setNumerocontactoProveedor] = useState('');
    const [proveedores, setproveedores] = useState([]);

    const obtenerProveedores = async () => {
        try {
            var aux = await getProveedores();
            console.log(aux);
            setproveedores(aux);
        } catch (error) {
            console.error("Error al obtener proveedores: " + error);
        }
    };

    useEffect(() => {
        obtenerProveedores(); 
    }, []);

    const rows = proveedores.map((proveedor) => {
        return createData(proveedor.id, proveedor.nombre_empresa, proveedor.responsable, proveedor.numero_registro, proveedor.direccion_empresa, proveedor.ciudad, proveedor.correo, proveedor.numero_contacto, numerocontactoProveedor);
    });

    const crearProveedores = async () => {
        try {
            var aux = await createProveedor(nombreempresaProveedor, responsableProveedor, numeroregistroProveedor, direccionempresaProveedor, ciudadProveedor, correoProveedor, numerocontactoProveedor);
            obtenerProveedores(); 
            createClose();
            setNombreempresaProveedor('');
            setResponsableProveedor('');
            setNumeroregistroProveedor('');
            setDireccionempresaProveedor('');
            setCiudadProveedor('');
            setCorreoProveedor('');
            setNumerocontactoProveedor('');
            console.log(aux);
        } catch (error) {
            console.error("Error al crear proveedor: " + error);
        }
    };

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

    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            <Grid item xs={12} md={7} lg={12}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Informacion de los Proveedores</Typography>
                    </Grid>
                    <Grid item xs={12} md={4} lg={6}>
                        <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={2}>
                            <Button size="small" variant="contained" sx={{ textTransform: 'capitalize' }} startIcon={<PlusCircleOutlined />} onClick={createOpen}>
                                Nuevo Proveedor
                            </Button>
                            <Modal
                                open={visibleCreate}
                                onClose={createClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                        Añadir Proveedor
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
                                    <Button variant="contained" color="primary" onClick={crearProveedores} sx={{ mt: 2 }}>
                                        Crear
                                    </Button>
                                </Box>
                            </Modal>
                        </Stack>
                    </Grid>
                </Grid>
                <MainCard sx={{ mt: 2 }} content={false}>
                    <ProveedorTable rows= {rows} obtenerProveedores={obtenerProveedores}/>
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default ProveedoresPage;
