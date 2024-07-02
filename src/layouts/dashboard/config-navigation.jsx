// src/layouts/dashboard/config-navigation.jsx
import SvgColor from 'src/components/svg-color';

const icon = (name) => (
  <SvgColor src={`assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'index',
    path: '/',

  },
  {
    title: 'user',
    path: '/user',
    icon: icon('ic_user'),
  },
  {
    title: 'products',
    path: '/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'charts',
    path: '/charts',
    icon: icon('ic_analytics'),
  },
];

export default navConfig;