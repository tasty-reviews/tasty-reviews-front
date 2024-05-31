import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';

// Font Awesome 설정
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome, faMap, faStar, faMapMarkerAlt, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faHome, faMap, faStar, faMapMarkerAlt, faUser)

const app = createApp(App)

app.use(router).use(store).mount('#app'); // 스토어를 앱에 적용