import React, { useState, useEffect } from 'react';
import { Grid, Typography, Box, Button, Modal, TextField, MenuItem, Select,InputLabel } from '@mui/material';

import ProductoBox from './ProductoBox';

import { PlusCircleOutlined } from '@ant-design/icons';
import useProductos from 'services/productos/productos';
import useTipos from 'services/tipos/tipos';
import useProveedores from 'services/proveedores/proveedores';


const ProductsPage = () => {
  const { getProductos, createProducto, deleteProducto, updateProducto } = useProductos();
  const { getTipos  } = useTipos();
const {getProveedores} = useProveedores();


  const [visibleCreate, setVisibleCreate] = useState(false);
  const createOpen = () => {
    setVisibleCreate(true);
  };
  const createClose = () => {
    setVisibleCreate(false);
  };

  const [nombreProducto, setNombreProducto] = useState('');
  const [tipoProducto, setTipoProducto] = useState();
  const [tamañoProducto, setTamañoProducto] = useState('');
  const [precioVentaProducto, setPrecioVentaProducto] = useState('');
  const [proveedorProducto, setProveedorProducto] = useState('');
  const [imagenProducto, setImagenProducto] = useState('');
  const [precioBaseProducto, setPrecioBaseProducto] = useState('');


  const [productos, setProductos] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [proveedores, setProveedores] = useState([]);

  const obtenerProductos = async () => {
    try {
      const aux = await getProductos();
      setProductos(aux);
    } catch (error) {
      console.error("Error al obtener productos: " + error);
    }
  };

  const obtenerProveedores = async () => {
    try {
      const aux = await getProveedores();
      setProveedores(aux);
    } catch (error) {
      console.error("Error al obtener proveedores: " + error);
    }
  };

  const obtenerTipos = async () => {
    try {
      const aux = await getTipos();
      setTipos(aux);
    } catch (error) {
      console.error("Error al obtener tipos: " + error);
    }
  };

  useEffect(() => {
    obtenerProductos();
    obtenerTipos();
    obtenerProveedores();
  }, []);

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProducto(productId);
      // Actualiza el estado local eliminando el producto con el ID dado
      //setProductos((prevProductos) => prevProductos.filter((producto) => producto.id !== productId));
      obtenerProductos();
    } catch (error) {
      console.error(`Error al eliminar producto con ID ${productId}:`, error);
      window.alert(`Error al eliminar producto con ID ${productId}. Por favor, inténtelo de nuevo.`);
    }
  }

  const handleUpdateProduct = async (productId, productData) => {
    try {
      await updateProducto(productId,productData);
      // Actualiza el estado local eliminando el producto con el ID dado
      //setProductos((prevProductos) => prevProductos.filter((producto) => producto.id !== productId));
      obtenerProductos();
    } catch (error) {
      console.error(`Error al actualizar producto con ID ${productId}:`, error);
      window.alert(`Error al actualizar producto con ID ${productId}. Por favor, inténtelo de nuevo.`);
    }
  }
  const crearProducto = async () => {
    try {
      await createProducto({
        nombre: nombreProducto,
        tipo_id: tipoProducto,
        tamaño: tamañoProducto,
        precio_base: parseFloat(precioBaseProducto),
        precio_venta: parseFloat(precioVentaProducto), // Asegúrate de incluir también precio_venta si es necesario
        proveedor_id: proveedorProducto,
        imagen: imagenProducto,
      });
      obtenerProductos();
      createClose();
      setNombreProducto('');
      setTipoProducto('');
      setTamañoProducto('');
      setPrecioVentaProducto('');
      setProveedorProducto('');
      setImagenProducto('');
      setPrecioBaseProducto(''); // Limpiar también el campo de precio_base
    } catch (error) {
      console.error("Error al crear producto: " + error);
    }
  };
  
  const handleTipoChange = (event) => {
    setTipoProducto(event.target.value);
  };
  const handleProoveedorChange = (event) => {
    setProveedorProducto(event.target.value);
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
            <Typography variant="h5">Catálogo de Productos</Typography>
          </Grid>
          <Grid justifyContent= 'space-between'>
            <Button size="small" variant="contained" sx={{ textTransform: 'capitalize' }} startIcon={<PlusCircleOutlined />} onClick={createOpen}>
              Nuevo Producto
            </Button>
            <Modal
              open={visibleCreate}
              onClose={createClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Añadir Producto
                </Typography>
                <TextField
                  id="nombre"
                  label="Nombre del producto"
                  variant="standard"
                  fullWidth
                  value={nombreProducto}
                  onChange={(e) => setNombreProducto(e.target.value)}
                  sx={{ mt: 2 }}
                />
               
                                    
                <TextField
                  id="imagen"
                  label="URL de la imagen"
                  variant="standard"
                  fullWidth
                  value={imagenProducto}
                  onChange={(e) => setImagenProducto(e.target.value)}
                  sx={{ mt: 2 }}
                />

                <TextField
                  id="tamaño"
                  label="Tamaño"
                  variant="standard"
                  fullWidth
                  value={tamañoProducto}
                  onChange={(e) => setTamañoProducto(e.target.value)}
                  sx={{ mt: 2 }}
                />
                <TextField
                  id="precioBase"
                  label="Precio base"
                  variant="standard"
                  fullWidth
                  value={precioBaseProducto}
                  onChange={(e) => setPrecioBaseProducto(e.target.value)}
                  sx={{ mt: 2 }}
                />

                <TextField
                  id="precioVenta"
                  label="Precio de venta"
                  variant="standard"
                  fullWidth
                  value={precioVentaProducto}
                  onChange={(e) => setPrecioVentaProducto(e.target.value)}
                  sx={{ mt: 2 }}
                />
                 <InputLabel style={{marginTop: '10px'}} id="tipo-label">Seleccionar Tipo</InputLabel>
                                     <Select
                                        labelId="tipo-label"
                                        label="Seleccionar Tipo"
                                        value={tipoProducto}
                                        onChange={handleTipoChange}
                                        fullWidth
                                       
                                        >
                                        {tipos.map((opcion) => (
                                            <MenuItem key={opcion} value={opcion.id}>
                                            {opcion.descripcion}
                                            </MenuItem>
                                        ))}
                                    </Select>
                 <InputLabel style={{marginTop: '10px'}} id="proveedor-label">Seleccionar Proveedor</InputLabel>
                                     <Select
                                        labelId="proveedor-label"
                                        label="Seleccionar Proveedor"
                                        value={proveedorProducto}
                                        onChange={handleProoveedorChange}
                                        fullWidth
                                       
                                        >
                                        {proveedores.map((opcion) => (
                                            <MenuItem key={opcion} value={opcion.id}>
                                            {opcion.nombre_empresa}
                                            </MenuItem>
                                        ))}
                                    </Select>
                <Button variant="contained" color="primary" onClick={crearProducto} sx={{ mt: 2 }}>
                  Crear Producto
                </Button>
              </Box>
            </Modal>
          </Grid>
        </Grid>
        
        <Box sx={{ mt: 4 }}>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            {productos.map((producto) => (
              <Grid item key={producto.id} xs={12} sm={6} md={4} lg={3}>
                <ProductoBox product={producto} onDelete={handleDeleteProduct} onUpdate={handleUpdateProduct} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ProductsPage;
