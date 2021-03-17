import { createApp } from 'vue'

import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

import { NavBar , Icon ,PullRefresh ,Cell,List,Dialog,Field,Sticky   } from 'vant';
import 'vant/lib/index.less';

import router from './router'

import store from './store'

import App from './App.vue'


const app = createApp(App)
app.use(ElementPlus)

//vant
app.use(NavBar);
app.use(PullRefresh);
app.use(Icon);
app.use(Cell);
app.use(List);
app.use(Field);
app.use(Sticky);
app.use(Dialog);

app.use(router);
app.use(store);

app.mount('#app');