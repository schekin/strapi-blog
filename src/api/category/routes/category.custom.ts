export default {
  routes: [
    {
      method: 'GET',
      path: '/categories/:alias',
      handler: 'category.findOne',
      config: {
        auth: false,
      }
    },
    {
      method: 'GET',
      path: '/categories/find/active',
      handler: 'category.findActive',
      config: {
        auth: false,
      }
    },
  ]
}
