export default {
  routes: [
    {
      method: 'GET',
      path: '/articles/:alias',
      handler: 'article.findOne',
      config: {
        auth: false,
      }
    }
  ]
}
