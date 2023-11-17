import React from 'react';
import { Box, Table, TableBody, TableCell, TableHead, TableRow, Button, Modal, Typography} from '@mui/material';
import useSedes from 'services/sedes/sedes';
import { useState } from 'react';
const SedesTabla = ({ rows, obtenerSedes }) => {

    const [visibleDelete, setVisibleDelete] = useState(false);
    const deleteOpen = (id) => {
        setIdSede(id)
        setVisibleDelete(true)
    };
    const deleteClose = () => { setVisibleDelete(false) };


    const [idSede, setIdSede] = useState('');

    const { deleteSede } = useSedes()

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

    /*const handleDelete = (id) => {
        // Puedes implementar la lógica para eliminar una sede aquí
        console.log(`Eliminar sede con ID: ${id}`);
    };*/

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Ciudad</TableCell>
                    <TableCell>Dirección</TableCell>
                    <TableCell>Administrador</TableCell>
                    <TableCell>Contacto</TableCell>
                    <TableCell>Telefono</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((row) => (
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
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default SedesTabla;
