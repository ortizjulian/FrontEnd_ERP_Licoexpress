// assets
import {TableOutlined,  AppstoreAddOutlined } from '@ant-design/icons';

// icons
const icons = {
    TableOutlined,
    AppstoreAddOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const inventario = {
  id: 'inventario',
  title: 'Inventario',
  type: 'group',
  children: [
    {
      id: 'util-inventario',
      title: 'Registro de ingresos',
      type: 'item',
      url: '/inventario',
      icon: icons.TableOutlined
    },
    {
      id: 'total-inventario',
      title: 'Inventarios Totalizado',
      type: 'item',
      url: '/inventario-total',
      icon: icons.AppstoreAddOutlined
    }
  ]
};
export default inventario;
