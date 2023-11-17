import React, { useEffect } from 'react';
import { Grid} from '@mui/material';
import MainCard from 'components/MainCard';

import useInventario from 'services/inventario/inventario';
import useLogin from 'services/login/login';
import InventarioTable from './InventarioTable';
import InventoryFilter from './InventoryFilter';


function createData(producto,tipo, cantidad,proveedor) {
    return { producto,tipo,cantidad,proveedor };
}


const InventarioTotalizadoPage = () => {
    const {state, getInventarioTotales,handleFilter} = useInventario()
    const {getUserInfo} = useLogin()

   
    const {data: inventario,aux: inventarioAux} = state
  


    const obtenerInventario = async () => {
        try {
            const userLocation = getUserInfo().sede_id
            await getInventarioTotales(userLocation);

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


    useEffect(() => {
        obtenerInventario(); 
        obtenerProductos();
    }, []);

    const rows = inventario.map((registro) => {
        return createData(registro.producto, registro.tipo,registro.cantidad,registro.proveedor);
    });

    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            <Grid item xs={12} md={7} lg={12}>
                <InventoryFilter data={inventarioAux} onFilter={handleFilter} />
                <MainCard sx={{ mt: 2 }} content={false}>
                    <InventarioTable rows= {rows} getInventario={obtenerInventario} />
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default InventarioTotalizadoPage;
