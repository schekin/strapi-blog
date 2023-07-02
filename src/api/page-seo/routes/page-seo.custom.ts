export default {
  routes: [
    {
      method: 'GET',
      path: '/page-seos/:alias',
      handler: 'page-seo.findOne',
      config: {
        auth: false,
      }
    }
  ]
}
