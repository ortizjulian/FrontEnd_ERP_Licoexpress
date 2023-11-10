// assets
import {
  AppstoreAddOutlined,
  AntDesignOutlined,
  BarcodeOutlined,
  BgColorsOutlined,
  FontSizeOutlined,
  LoadingOutlined,
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
      icon: icons.BarcodeOutlined //cambiar icono
    },
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

export default utilities;
