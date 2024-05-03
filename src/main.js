import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';

const app = createApp(App)

app.use(router).use(store).mount('#app'); // 스토어를 앱에 적용