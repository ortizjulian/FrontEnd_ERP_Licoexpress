import React from 'react';
import { Grid, Typography, Button, Stack } from '@mui/material';
import MainCard from 'components/MainCard';
import ProveedorTable from './ProveedoresTabla';

const ProveedoresPage = () => {
    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            <Grid item xs={12} md={7} lg={12}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Informacion de los Proveedores</Typography>
                    </Grid>
                    <Grid item xs={12} md={4} lg={3}>
                        <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={2}>
                            <Button size="small" variant="contained" sx={{ textTransform: 'capitalize' }}>
                                Nuevo
                            </Button>
                            <Button size="small" variant="contained" sx={{ textTransform: 'capitalize' }}>
                                Actualizar
                            </Button>
                            <Button size="small" variant="contained" sx={{ textTransform: 'capitalize' }}>
                                Eliminar
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
                <MainCard sx={{ mt: 2 }} content={false}>
                    <ProveedorTable />
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default ProveedoresPage;
