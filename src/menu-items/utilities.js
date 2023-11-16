// assets
import {
  AppstoreAddOutlined,
  AntDesignOutlined,
  BarcodeOutlined,
  BgColorsOutlined,
  FontSizeOutlined,
  LoadingOutlined,
  ShopOutlined,
  TableOutlined,
  TeamOutlined,
  IdcardOutlined
} from '@ant-design/icons';

// icons
const icons = {
  FontSizeOutlined,
  BgColorsOutlined,
  BarcodeOutlined,
  AntDesignOutlined,
  LoadingOutlined,
  AppstoreAddOutlined,
  ShopOutlined,
  TableOutlined,
  TeamOutlined,
  IdcardOutlined
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const utilities = {
  id: 'utilities',
  title: 'Utilities',
  type: 'group',
  children: [
    {
      id: 'util-productos',
      title: 'Productos',
      type: 'item',
      url: '/productos',
      icon: icons.BarcodeOutlined 
    },
    {
      id: 'util-proveedores',
      title: 'Proveedores',
      type: 'item',
      url: '/proveedores',
      icon: icons.IdcardOutlined,
      breadcrumbs: true
    },
    {
      id: 'util-sedes',
      title: 'Sedes',
      type: 'item',
      url: '/sedes',
      icon: icons.ShopOutlined, 
      breadcrumbs: true
    },
    {
      id: 'util-inventario',
      title: 'Inventario',
      type: 'item',
      url: '/inventario',
      icon: icons.TableOutlined,
      breadcrumbs: true
    },
    {
      id: 'util-usuarios',
      title: 'Usuarios',
      type: 'item',
      url: '/usuarios',
      icon: icons.TeamOutlined,
      breadcrumbs: true
    },
  ]
};

export default utilities;
