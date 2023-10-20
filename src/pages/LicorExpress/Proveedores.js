import React, { useState } from 'react';
import { Grid, Typography, Button, Stack, Modal, Box, TextField } from '@mui/material';
import MainCard from 'components/MainCard';
import ProveedorTable from './ProveedoresTabla';
import { PlusCircleOutlined, MinusCircleOutlined, RedoOutlined } from '@ant-design/icons';



const ProveedoresPage = () => {

    const [visibleCreate, setVisibleCreate] = useState(false);
    const createOpen = () => { setVisibleCreate(true) };
    const createClose = () => { setVisibleCreate(false) };

    const [visibleDelete, setVisibleDelete] = useState(false);
    const deleteOpen = () => { setVisibleDelete(true) };
    const deleteClose = () => { setVisibleDelete(false) };

    const [visibleUpdate, setVisibleUpdate] = useState(false);
    const updateOpen = () => { setVisibleUpdate(true) };
    const updateClose = () => { setVisibleUpdate(false) };

    const [nombreProveedor, setNombreProveedor] = useState('');
    const [correoProveedor, setCorreoProveedor] = useState('');
    const [numeroContacto, setNumeroContacto] = useState('');

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
                                Nuevo
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
                                        label="Nombre del proveedor"
                                        variant="standard"
                                        fullWidth
                                        value={nombreProveedor}
                                        onChange={(e) => setNombreProveedor(e.target.value)}
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
                                        value={numeroContacto}
                                        onChange={(e) => setNumeroContacto(e.target.value)}
                                        sx={{ mt: 2 }}
                                    />
                                    <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                                        Crear
                                    </Button>
                                </Box>
                            </Modal>
                            
                            <Button size="small" variant="contained" sx={{ textTransform: 'capitalize' }} startIcon={<RedoOutlined />} onClick={updateOpen}>
                                Actualizar
                            </Button>
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
                                        label="Nombre del proveedor"
                                        variant="standard"
                                        fullWidth
                                        value={nombreProveedor}
                                        onChange={(e) => setNombreProveedor(e.target.value)}
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
                                        value={numeroContacto}
                                        onChange={(e) => setNumeroContacto(e.target.value)}
                                        sx={{ mt: 2 }}
                                    />
                                    <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                                        Actualizar
                                    </Button>
                                </Box>
                            </Modal>
                            <Button size="small" variant="contained" sx={{ textTransform: 'capitalize' }} startIcon={<MinusCircleOutlined />} onClick={deleteOpen}>
                                Eliminar
                            </Button>
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
                                    <TextField
                                        id="nombre"
                                        label="Nombre del proveedor"
                                        variant="standard"
                                        fullWidth
                                        value={nombreProveedor}
                                        onChange={(e) => setNombreProveedor(e.target.value)}
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
                                        value={numeroContacto}
                                        onChange={(e) => setNumeroContacto(e.target.value)}
                                        sx={{ mt: 2 }}
                                    />
                                    <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                                        Eliminar
                                    </Button>
                                </Box>
                            </Modal>
                        </Stack>
                    </Grid>
                </Grid>
                <MainCard sx={{ mt: 2 }} content={false}>
                    <ProveedorTable />
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default ProveedoresPage;
