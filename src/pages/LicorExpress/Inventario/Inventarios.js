import React, { useState, useEffect } from 'react';
import { Grid, Typography, Button, Stack, Modal, Box, TextField,Autocomplete } from '@mui/material';
import MainCard from 'components/MainCard';
import { PlusCircleOutlined } from '@ant-design/icons';
import useInventario from 'services/inventario/inventario';
import useLogin from 'services/login/login';
import InventarioTable from './InventarioTable';
import InventoryFilter from './InventoryFilter';
import useProductos from 'services/productos/productos';

function createData(id,sede, producto, fecha_registro, lote,stock) {
    return { id, sede, producto,fecha_registro, lote, stock };
}


const InventariosPage = () => {
    const {state, getInventario,handleFilter,createRegistro} = useInventario()
    const {getUserInfo} = useLogin()
    const{ getProductos } = useProductos()

   
    const {data: inventario,aux: inventarioAux} = state
  
    const [visibleCreate, setVisibleCreate] = useState(false);
    const createOpen = () => { setVisibleCreate(true) };
    const createClose = () => { setVisibleCreate(false) };

    const [lote, setLote] = useState('');
    const [stock, setStock] = useState('');

    const [productos, setProductos] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const obtenerInventario = async () => {
        try {
            const userLocation = getUserInfo().sede_id
            await getInventario(userLocation);

        } catch (error) {
            console.error("Error al obtener Inventario: " + error);
        }
    };

    const obtenerProductos = async () => {
        try {
          const aux = await getProductos();
          setProductos(aux);
        } catch (error) {
          console.error("Error al obtener productos: " + error);
        }
      };

      const crearRegistro = async () => {
        try {
            const userLocation = getUserInfo().sede_id
            await createRegistro(userLocation,selectedProduct.id, "2023-06-23",lote,stock);
            obtenerInventario(); 
            createClose();
            setLote('');
            setStock('');
        } catch (error) {
            console.error("Error al crear Registro: " + error);
        }
    };

    useEffect(() => {
        obtenerInventario(); 
        obtenerProductos();
    }, []);

    const rows = inventario.map((registro) => {
        return createData(registro.id,registro.sede,registro.producto,registro.fecha_registro,registro.lote,registro.stock);
    });

   
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
                <Grid container  style={{marginBottom: '10px'}} alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Registro de inventario</Typography>
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
                                        Añadir Ingreso
                                    </Typography>
                                    <Autocomplete
                                        options={productos}
                                        getOptionLabel={(option) => option.nombre} // Propiedad del objeto que se mostrará en el select
                                        value={selectedProduct}
                                        onChange={(event, newValue) => setSelectedProduct(newValue)}
                                        renderInput={(params) => (
                                            <TextField {...params} label="Seleccionar producto" variant="standard" />
                                        )}
                                        />
                                    <TextField
                                        id="lote"
                                        label="Lote"
                                        type="number"
                                        variant="standard"
                                        fullWidth
                                        value={lote}
                                        onChange={(e) => setLote(e.target.value)}
                                        sx={{ mt: 2 }}
                                    />
                                     <TextField
                                        id="stock"
                                        label="Cantidad"
                                        variant="standard"
                                        type="number" 
                                        fullWidth
                                        value={stock}
                                        onChange={(e) => setStock(e.target.value)}
                                        sx={{ mt: 2 }}
                                    />
                               

                                    <Button variant="contained" color="primary" onClick={crearRegistro} sx={{ mt: 2 }}>
                                        Crear
                                    </Button>
                                </Box>
                            </Modal>
                        </Stack>
                    </Grid>
                </Grid>
                <InventoryFilter data={inventarioAux} onFilter={handleFilter} />
                <MainCard sx={{ mt: 2 }} content={false}>
                    <InventarioTable rows= {rows} getInventario={obtenerInventario} />
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default InventariosPage;
