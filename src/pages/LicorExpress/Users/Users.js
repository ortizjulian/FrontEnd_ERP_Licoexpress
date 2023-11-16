import React, { useState, useEffect } from 'react';
import { Grid, Typography, Button, Stack, Modal, Box, TextField } from '@mui/material';
import MainCard from 'components/MainCard';
import { PlusCircleOutlined } from '@ant-design/icons';
import useUsers from 'services/users/users';
import UserTable from './UsersTable';

function createData(id, correo, contrasena,rol,sede) {
    return { id, correo, contrasena, rol, sede };
}


const UsersPage = () => {
    const {getUsers, createUser} = useUsers()
    const [visibleCreate, setVisibleCreate] = useState(false);
    const createOpen = () => { setVisibleCreate(true) };
    const createClose = () => { setVisibleCreate(false) };

    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [sede, setSede] = useState('');
    const [rol, setRol] = useState('');

    const [users, setUsers] = useState([]);

    const obtenerUsuarios = async () => {
        try {
            var aux = await getUsers();

            setUsers(aux);
        } catch (error) {
            console.error("Error al obtener usuarios: " + error);
        }
    };

    useEffect(() => {
        obtenerUsuarios(); 
    }, []);

    const rows = users.map((user) => {
        return createData(user.id, user.correo, user.contrasena, user.rol,user.sede);
    });

    const crearUsuario = async () => {
        try {
            await createUser(correo,contrasena, rol,sede);
            obtenerUsuarios(); 
            createClose();
            setCorreo('');
            setContrasena('');
            setSede('');
            setRol('');
        } catch (error) {
            console.error("Error al crear Usuario: " + error);
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
                        <Typography variant="h5">Informacion de los Usuarios</Typography>
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
                                        Añadir Usuario
                                    </Typography>
                                    <TextField
                                        id="correo"
                                        label="Correo del usuario"
                                        variant="standard"
                                        fullWidth
                                        value={correo}
                                        onChange={(e) => setNombreProveedor(e.target.value)}
                                        sx={{ mt: 2 }}
                                    />
                                 
                                   
                                    <Button variant="contained" color="primary" onClick={crearUsuario} sx={{ mt: 2 }}>
                                        Crear
                                    </Button>
                                </Box>
                            </Modal>
                        </Stack>
                    </Grid>
                </Grid>
                <MainCard sx={{ mt: 2 }} content={false}>
                    <UserTable rows= {rows} obtenerProveedores={getUsers}/>
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default UsersPage;
