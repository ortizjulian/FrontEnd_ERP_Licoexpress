import React from 'react';
import { Card, CardContent, Typography, Grid, CardMedia, Button } from '@mui/material';

const ProductoBox = ({ product }) => {
  const { nombre, tipo, tamaño, imagen, precio_base, precio_venta, proveedor, id } = product;

  const cardStyle = {
    border: '2px solid red',
    borderRadius: '8px',
    marginBottom: '16px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.8)',
  };

  const mediaStyle = {
    borderRadius: '6px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    height: '200px',
    objectFit: 'cover',
  };

  const formatCurrency = (amount) => {
    return amount.toLocaleString('es-ES', {
      style: 'currency',
      currency: 'COP',
    });
  };

  return (
    <Card variant="outlined" style={cardStyle}>
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
          <Grid item xs={12}>
            <Button variant="outlined" color="error" fullWidth onClick={() => handleDelete(id)}>
              Eliminar
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ProductoBox;
