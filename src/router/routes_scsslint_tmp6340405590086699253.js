
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      {
        path: '', component: () => import('pages/Index.vue')
      },
      {
        name: 'users',
        path: 'users',
        component: () => import('components/User.vue')
      },
      {
        name: 'users.edit',
        path: 'users',
        component: () => import('components/User/UserEdit.vue')
      },
      {
        name: 'users.create',
        path: 'users',
        component: () => import('components/User/UserCreate.vue')
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
