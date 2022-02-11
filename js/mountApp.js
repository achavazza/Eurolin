// 5. Create and mount the root instance.
//const app = Vue.createApp({})
//import VueCookies from "./vue-cookies"
const app = Vue.createApp({})
// Make sure to _use_ the router instance to make the
// whole app router-aware.
app.use(router)
//app.use(VueCookies)
//app.use(VueCookies);

app.mount("#app")
