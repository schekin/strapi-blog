export default {
  routes: [
    {
      method: 'GET',
      path: '/authors/:alias',
      handler: 'author.findOne',
      config: {
        auth: false,
      }
    }
  ]
}
