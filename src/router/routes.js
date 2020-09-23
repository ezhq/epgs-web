const routes = [
  {
    path: "/",
    component: () => import("layouts/Main.vue"),
    redirect: { name: 'Home' },
    children: [
      {
        path: "home",
        name: 'Home',
        // redirect: { name: 'login' },
        component: () => import("pages/Home.vue")
      },
    ]
  },

  {
    path: "/project",
    component: () => import("layouts/Main.vue"),
    children: [
      {
        path: "hallofhero",
        name: 'HallOfHero',
        // redirect: { name: 'login' },
        component: () => import("pages/project/HallOfHero/index")
      },
      {
        path: "booktransplan",
        name: 'BookTransPlan',
        // redirect: { name: 'login' },
        component: () => import("pages/project/BookTransPlan/index")
      },
    ]
  },

  {
    path: '/login',
    component: () => import('layouts/Login.vue'),
    children: [
      {
        path: "main",
        name: 'login',
        component: () => import("pages/Login.vue")
      },
    ]
  },

  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
