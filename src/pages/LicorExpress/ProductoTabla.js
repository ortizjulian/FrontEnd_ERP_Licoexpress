import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';

const ProductoTabla = ({ rows }) => {
  const handleDelete = (id) => {
    // Puedes implementar la lógica para eliminar un producto aquí
    console.log(`Eliminar producto con ID: ${id}`);
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Nombre</TableCell>
          <TableCell>Tipo</TableCell>
          <TableCell>Tamaño</TableCell>
          <TableCell>Precio de Venta</TableCell>
          <TableCell>Proveedor</TableCell>
          <TableCell>Acciones</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.nombre}</TableCell>
            <TableCell>{row.tipo}</TableCell>
            <TableCell>{row.tamaño}</TableCell>
            <TableCell>{row.precioVenta}</TableCell>
            <TableCell>{row.proveedor}</TableCell>
            <TableCell>
              <Button variant="outlined" color="error" onClick={() => handleDelete(row.id)}>
                Eliminar
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductoTabla;
