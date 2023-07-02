export default [
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': [
            "'self'",
            'data:',
            'blob:',
            'dl.airtable.com',
            'test-blog-content.amazonaws.com',
            'prod-blog-content.amazonaws.com',
            'test-blog-content.s3.amazonaws.com',
            'prod-blog-content.s3.amazonaws.com',
            'test-blog-content.s3.eu-central-1.amazonaws.com',
            'prod-blog-content.s3.eu-central-1.amazonaws.com',
            's-test.allright.com',
            's.allright.com'
          ],
          'media-src': [
            "'self'",
            'data:',
            'blob:',
            'dl.airtable.com',
            'test-blog-content.amazonaws.com',
            'prod-blog-content.amazonaws.com',
            'test-blog-content.s3.amazonaws.com',
            'prod-blog-content.s3.amazonaws.com',
            'test-blog-content.s3.eu-central-1.amazonaws.com',
            'prod-blog-content.s3.eu-central-1.amazonaws.com'
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  'strapi::errors',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
