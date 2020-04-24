{{#if_eq vue  true}}
import Switch from './component/Switch/switch.vue';
{{#if_eq css 'scss'}}
import './component/Switch/switch.scss';
{{/if_eq}}
{{#if_eq css 'less'}}
import './component/Switch/switch.less';
{{/if_eq}}


Switch.install = function install(Vue) {
  Vue.component(Switch.name, Switch);
};

export default Switch;
{{/if_eq}}
{{#if_eq vue false}}
console.log("hello world");
{{/if_eq}}