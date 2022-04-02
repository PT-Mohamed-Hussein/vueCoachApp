import { createRouter, createWebHistory } from "vue-router";
import CoachesList from "./pages/coaches/CoachesList.vue";
//import BaseSpinnerVue from "./components/UI/BaseSpinner.vue";
//import CoachRegisteration from "./pages/coaches/CoachRegisteration.vue";
//import ContactCoach from "./pages/requests/ContactCoach.vue";
//import TheRequests from "./pages/requests/TheRequests.vue";
//import NotFound from "./pages/NotFound.vue";
//import UserAuth from "./pages/auth/UserAuth.vue";
import store from "./store/index.js";

const CoachRegisteration = () =>
  import("./pages/coaches/CoachRegisteration.vue");
const ContactCoach = () => import("./pages/requests/ContactCoach.vue");
const TheRequests = () => import("./pages/requests/TheRequests.vue");
const NotFound = () => import("./pages/NotFound.vue");
const UserAuth = () => import("./pages/auth/UserAuth.vue");

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/coaches",
    },
    {
      path: "/coaches",
      name: "coaches",
      component: CoachesList,
    },
    {
      path: "/contact/:id",
      name: "contact",
      props: true,
      component: ContactCoach,
    },
    {
      path: "/register",
      name: "register",
      component: CoachRegisteration,
      meta: {
        requiresAuth: true,
        requiresNotCoach: true,
      },
    },
    {
      path: "/requests",
      name: "requests",
      component: TheRequests,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/:error(.*)",
      name: "error",
      component: NotFound,
    },
    {
      path: "/auth",
      name: "auth",
      component: UserAuth,
      meta: {
        requiresUnAuth: true,
      },
    },
  ],
});

router.beforeEach(function (to, _, next) {
  if (to.meta.requiresAuth && !store.getters.isAuth) {
    next("/auth");
  } else if (to.meta.requiresUnAuth && store.getters.isAuth) {
    next("/");
  } else {
    next();
  }
});

export default router;
