/**
 * category controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::category.category",
  ({ strapi }) => ({
    async findOne(ctx) {
      const { alias } = ctx.params;
      const entity = await strapi.db.query("api::category.category").findOne({
        where: { ...ctx.query.filters, alias },
        //@ts-ignore
        populate: { articles: { filters: { publishedAt: { $not: null } } } },
      });
      return this.transformResponse(entity);
    },

    async findActive(ctx) {
      const data = await (strapi.db as any).connection.context.raw(`
          SELECT categories.*,
                 json_build_object('metaTitle', csc.meta_title, 'metaDescription', csc.meta_description, 'metaRobots',
                                   csc.meta_robots, 'metaImage', f.url) AS SEO
          FROM categories
                   INNER JOIN categories_components cc on categories.id = cc.entity_id
                   LEFT JOIN components_shared_seos csc on cc.component_id = csc.id
                   LEFT JOIN files_related_morphs frm on cc."component_id" = frm."related_id"
                   LEFT JOIN files f on frm.file_id = f.id
          WHERE locale = '${ctx.query.locale || 'en'}'
            AND (SELECT count(*)
                 FROM articles_category_links
                          INNER JOIN articles a on articles_category_links.article_id = a.id
                          INNER JOIN categories c on articles_category_links.category_id = c.id
                 WHERE c.id = categories.id
                   AND a.published_at IS NOT NULL) > 0
            AND cc.component_type = 'shared.seo'
            AND frm.field = 'metaImage'
       `);

      return this.transformResponse(data?.rows || []);
    },
  })
);
