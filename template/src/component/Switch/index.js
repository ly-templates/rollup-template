import Switch from './component/switch.vue';
import './component/switch.scss';


Switch.install = function install(Vue) {
  Vue.component(Switch.name, Switch);
};

export default Switch;
