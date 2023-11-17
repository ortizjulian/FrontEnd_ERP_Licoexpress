import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import SedeRow from './SedeRow';

const SedesTabla = ({ rows, obtenerSedes }) => {


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
                    <SedeRow key={row.id} obtenerSedes={obtenerSedes} row={row}/>
                ))}
            </TableBody>
        </Table>
    );
};

export default SedesTabla;
