/**
 * author controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::author.author', ({strapi}) => ({
  async findOne(ctx) {
    const {alias} = ctx.params;
    const entity = await strapi.db.query('api::author.author').findOne({
      where: {...ctx.query.filters, alias},
      populate: ['SEO', 'SEO.metaImage', 'avatar', '*']
    });
    return this.transformResponse(entity);
  }
}));
