import Switch from './component/Switch/switch.vue';
import './component/Switch/switch.scss';


Switch.install = function install(Vue) {
  Vue.component(Switch.name, Switch);
};

export default Switch;
