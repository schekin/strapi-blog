module.exports = {
  async up(knex) {
    await knex.raw(`
          create table authors
          (
              id            serial
                  primary key,
              name          varchar(255),
              description   text,
              alias         varchar(255)
                  constraint authors_alias_unique
                      unique,
              created_at    timestamp(6),
              updated_at    timestamp(6),
              published_at  timestamp(6),
              created_by_id integer
                  constraint authors_created_by_id_fk
                      references admin_users
                      on delete set null,
              updated_by_id integer
                  constraint authors_updated_by_id_fk
                      references admin_users
                      on delete set null
          );

          alter table authors
              owner to strapi;

          create index authors_created_by_id_fk
              on authors (created_by_id);

          create index authors_updated_by_id_fk
              on authors (updated_by_id);
    `);
    await knex.raw(`
          create table authors_components
          (
              id             serial
                  primary key,
              entity_id      integer
                  constraint authors_entity_fk
                      references authors
                      on delete cascade,
              component_id   integer,
              component_type varchar(255),
              field          varchar(255),
              "order"        integer,
              constraint authors_unique
                  unique (entity_id, component_id, field, component_type)
          );

          alter table authors_components
              owner to strapi;

          create index authors_field_index
              on authors_components (field);

          create index authors_component_type_index
              on authors_components (component_type);

          create index authors_entity_fk
              on authors_components (entity_id);
    `);

    await knex.raw(`
          create table articles_author_links
          (
              id            serial
                  primary key,
              article_id    integer
                  constraint articles_author_links_fk
                      references articles
                      on delete cascade,
              author_id     integer
                  constraint articles_author_links_inv_fk
                      references authors
                      on delete cascade,
              article_order integer,
              constraint articles_author_links_unique
                  unique (article_id, author_id)
          );

          alter table articles_author_links
              owner to strapi;

          create index articles_author_links_fk
              on articles_author_links (article_id);

          create index articles_author_links_inv_fk
              on articles_author_links (author_id);

          create index articles_author_links_order_inv_fk
              on articles_author_links (article_order);

    `);

    await knex("authors").insert({
      name: "Sofia Blonska",
      description:
        "An English teacher with 10 years of experience and CELTA and CAE certificates",
      alias: "sofia-blonska",
      created_by_id: 1,
      updated_by_id: 1,
      created_at: "2023-05-11 13:03:32.340000",
      updated_at: "2023-05-11 13:03:32.340000",
      published_at: "2023-05-11 13:03:32.340000",
    });

    const author = (
      await knex
        .select("id", "name", "description")
        .from("authors")
        .where({ alias: "sofia-blonska" })
    )[0];

    await knex("components_shared_seos").insert({
      meta_title: author.name,
      meta_description: author.description,
    });

    const seo = (
      await knex
        .select("id")
        .from("components_shared_seos")
        .where({ meta_title: author.name })
    )[0];

    await knex("authors_components").insert({
      entity_id: author.id,
      component_id: seo.id,
      component_type: "shared.seo",
      field: "SEO",
    });

    const articles = await knex.select("id").from("articles");

    await Promise.all(
      articles.map(({ id }) =>
        knex("articles_author_links").insert({
          article_id: id,
          author_id: author.id,
        })
      )
    );
  },
};
