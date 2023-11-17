import React, { useState, useEffect } from 'react';
import { Grid, Typography, Button, Stack, Modal, Box, TextField } from '@mui/material';
import MainCard from 'components/MainCard';
import { PlusCircleOutlined } from '@ant-design/icons';
import useUsers from 'services/users/users';
import UserTable from './UsersTable';
import useSedes from 'services/sedes/sedes';
import { roles } from './roles-data';
import { MenuItem, Select } from '../../../../node_modules/@mui/material/index';

function createData(id, correo, contrasena,rol,sede) {
    return { id, correo, contrasena, rol, sede };
}


const UsersPage = () => {
    const {getUsers, createUser} = useUsers()
    const {getSedes} = useSedes()

   
    
  
    const [visibleCreate, setVisibleCreate] = useState(false);
    const createOpen = () => { setVisibleCreate(true) };
    const createClose = () => { setVisibleCreate(false) };

    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [selectedSede, setSelectedSede] = useState('');
    const [rol, setRol] = useState('');

    const [users, setUsers] = useState([]);
    const [sedes, setSedes] = useState([]);
    const obtenerUsuarios = async () => {
        try {
            var aux = await getUsers();

            setUsers(aux);
        } catch (error) {
            console.error("Error al obtener usuarios: " + error);
        }
    };

    const obtenerSedes = async () => {
        try {
            var aux = await getSedes();

            setSedes(aux);
        } catch (error) {
            console.error("Error al obtener Sedes: " + error);
        }
    };

    const handleSelectChange = (event) => {
        setSelectedSede(event.target.value);
      };

      const handleRolChange = (event) => {
        setRol(event.target.value);
      };

    useEffect(() => {
        obtenerUsuarios(); 
        obtenerSedes();
    }, []);

    const rows = users.map((user) => {
        return createData(user.id, user.correo, user.contrasena, user.rol,user.sede);
    });

    const crearUsuario = async () => {
        try {
            await createUser(correo,contrasena, rol,selectedSede);
            obtenerUsuarios(); 
            createClose();
            setCorreo('');
            setContrasena('');
            selectedSede(null);
            setRol(null);
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
                                        onChange={(e) => setCorreo(e.target.value)}
                                        sx={{ mt: 2 }}
                                    />
                                     <TextField
                                        id="contrasena"
                                        label="Contrasena"
                                        variant="standard"
                                        fullWidth
                                        value={contrasena}
                                        onChange={(e) => setContrasena(e.target.value)}
                                        sx={{ mt: 2 }}
                                    />
                                     <Select
                                        label="Seleccionar Rol"
                                        value={rol}
                                        onChange={handleRolChange}
                                        fullWidth
                                        sx={{ mt: 2 }}
                                        >
                                        {roles.map((opcion) => (
                                            <MenuItem key={opcion} value={opcion}>
                                            {opcion}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <Select
                                        label="Seleccionar Sede"
                                        value={selectedSede}
                                        onChange={handleSelectChange}
                                        fullWidth
                                        sx={{ mt: 2 }}
                                        >
                                        {sedes.map((opcion) => (
                                            <MenuItem key={opcion.id} value={opcion.id}>
                                            {opcion.nombre}
                                            </MenuItem>
                                        ))}
                                    </Select>

                                    <Button variant="contained" color="primary" onClick={crearUsuario} sx={{ mt: 2 }}>
                                        Crear
                                    </Button>
                                </Box>
                            </Modal>
                        </Stack>
                    </Grid>
                </Grid>
                <MainCard sx={{ mt: 2 }} content={false}>
                    <UserTable rows= {rows} getUsers={obtenerUsuarios} />
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default UsersPage;
