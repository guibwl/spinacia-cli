import loadable from '@loadable/component';

const Main = loadable(() => import('../containers/Main/index'));

const routes = [
  {
    path: '/',
    component: Main,
    name: 'Main'
  }
];

export default routes;
export { default as App } from '../containers/App/index';
