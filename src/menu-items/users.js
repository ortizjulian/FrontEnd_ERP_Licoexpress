// assets
import { UserAddOutlined} from '@ant-design/icons';

// icons
const icons = {
    UserAddOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const users = {
  id: 'users',
  title: 'Usuarios',
  type: 'group',
  children: [
    {
      id: 'administrar-usuarios',
      title: 'Administrar Usuarios',
      type: 'item',
      url: '/administrar-usuarios',
      icon: icons.UserAddOutlined
    }
  ]
};

export default users;
