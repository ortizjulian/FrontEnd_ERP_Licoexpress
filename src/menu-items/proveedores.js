// assets
import {

    IdcardOutlined
  } from '@ant-design/icons';
  
  // icons
  const icons = {

    IdcardOutlined
  };
  
  // ==============================|| MENU ITEMS - UTILITIES ||============================== //
  
  const proveedores = {
    id: 'proveedores',
    title: 'Proveedores',
    type: 'group',
    children: [
      
      {
        id: 'util-proveedores',
        title: 'Proveedores',
        type: 'item',
        url: '/proveedores',
        icon: icons.IdcardOutlined,
        breadcrumbs: true
      }
    ]
  };
  
  export default proveedores;
  