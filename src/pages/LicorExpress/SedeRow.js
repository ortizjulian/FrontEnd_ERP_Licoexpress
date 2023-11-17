import React, { useState } from 'react'
import useSedes from 'services/sedes/sedes';
import { Box,  TableCell, TableRow, Button, Modal, Typography, TextField } from '@mui/material';
 
const SedeRow = ({row, obtenerSedes}) => {
    const [idSede, setIdSede] = useState('');
    const [visibleCreate, setVisibleCreate] = useState(false);
    const [visibleDelete, setVisibleDelete] = useState(false);
    const {updateSede} =useSedes();

    const handleUpdateProduct = async (sedeId, sedetData) => {
        try {
          await updateSede(sedeId,sedetData);
          obtenerSedes();
        } catch (error) {
          console.error(`Error al actualizar producto con ID ${sedeId}:`, error);
          window.alert(`Error al actualizar producto con ID ${sedeId}. Por favor, inténtelo de nuevo.`);
        }
      }

    const createOpen = () => {
        setVisibleCreate(true);
    };
    const createClose = () => {
        setVisibleCreate(false);
    };

    const deleteOpen = (id) => {
        setIdSede(id)
        setVisibleDelete(true)
    };
    const deleteClose = () => { setVisibleDelete(false) };

    const eliminarSede = async () => {
        try {
            var aux = await deleteSede(idSede);
            deleteClose();
            obtenerSedes();

            console.log(aux);
        } catch (error) {
            console.error("Error al eliminar sede: " + error);
        }
    };

    const { deleteSede } = useSedes()

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

    
    const [nombreSede, setNombreSede] = useState(row.nombre);
    const [ciudadSede, setCiudadSede] = useState(row.ciudad);
    const [direccionSede, setDireccionSede] = useState(row.direccion);
    const [nombre_adminSede, setadministradorSede] = useState(row.nombre_admin);
    const [contacto_adminSede, setContactoSede] = useState(row.contacto_admin);
    const [telefono_adminSede, setTelefonoSede] = useState(row.telefono_admin);


    const handleUpdate = async () => {
        try {
            await handleUpdateProduct(row.id, {
                nombre: nombreSede,
                ciudad: ciudadSede,
                direccion: direccionSede,
                nombre_admin: nombre_adminSede,
                contacto_admin: contacto_adminSede,
                telefono_admin: telefono_adminSede,
            });
            createClose();
            setNombreSede('');
            setCiudadSede('');
            setDireccionSede('');
            setadministradorSede('');
            setContactoSede('');
            setTelefonoSede('');
        } catch (error) {
            console.error("Error al actualizar producto: " + error);
        }
    };
  return (
    <TableRow key={row.id}>
    <TableCell>{row.nombre}</TableCell>
    <TableCell>{row.ciudad}</TableCell>
    <TableCell>{row.direccion}</TableCell>
    <TableCell>{row.nombre_admin}</TableCell>
    <TableCell>{row.contacto_admin}</TableCell>
    <TableCell>{row.telefono_admin}</TableCell>
    <TableCell>
        <Button variant="outlined" color="error" onClick={() => deleteOpen(row.id)}>
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
                Eliminar Sede
            </Typography>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                ¿Seguro que deseas eliminar la sede?
            </Typography>
            <Button onClick={eliminarSede} variant="contained" color="primary" sx={{ mt: 2 }}  >
                Eliminar
            </Button>
        </Box>
    </Modal>
    <TableCell>
        <Button variant="primary" color="#2089FF" onClick={createOpen}>
            Actualizar
        </Button>
        <Modal
            open={visibleCreate}
            onClose={createClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Actializar Sede
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
                <Button variant="contained" color="primary" onClick={handleUpdate} sx={{ mt: 2 }}>
                    Actualizar Sede
                </Button>
            </Box>
        </Modal>
    </TableCell>
</TableRow>
  )
}
 
export default SedeRow