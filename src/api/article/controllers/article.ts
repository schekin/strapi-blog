/**
 * article controller
 */

import {factories} from '@strapi/strapi'

export default factories.createCoreController('api::article.article', ({strapi}) => ({
  async findOne(ctx) {
    const {alias} = ctx.params;
    const entity = await strapi.db.query('api::article.article').findOne({
      where: {...ctx.query.filters, alias},
      populate: ['article', 'article.preview_image', 'article.category', 'SEO', 'SEO.metaImage', 'preview_image','author', 'author.avatar', 'category', '*']
    });

    return this.transformResponse(entity);
  }
}));
