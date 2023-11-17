import { Grid, Typography, Box, Button, Modal, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import SedesTabla from './SedesTabla';
import MainCard from 'components/MainCard';
import useSedes from 'services/sedes/sedes';
import { PlusCircleOutlined } from '@ant-design/icons';


function createData(id, nombre, ciudad, direccion, nombre_admin, contacto_admin, telefono_admin) {
    return { id, nombre, ciudad, direccion, nombre_admin, contacto_admin, telefono_admin };
}

const SedesPage = () => {
    const { getSedes } = useSedes();
    const [visibleCreate, setVisibleCreate] = useState(false);

    const createOpen = () => {
        setVisibleCreate(true);
    };
    const createClose = () => {
        setVisibleCreate(false);
    };

    const [nombreSede, setNombreSede] = useState('');
    const [ciudadSede, setCiudadSede] = useState('');
    const [direccionSede, setDireccionSede] = useState('');
    const [nombre_adminSede, setadministradorSede] = useState('');
    const [contacto_adminSede, setContactoSede] = useState('');
    const [telefono_adminSede, setTelefonoSede] = useState('');



    const [sedes, setSedes] = useState([]);

    const obtenerSedes = async () => {
        try {
            const aux = await getSedes();
            setSedes(aux);
        } catch (error) {
            console.error("Error al obtener sedes: " + error);
        }
    };

    useEffect(() => {
        obtenerSedes();
    }, []);

    const rows = sedes.map((sede) => {
        return createData(
            sede.id,
            sede.nombre,
            sede.ciudad,
            sede.direccion,
            sede.nombre_admin,
            sede.contacto_admin,
            sede.telefono_admin
        );
    });

    const crearSede = async () => {
        try {
            await createSede({
                nombre: nombreSede,
                ciudad: ciudadSede,
                direccion: direccionSede,
                nombre_admin: nombre_adminSede,
                contacto_admin: contacto_adminSede,
                telefono_admin: telefono_adminSede,
            });
            obtenerSedes();
            createClose();
            setNombreSede('');
            setCiudadSede('');
            setDireccionSede('');
            setadministradorSede('');
            setContactoSede('');
            setTelefonoSede('');
        } catch (error) {
            console.error("Error al crear sede: " + error);
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
                        <Typography variant="h5">Sedes</Typography>
                    </Grid>
                    <Grid item xs={12} md={4} lg={6}>
                        <Button size="small" variant="contained" sx={{ textTransform: 'capitalize' }} startIcon={<PlusCircleOutlined />} onClick={createOpen}>
                            Nueva Sede
                        </Button>
                        <Modal
                            open={visibleCreate}
                            onClose={createClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Añadir Sede
                                </Typography>
                                <TextField
                                    id="nombre"
                                    label="Nombre de la sede"
                                    variant="standard"
                                    fullWidth
                                    value={nombreSede}
                                    onChange={(e) => setNombreSede(e.target.value)}
                                    sx={{ mt: 2 }}
                                />
                                <TextField
                                    id="ciudad"
                                    label="Ciudad de la sede"
                                    variant="standard"
                                    fullWidth
                                    value={ciudadSede}
                                    onChange={(e) => setCiudadSede(e.target.value)}
                                    sx={{ mt: 2 }}
                                />
                                <TextField
                                    id="direccion"
                                    label="Direccion de la sede"
                                    variant="standard"
                                    fullWidth
                                    value={direccionSede}
                                    onChange={(e) => setDireccionSede(e.target.value)}
                                    sx={{ mt: 2 }}
                                />
                                <TextField
                                    id="administrador"
                                    label="Nombre del administrador de la sede"
                                    variant="standard"
                                    fullWidth
                                    value={nombre_adminSede}
                                    onChange={(e) => setadministradorSede(e.target.value)}
                                    sx={{ mt: 2 }}
                                />
                                <TextField
                                    id="contacto"
                                    label="Contacto del administrador de la sede"
                                    variant="standard"
                                    fullWidth
                                    value={contacto_adminSede}
                                    onChange={(e) => setContactoSede(e.target.value)}
                                    sx={{ mt: 2 }}
                                />
                                <TextField
                                    id="telefono"
                                    label="Telefono del administrador de la sede"
                                    variant="standard"
                                    fullWidth
                                    value={telefono_adminSede}
                                    onChange={(e) => setTelefonoSede(e.target.value)}
                                    sx={{ mt: 2 }}
                                />
                                <Button variant="contained" color="primary" onClick={crearSede} sx={{ mt: 2 }}>
                                    Crear Sede
                                </Button>
                            </Box>
                        </Modal>
                    </Grid>
                </Grid>
                <MainCard sx={{ mt: 2 }} content={false}>
                    <SedesTabla rows={rows} />
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default SedesPage;