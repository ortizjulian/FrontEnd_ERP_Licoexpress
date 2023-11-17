import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, CardMedia, Button, TextField, Modal, Box,MenuItem, Select,InputLabel } from '@mui/material';
import useProveedores from 'services/proveedores/proveedores';
import useTipos from 'services/tipos/tipos';
import useLogin from 'services/login/login';


const ProductoBox = ({ product , onDelete, onUpdate}) => {
  const { nombre, tipo, tamaño, imagen, precio_base, precio_venta, proveedor, id } = product;


  const {isAdmin} = useLogin()
  //const { getProductos} = useProductos();

  const [isDeleting, setIsDeleting] = useState(false);

  const [isDeleteHovered, setIsDeleteHovered] = useState(false);
  const [isUpdateHovered, setIsUpdateHovered] = useState(false);
  const [isBoxHovered, setIsBoxHovered] = useState(false);

  const [visibleCreate, setVisibleCreate] = useState(false);

  const [nombreProducto, setNombreProducto] = useState(product.nombre);
  const [tipoProducto, setTipoProducto] = useState(product.tipo_id);
  const [tamañoProducto, setTamañoProducto] = useState(product.tamaño);
  const [precioVentaProducto, setPrecioVentaProducto] = useState(product.precio_venta);
  const [proveedorProducto, setProveedorProducto] = useState(product.proveedor_id);
  const [imagenProducto, setImagenProducto] = useState(product.imagen);
  const [precioBaseProducto, setPrecioBaseProducto] = useState(product.precio_base);

  const createOpen = () => {
    setVisibleCreate(true);
  };
  const createClose = () => {
    setVisibleCreate(false);
  };

  const { getTipos  } = useTipos();
  const {getProveedores} = useProveedores();

  const [tipos, setTipos] = useState([]);
  const [proveedores, setProveedores] = useState([]);



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
    obtenerTipos();
    obtenerProveedores();
  }, []);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      // No es necesario llamar a deleteProducto aquí, ya que ya se llama en ProductsPage
      onDelete(id); 
      console.log(`Producto con ID ${id} eliminado exitosamente.`);
    } catch (error) {
      console.error(`Error al eliminar producto con ID ${id}:`, error);
      window.alert(`Error al eliminar producto con ID ${id}. Por favor, inténtelo de nuevo.`);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUpdate = async () => {
    try {
      await onUpdate(id, {
        nombre: nombreProducto,
        tipo_id: parseInt(tipoProducto),
        tamaño: tamañoProducto,
        precio_base: parseFloat(precioBaseProducto),
        precio_venta: parseFloat(precioVentaProducto), // Asegúrate de incluir también precio_venta si es necesario
        proveedor_id: parseInt(proveedorProducto),
        imagen: imagenProducto,
      });
      createClose();
      setNombreProducto('');
      setTipoProducto('');
      setTamañoProducto('');
      setPrecioVentaProducto('');
      setProveedorProducto('');
      setImagenProducto('');
      setPrecioBaseProducto(''); // Limpiar también el campo de precio_base
    } catch (error) {
      console.error("Error al actualizar producto: " + error);
    }
  };

  const cardStyle = {
    border: '2px solid red',
    borderRadius: '8px',
    marginBottom: '16px',
    boxShadow: isBoxHovered ? '0px 4px 8px rgba(0, 0, 0, 0.8)' : '0px 8px 16px rgba(0, 0, 0, 0.2)',
    transition: 'box-shadow 0.3s ease',
  };

  const mediaStyle = {
    borderRadius: '6px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    height: '200px',
    objectFit: 'cover',
  };

  const deleteButtonStyle = {
    color: isDeleteHovered ? 'red' : 'white',
    backgroundColor: isDeleteHovered ? 'white' : 'red',
  };

  const updateButtonStyle = {
    border: '#2089FF',
    color: isUpdateHovered ? '#2089FF' : 'white',
    backgroundColor: isUpdateHovered ? 'white' : '#2089FF',
  };

  const formatCurrency = (amount) => {
    return amount.toLocaleString('es-ES', {
      style: 'currency',
      currency: 'COP',
    });
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
    <Card variant="outlined" 
    style={cardStyle}
    onMouseEnter={() => setIsBoxHovered(true)}
    onMouseLeave={() => setIsBoxHovered(false)}>
      <CardMedia
        component="img"
        src={imagen} 
        alt={nombre}
        style={mediaStyle}
      />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              {nombre}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body1">
              <strong>Tipo:</strong> {tipo}
            </Typography>
            <Typography variant="body1">
              <strong>Tamaño:</strong> {tamaño}
            </Typography>
            <Typography variant="body1">
              <strong>Precio Base:</strong> {formatCurrency(precio_base)}
            </Typography>
            <Typography variant="body1">
              <strong>Precio de Venta:</strong> {formatCurrency(precio_venta)}
            </Typography>
            <Typography variant="body1">
              <strong>Proveedor:</strong> {proveedor}
            </Typography>
          </Grid>
          <Grid item xs={12} container spacing={2}>
            {isAdmin() &&
            <>
                    <Grid item xs={6}>
                      <Button
                          variant="outlined"
                          sx={deleteButtonStyle}
                          fullWidth
                          onClick={handleDelete}
                          disabled={isDeleting}
                          onMouseEnter={() => setIsDeleteHovered(true)}
                          onMouseLeave={() => setIsDeleteHovered(false)}
                        >
                          {isDeleting ? 'Eliminando...' : 'Eliminar'}
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                          variant="outlined"
                          sx={updateButtonStyle}
                          fullWidth
                          onClick={createOpen}
                          disabled={isDeleting}
                          onMouseEnter={() => setIsUpdateHovered(true)}
                          onMouseLeave={() => setIsUpdateHovered(false)}
                        >
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
                            Actualizar Producto
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
                          <Button variant="contained" color="primary" onClick={handleUpdate} sx={{ mt: 2 }}>
                            Actualizar Producto
                          </Button>
                        </Box>
                      </Modal>
                    </Grid>
                    </>
          }
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ProductoBox;
