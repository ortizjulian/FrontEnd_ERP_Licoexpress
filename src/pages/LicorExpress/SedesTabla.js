import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';

const SedesTabla = ({ rows }) => {
  const handleDelete = (id) => {
    // Puedes implementar la lógica para eliminar una sede aquí
    console.log(`Eliminar sede con ID: ${id}`);
  };

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

export default SedesTabla;
