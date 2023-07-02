/**
 * page-seo controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::page-seo.page-seo', ({strapi}) => ({
  async findOne(ctx) {
    const {alias} = ctx.params;
    const entity = await strapi.db.query('api::page-seo.page-seo').findOne({
      where: {...ctx.query.filters, alias},
      populate: ['SEO', 'SEO.metaImage', '*']
    });
    return this.transformResponse(entity);
  }
}));
