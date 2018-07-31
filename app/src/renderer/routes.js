import Vue from 'vue';

export default () => {
  return [
    {
      path: '/',
      component: require('containers').default
    }
  ];
};
