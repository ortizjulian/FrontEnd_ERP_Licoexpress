// assets
import {

    BarcodeOutlined
  } from '@ant-design/icons';
  
  // icons
  const icons = {

    BarcodeOutlined
  };
  
  // ==============================|| MENU ITEMS - UTILITIES ||============================== //
  
  const products = {
    id: 'produts',
    title: 'Productos',
    type: 'group',
    children: [
      {
        id: 'util-productos',
        title: 'Productos',
        type: 'item',
        url: '/productos',
        icon: icons.BarcodeOutlined 
      }
    ]
  };
  
  export default products;
  