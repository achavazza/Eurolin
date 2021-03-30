 const routes = [
    { name: "main" , path: "/", component: Dashboard },
    { name: "units", path: "/Units", component: Units },
];
const router = VueRouter.createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: VueRouter.createWebHashHistory(),
  //linkExactActiveClass: 'is-active',
  routes, // short for `routes: routes`
});