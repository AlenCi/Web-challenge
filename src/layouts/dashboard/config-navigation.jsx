// src/layouts/dashboard/config-navigation.jsx
import SvgColor from 'src/components/svg-color';

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
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
    icon: icon('ic_blog'),
  },
];

export default navConfig;