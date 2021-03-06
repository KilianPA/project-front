
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      {
        name: 'index',
        path: '',
        component: () => import('components/Home.vue')
      },
      {
        name: 'users.edit',
        path: 'users/edit',
        component: () => import('components/User/UserEdit.vue')
      },
      {
        name: 'users.create',
        path: 'users/create',
        component: () => import('components/User/UserCreate.vue')
      },
      {
        name: 'users.created',
        path: 'users/created',
        component: () => import('components/User/UserCreated.vue')
      },
      {
        name: 'users.login',
        path: 'users/login',
        component: () => import('components/User/UserLogin.vue')
      },
      {
        name: 'app.home',
        path: 'app/home',
        component: () => import('components/App/Home.vue')
      },
      {
        name: 'app.chat',
        path: 'app/chat',
        component: () => import('components/App/Chat.vue')
      },
      {
        name: 'app.match',
        path: 'app/match',
        component: () => import('components/App/Match.vue')
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
