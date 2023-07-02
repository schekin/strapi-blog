module.exports = {
  async up(knex) {
    await knex.raw(`
          create table page_seos
          (
              id            serial
                  primary key,
              alias         varchar(255),
              created_at    timestamp(6),
              updated_at    timestamp(6),
              published_at  timestamp(6),
              created_by_id integer
                  constraint page_seos_created_by_id_fk
                      references admin_users
                      on delete set null,
              updated_by_id integer
                  constraint page_seos_updated_by_id_fk
                      references admin_users
                      on delete set null,
              locale        varchar(255)
          );

          alter table page_seos
              owner to strapi;

          create index page_seos_created_by_id_fk
              on page_seos (created_by_id);

          create index page_seos_updated_by_id_fk
              on page_seos (updated_by_id);
    `);

    await knex.raw(`
          create table page_seos_components
          (
              id             serial
                  primary key,
              entity_id      integer
                  constraint page_seos_entity_fk
                      references page_seos
                      on delete cascade,
              component_id   integer,
              component_type varchar(255),
              field          varchar(255),
              "order"        integer,
              constraint page_seos_unique
                  unique (entity_id, component_id, field, component_type)
          );

          alter table page_seos_components
              owner to strapi;

          create index page_seos_field_index
              on page_seos_components (field);

          create index page_seos_component_type_index
              on page_seos_components (component_type);

          create index page_seos_entity_fk
              on page_seos_components (entity_id);
    `);

    await knex("page_seos").insert([
      {
        alias: "blog",
        locale: "en",
        created_at: "2023-05-11 13:03:32.340000",
        updated_at: "2023-05-11 13:03:32.340000",
        published_at: "2023-05-11 13:03:32.340000",
        created_by_id: 1,
        updated_by_id: 1,
      },
      {
        alias: "blog.all-articles",
        locale: "en",
        created_at: "2023-05-11 13:03:32.340000",
        updated_at: "2023-05-11 13:03:32.340000",
        published_at: "2023-05-11 13:03:32.340000",
        created_by_id: 1,
        updated_by_id: 1,
      },
      {
        alias: "blog.not-found",
        locale: "en",
        created_at: "2023-05-11 13:03:32.340000",
        updated_at: "2023-05-11 13:03:32.340000",
        published_at: "2023-05-11 13:03:32.340000",
        created_by_id: 1,
        updated_by_id: 1,
      },
    ]);

    await knex("components_shared_seos").insert([
      {
        meta_title: "Online English language school for children Allright",
        meta_description:
          "Learning English online is the key to a child's successful future! Classes for children from 4 years old",
      },
      {
        meta_title: "Online English language school for children Allright",
        meta_description:
          "Learning English online is the key to a child's successful future! Classes for children from 4 years old",
      },
      {
        meta_title: "Online English language school for children Allright",
        meta_description:
          "Learning English online is the key to a child's successful future! Classes for children from 4 years old",
      },
    ]);

    const pages = await knex.select("id").from("page_seos");

    const seos = await knex.select("id").from("components_shared_seos").where({
      meta_title: "Online English language school for children Allright",
    });

    await knex("page_seos_components").insert(
      pages.map(({ id }, index) => ({
        entity_id: id,
        component_id: seos[index].id,
        component_type: "shared.seo",
        field: "SEO",
      }))
    );
  },
};
